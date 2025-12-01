import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ChatAssistant } from "@/components/chat-assistant";
import { GlobalBackground } from "@/components/backgrounds";
import { ScrollProgress, ScrollToTop } from "@/components/motion";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CuraSense - AI-Powered Healthcare Assistant",
  description: "Advanced AI-powered medical diagnosis, X-ray analysis, and medicine comparison platform",
  keywords: ["healthcare", "AI", "medical diagnosis", "x-ray analysis", "medicine comparison"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {/* Premium Multi-Layer Background */}
          <GlobalBackground />
          
          {/* Reading Progress Bar */}
          <ScrollProgress />
          
          <div className="relative flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col pl-16 transition-all duration-300">
              <Header />
              <main className="flex-1 p-8">
                {children}
              </main>
            </div>
          </div>
          
          <ChatAssistant />
          
          {/* Scroll to Top Button */}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
