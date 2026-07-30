import type { Metadata } from "next";
import { Caveat, Space_Mono, Syne } from "next/font/google";

import { SpriteDefs } from "@/components/sprite";

import "./globals.css";
import "./zine.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
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
      <body
        className={`${syne.variable} ${spaceMono.variable} ${caveat.variable}`}
      >
        <SpriteDefs />
        {children}
      </body>
    </html>
  );
}
