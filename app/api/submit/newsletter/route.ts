import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { email } = await req.json() as { email: string };

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";
  const to = process.env.CHURCH_EMAIL ?? "";

  const { error } = await getResend().emails.send({
    from,
    to,
    subject: "Newsletter signup",
    text: `New newsletter signup: ${email}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
