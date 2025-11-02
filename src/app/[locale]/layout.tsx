import {setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import './globals.css' 
import Loading from './loading'
import { Suspense } from 'react'
import { NextIntlClientProvider } from 'next-intl'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body>
       <Suspense fallback={<Loading />}>
           <NextIntlClientProvider>
            {children}
           </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  )
}