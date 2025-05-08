import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

import { ProgressBar, QueryProvider, SessionProvider, ThemeProvider, Toaster } from '@/component'

import '@/style/global.css'

export const metadata: Metadata = {
  title: 'Applus',
  description: 'Applus'
}

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='id' suppressHydrationWarning className={plusJakartaSans.className}>
      <body>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <SessionProvider>
            <QueryProvider>
              {children}
              <Toaster />
              <ProgressBar />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
