'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { AppSidebar } from '@/app/(dashboard)/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/component'
import Header from '@/app/(dashboard)/header'
import { useMyProfile } from '@/hook'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: myProfile, isRefetching, isFetched } = useMyProfile()
  const router = useRouter()

  useEffect(() => {
    if (isFetched && myProfile?.statusCode !== 200) router.replace('/login')
  }, [myProfile])

  if (isRefetching || myProfile?.statusCode !== 200) {
    return (
      <div className='flex h-screen items-center justify-center p-4'>
        <Image src='/asset/logo-dinas.webp' alt='logo-dinas' className='h-24 w-auto' width={512} height={512} />
      </div>
    )
  }

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
