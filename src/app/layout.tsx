import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import ChatWidgetLoader from "@/components/chat/ChatWidgetLoader";
import ThemeProvider from "@/components/theme/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <ChatWidgetLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
