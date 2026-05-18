import { NextRequest, NextResponse } from "next/server";
import { getDigestSettings } from "@/lib/digest/settings";
import { sendWeeklyDigest } from "@/lib/digest/send-weekly";
import { getDigestSendLog } from "@/lib/db/queries";
import {
  dayOfWeekIndex,
  digestWeekWindow,
  dowOfDate,
} from "@/lib/digest/week-helpers";

// Vercel Cron. The template runs this hourly and gates on both
// sendDay AND sendHour. MVC runs this daily (Hobby tier limit; see vercel.json),
// so the hour check has been dropped — we send on the configured day if not
// already sent this week. The sendHour field in digest-settings.json is
// therefore unused under MVC's daily schedule. Per-week idempotency
// (digest_send_log unique on weekStart) prevents double-sends.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = getDigestSettings();
  if (!settings.isEnabled) {
    return NextResponse.json({ skipped: true, reason: "feature_disabled" });
  }

  const configuredDow = dayOfWeekIndex(settings.sendDay);
  if (configuredDow === null) {
    return NextResponse.json({ skipped: true, reason: "invalid_send_day", value: settings.sendDay }, { status: 200 });
  }

  const now = new Date();
  const { weekStart, today } = digestWeekWindow(settings.sendTimezone, now);
  const todayDow = dowOfDate(today);

  if (todayDow !== configuredDow) {
    return NextResponse.json({
      skipped: true,
      reason: "wrong_day",
      today,
      todayDow,
      configuredDow,
      configuredDayName: settings.sendDay,
    });
  }

  // Belt-and-suspenders idempotency check before the send function runs.
  const prior = await getDigestSendLog(weekStart);
  if (prior) {
    return NextResponse.json({ skipped: true, reason: "already_sent", weekStart });
  }

  const baseUrl = new URL(req.url).origin;
  try {
    const summary = await sendWeeklyDigest({ baseUrl, now });
    return NextResponse.json(summary);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[cron/digest] Fatal error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
