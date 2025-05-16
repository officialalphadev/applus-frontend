'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { SidebarInset, SidebarProvider, SplashScreen } from '@/component'
import { AppSidebar } from '@/app/(dashboard)/app-sidebar'
import Header from '@/app/(dashboard)/header'
import { useMyProfile } from '@/hook'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: myProfile, isRefetching, isFetched } = useMyProfile()
  const router = useRouter()

  useEffect(() => {
    if (isFetched && myProfile?.statusCode !== 200) router.replace('/login')
  }, [myProfile])

  if (isRefetching || myProfile?.statusCode !== 200) return <SplashScreen />

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
