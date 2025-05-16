'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { SplashScreen } from '@/component'
import { useMyProfile } from '@/hook'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: myProfile, isFetching, isFetched } = useMyProfile()
  const router = useRouter()

  useEffect(() => {
    if (isFetched && myProfile?.statusCode === 200) router.replace('/')
  }, [myProfile])

  if (isFetching || myProfile?.statusCode === 200) return <SplashScreen />

  return <div className='h-screen w-full bg-neutral-100'>{children}</div>
}
