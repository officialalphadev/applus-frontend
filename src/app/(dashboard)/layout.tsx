'use client'

// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
// import { getServerSession } from 'next-auth'

import { AppSidebar } from '@/app/(dashboard)/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/component'
import Header from '@/app/(dashboard)/header'
import { useMyProfile } from '@/hook'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
// import { authOptionsConfig } from '@/config'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const cookieStore = await cookies()
  // const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  // const session = await getServerSession(authOptionsConfig)

  // if (!session) redirect('/login?callbackUrl=/')

  const router = useRouter()

  const { data: myProfile, isRefetching, isFetched } = useMyProfile()

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
