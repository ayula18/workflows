import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ayush Lahoti | Founder's Office & Business Generalist",
  description: "Portfolio of Ayush Lahoti. Ex-founder and strategic operator specializing in GTM strategy, stakeholder management, and AI workflow design for high-growth startups.",
  keywords: ["Founder's Office", "Business Generalist", "GTM Strategy", "AI Automation", "Product Operations", "Ayush Lahoti"],
  openGraph: {
    title: "Ayush Lahoti | Founder's Office & Business Generalist",
    description: "Ex-founder and strategic operator bridging the gap between business and technical execution.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
