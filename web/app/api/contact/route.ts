import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  const body = await request.json();

  const entries = Object.entries(body).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].trim() !== ""
  );

  if (!entries.length) {
    return NextResponse.json({ error: "Empty submission" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const replyTo = entries.find(([name]) => name.toUpperCase() === "EMAIL")?.[1];

  const html = entries
    .map(([name, value]) => `<p><strong>${escapeHtml(name)}</strong>: ${escapeHtml(value)}</p>`)
    .join("");

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo,
      subject: "Nouveau message depuis le formulaire de contact",
      html,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
