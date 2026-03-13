import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import * as React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import SkipNav from "@/components/skip-nav";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
  openGraph: {
    description:
      "A boilerplate for creating NextJS projects with TypeScript and Tailwind.",
    images: "",
    title: "NextStarter",
  },
  title: {
    default: "NextStarter",
    template: "%s | NextStarter",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * Root layout component for the entire application
 * @param children - Child components to render
 * @returns Root layout with theme provider and global components
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipNav />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
