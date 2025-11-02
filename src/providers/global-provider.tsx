'use client'

import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
import React from 'react'

export default function GlobalProvider({
  children,
  messages,
  locale,
}: {
  children: ReactNode
  messages: Record<string, string>
  locale: string
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <React.Fragment key={locale}>{children}</React.Fragment>
    </NextIntlClientProvider>
  )
}