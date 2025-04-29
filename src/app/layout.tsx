import type { Metadata } from 'next'

import { Header, ProgressBar, QueryProvider, SessionProvider, ThemeProvider, Toaster } from '@/component'

import '@/style/global.css'

export const metadata: Metadata = {
  title: 'Applus',
  description: 'Applus'
}

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <SessionProvider>
            <QueryProvider>
              <Header />
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
