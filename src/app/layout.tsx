import type { Metadata } from 'next'

import { ThemeProvider, Toaster } from '@/component'

import '@/style/global.css'

export const metadata: Metadata = { title: 'Applus', description: 'Applus' }

export interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
