import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_EMAIL } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const piece = String(form.get("piece") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const silkNotes = String(form.get("silkNotes") ?? "").trim();

    if (!name || !email || !piece) {
      return NextResponse.json(
        { error: "Name, email and piece are required." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.ENQUIRY_TO ?? SITE_EMAIL;

    if (!host || !user || !pass) {
      return NextResponse.json(
        {
          error:
            "Email is not configured yet. Please add SMTP settings in Vercel.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const attachments: { filename: string; content: Buffer }[] = [];

    for (const [key, value] of form.entries()) {
      if (key.startsWith("printFile_") && value instanceof File && value.size > 0) {
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({ filename: value.name, content: buffer });
      }
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Piece: ${piece}`,
      "",
      message || "(No message)",
      "",
      silkNotes ? `Silk selections:\n${silkNotes}` : "",
      attachments.length
        ? `\nPrint files attached: ${attachments.map((a) => a.filename).join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `"Café Bernarda" <${user}>`,
      to,
      replyTo: email,
      subject: `Café Bernarda — Enquiry: ${piece}`,
      text: body,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry error:", error);
    return NextResponse.json(
      { error: "Could not send enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
