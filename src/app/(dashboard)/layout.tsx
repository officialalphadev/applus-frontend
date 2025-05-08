// import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { AppSidebar } from '@/app/(dashboard)/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/component'
import Header from '@/app/(dashboard)/header'
import { authOptionsConfig } from '@/config'

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  const session = await getServerSession(authOptionsConfig)

  if (!session) redirect('/login?callbackUrl=/')

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
