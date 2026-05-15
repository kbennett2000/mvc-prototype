import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { churchInfo } from "@/lib/church-info";
import { givingConfig, shouldLoadModalScript, getModalScriptSrc } from "@/lib/giving";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: {
    default: `${churchInfo.name} — Kiowa, Colorado`,
    template: `%s · ${churchInfo.name}`,
  },
  description:
    "A small-town church in Kiowa, CO. Sundays at 9:00 AM — coffee and fellowship after.",
  openGraph: {
    title: `${churchInfo.name} — Kiowa, Colorado`,
    description:
      "A small-town church in Kiowa, CO. Sundays at 9:00 AM — coffee and fellowship after.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {shouldLoadModalScript(givingConfig) && (
          <Script src={getModalScriptSrc(givingConfig)!} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
