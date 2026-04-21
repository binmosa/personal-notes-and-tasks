import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مدير المهام والملاحظات",
  description: "تطبيق بسيط لإدارة المهام والملاحظات الشخصية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans", ibmPlexSansArabic.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
