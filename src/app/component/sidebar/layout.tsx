import { cookies } from 'next/headers'

import { AppSidebar } from '@/app/component/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/component'
import Header from '@/app/component/sidebar/header'

export interface ComponentLayoutProps {
  children: React.ReactNode
}

export default async function SidebarLayout({ children }: Readonly<ComponentLayoutProps>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
