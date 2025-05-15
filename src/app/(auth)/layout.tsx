'use client'

import { useMyProfile } from '@/hook'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()

  const { data: myProfile, isFetching, isFetched } = useMyProfile()

  useEffect(() => {
    if (isFetched && myProfile?.statusCode === 200) router.replace('/')
  }, [myProfile])

  if (isFetching || myProfile?.statusCode === 200) {
    return (
      <div className='flex h-screen items-center justify-center p-4'>
        <Image src='/asset/logo-dinas.webp' alt='logo-dinas' className='h-24 w-auto' width={512} height={512} />
      </div>
    )
  }

  return <div className='h-screen w-full bg-neutral-100'>{children}</div>
}
