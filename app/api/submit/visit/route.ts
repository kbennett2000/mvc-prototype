import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { name, email, adults, kids, kidsAges, visit, notes } =
    await req.json() as {
      name: string;
      email: string;
      adults: string;
      kids: string;
      kidsAges?: string;
      visit: string;
      notes?: string;
    };

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";
  const to = process.env.CHURCH_EMAIL ?? "";

  const [visitDate, visitTime] = visit === "unsure" ? ["Not sure yet", ""] : visit.split("|");

  const { error } = await getResend().emails.send({
    from,
    to,
    replyTo: email,
    subject: `New visitor: ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Adults: ${adults}`,
      `Kids: ${kids}`,
      ...(kidsAges ? [`Kids' ages: ${kidsAges}`] : []),
      `Planned visit: ${visitDate}${visitTime ? ` at ${visitTime}` : ""}`,
      ...(notes ? [`Notes: ${notes}`] : []),
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
