import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blueprint LiDAR — Pre-Drywall Scanning Service",
  description:
    "Scan your home during framing to create a permanent digital record of every pipe, wire, and duct — accessible forever. One chance. Don't miss it.",
  openGraph: {
    title: "Blueprint LiDAR — Pre-Drywall Scanning Service",
    description:
      "Millimeter-accurate LiDAR scans of your home before drywall goes up. A digital blueprint that lasts forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#0a0a0b] text-white min-h-screen">{children}</body>
    </html>
  );
}
