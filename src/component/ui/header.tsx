'use client'
import Link from 'next/link'

import { UserNav } from '../../app/component/sidebar/user-nav'
import { useSession } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }
  return (
    <header className='bg-background sticky top-0 z-50 w-full border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-6'>
          <Link href='/' className='text-xl font-bold'>
            MyApp
          </Link>
          <nav className='hidden gap-6 md:flex'>
            <Link href='/' className='hover:text-primary text-sm font-medium transition-colors'>
              Home
            </Link>
            <Link href='/dashboard' className='hover:text-primary text-sm font-medium transition-colors'>
              Dashboard
            </Link>
            <Link href='/products' className='hover:text-primary text-sm font-medium transition-colors'>
              Products
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <UserNav />
        </div>
      </div>
    </header>
  )
}
