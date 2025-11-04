import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "./globals.css";
import Loading from "./loading";
import { type ReactNode, Suspense } from "react";
import GlobalProvider from "@/providers/global-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// export const runtime = "edge";

export const metadata: Metadata = {
  title: "BETIDA - Casino & Sports Betting",
  description: "Welcome to BETIDA - Your ultimate gaming destination!",
  keywords: [
    "online casino",
    "sports betting",
    "live casino",
    "BETIDA",
    "gaming platform",
  ],
  openGraph: {
    title: "BETIDA",
    description: "Your ultimate gaming destination!",
    url: "https://betida.dev",
    siteName: "BETIDA",
    images: [
      {
        url: "https://betida.dev/detida.png",
        width: 1200,
        height: 630,
        alt: "BETIDA - Ultimate Gaming Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BETIDA",
    description: "Your ultimate gaming destination!",
    images: ["https://betida.dev/detida.png"],
    creator: "@BETIDAOfficial",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preload critical chunks */}
        <link
          rel="preload"
          href="/_next/static/chunks/react-dom.js"
          as="script"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/_next/static/chunks/main.js"
          as="script"
          crossOrigin=""
        />
      </head>
      <title>BETIDA</title>
      <body>
        <Suspense fallback={<Loading />}>
          <NextIntlClientProvider>
            <GlobalProvider>{children}</GlobalProvider>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
