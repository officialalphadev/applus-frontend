'use client'

import Image from 'next/image'

export function SplashScreen() {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <Image src='/asset/logo-dinas.webp' alt='logo-dinas' className='h-24 w-auto' width={512} height={512} />
    </div>
  )
}
