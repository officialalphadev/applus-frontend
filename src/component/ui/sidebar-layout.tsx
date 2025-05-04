import { cookies } from 'next/headers'

import { AppSidebar } from '@/component/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/component'

export interface ComponentLayoutProps {
  children: React.ReactNode
}

export default async function SidebarLayout({ children }: Readonly<ComponentLayoutProps>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
