/**
 * Test Spacemail SMTP locally.
 * Usage:
 *   1. Copy .env.example to .env.local and fill SMTP_PASS
 *   2. node scripts/test-smtp.mjs
 */
import nodemailer from "nodemailer";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) {
    console.error("Missing .env.local — copy .env.example and add SMTP_PASS.");
    process.exit(1);
  }
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const host = process.env.SMTP_HOST ?? "mail.spacemail.com";
const port = Number(process.env.SMTP_PORT ?? "465");
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.ENQUIRY_TO ?? user;

if (!user || !pass) {
  console.error("SMTP_USER and SMTP_PASS are required in .env.local");
  process.exit(1);
}

console.log("Testing SMTP…");
console.log(`  host: ${host}`);
console.log(`  port: ${port}`);
console.log(`  user: ${user}`);
console.log(`  to:   ${to}`);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  tls: { minVersion: "TLSv1.2" },
});

try {
  await transporter.verify();
  console.log("✓ SMTP connection and authentication OK");

  const info = await transporter.sendMail({
    from: `"Café Bernarda test" <${user}>`,
    to,
    subject: "Café Bernarda — SMTP test",
    text: "If you receive this, SMTP is working.",
  });

  console.log("✓ Test email sent:", info.messageId);
} catch (error) {
  console.error("✗ SMTP failed:");
  console.error(error);
  process.exit(1);
}
