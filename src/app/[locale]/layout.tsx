import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import './globals.css' 
import Loading from './loading'
import { Suspense } from 'react'
import GlobalProvider from '@/providers/global-provider'

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

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
       <Suspense fallback={<Loading />}>
          <GlobalProvider locale={locale} messages={messages}>
            {children}
          </GlobalProvider>
        </Suspense>
      </body>
    </html>
  )
}