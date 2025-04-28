import type { Metadata } from 'next'

import { Header, Toaster } from '@/component'

import '@/style/global.css'
import { Providers } from './providers'
import { QueryProvider } from '@/providers/query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const metadata: Metadata = { title: 'Applus', description: 'Applus' }

export interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body>
        <Providers>
          <QueryProvider>
            <Header />
            {children}
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
          </QueryProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
