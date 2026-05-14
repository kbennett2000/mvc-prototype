import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { name, email, phone, request, privateToTeam, wantsCall } =
    await req.json() as {
      name?: string;
      email?: string;
      phone?: string;
      request: string;
      privateToTeam: boolean;
      wantsCall: boolean;
    };

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";
  const to = process.env.CHURCH_EMAIL ?? "";

  const { error } = await getResend().emails.send({
    from,
    to,
    ...(email ? { replyTo: email } : {}),
    subject: `Prayer request from ${name || "Anonymous"}`,
    text: [
      `Name: ${name || "Anonymous"}`,
      `Email: ${email || "—"}`,
      `Phone: ${phone || "—"}`,
      `Private to team: ${privateToTeam ? "Yes" : "No"}`,
      `Wants a call: ${wantsCall ? "Yes" : "No"}`,
      "",
      request,
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
