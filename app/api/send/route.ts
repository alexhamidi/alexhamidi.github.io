import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function buildRawMessage(to: string, subject: string, body: string): string {
  const lines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    body,
  ];
  const raw = lines.join("\r\n");
  return Buffer.from(raw).toString("base64url");
}

function getGmailService() {
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return google.gmail({ version: "v1", auth });
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is empty" }, { status: 400 });
  }

  const to = process.env.GMAIL_TO_ADDRESS!;
  const subject = "Message from alexhamidi.com";
  const raw = buildRawMessage(to, subject, message.trim());

  try {
    const service = getGmailService();
    const sent = await service.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });
    return NextResponse.json({ id: sent.data.id });
  } catch (e) {
    console.error("Error sending email:", e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
