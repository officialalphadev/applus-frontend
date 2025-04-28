import type { Metadata } from 'next'

import { Toaster } from '@/component'

import '@/style/global.css'
import { Providers } from './providers'

export const metadata: Metadata = { title: 'Applus', description: 'Applus' }

export interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
