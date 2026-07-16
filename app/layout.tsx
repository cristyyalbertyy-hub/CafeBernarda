import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Café Bernarda — A Salon of Three Afternoons",
  description:
    "A salon where painting leaves the wall. Original works and silk extensions by the artist of the salon.",
  openGraph: {
    title: "Café Bernarda",
    description: "A salon where painting leaves the wall.",
    url: SITE_URL,
    siteName: "Café Bernarda",
    type: "website",
    locale: "en_GB",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
