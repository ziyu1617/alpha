import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";

import "./globals.css";
import "./site.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "alpha — the prelude of neon",
  description: "alpha · a personal index of links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={spaceMono.variable}>{children}</body>
    </html>
  );
}
