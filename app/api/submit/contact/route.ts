import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { name, email, phone, topic, message } = await req.json() as {
    name: string;
    email: string;
    phone?: string;
    topic: string;
    message: string;
  };

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";
  const to = process.env.CHURCH_EMAIL ?? "";

  const { error } = await getResend().emails.send({
    from,
    to,
    replyTo: email,
    subject: `Contact form: ${topic}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Topic: ${topic}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
