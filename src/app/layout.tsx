import type { Metadata } from 'next'

import { ProgressBar, QueryProvider, SessionProvider, ThemeProvider, Toaster } from '@/component'

// import { SidebarProvider, SidebarTrigger } from '@/component/ui/sidebar'
import '@/style/global.css'
// import { AppSidebar } from '@/component/app-sidebar'

export const metadata: Metadata = {
  title: 'Applus',
  description: 'Applus'
}

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <SessionProvider>
            <QueryProvider>
              {/* <SidebarProvider> */}
              {/* <AppSidebar /> */}
              {/* <SidebarTrigger /> */}
              {/* <Header /> */}
              {children}
              {/* </SidebarProvider> */}
              <Toaster />
              <ProgressBar />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
