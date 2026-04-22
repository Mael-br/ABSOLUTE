import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/data/site";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Absolute | Tecnologia premium para bots, websites e APIs",
    template: "%s | Absolute"
  },
  description: siteConfig.description,
  keywords: [
    "bots inteligentes",
    "websites premium",
    "api personalizada",
    "automação",
    "desenvolvimento web",
    "pagbank"
  ],
  openGraph: {
    title: "Absolute",
    description: siteConfig.description,
    type: "website",
    locale: "pt_BR",
    siteName: "Absolute"
  },
  twitter: {
    card: "summary_large_image",
    title: "Absolute",
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <div className="site-background" />
        <div className="site-background site-background--secondary" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

