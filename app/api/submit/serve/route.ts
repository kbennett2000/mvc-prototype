import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { roleId, roleTitle } = await req.json() as {
    roleId: string;
    roleTitle: string;
  };

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";
  const to = process.env.CHURCH_EMAIL ?? "";

  const { error } = await getResend().emails.send({
    from,
    to,
    subject: `Serve interest: ${roleTitle}`,
    text: `Someone expressed interest in serving as: ${roleTitle} (${roleId})`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
