'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Settings, User } from 'lucide-react'

import { DropdownMenu, Button, Avatar, Skeleton } from '@/component'

export function UserNav() {
  const session = useSession()

  if (session.status === 'loading') {
    return <Skeleton className='size-8 rounded-full' />
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant='ghost' className='relative size-8 rounded-full'>
          <Avatar className='size-8'>
            <Avatar.Image src={session.data?.user?.image ?? ''} alt={session.data?.user?.name ?? 'avatar'} />
          </Avatar>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='w-56' align='end' forceMount>
        <DropdownMenu.Label className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{session.data?.user?.name}</p>
            <p className='text-muted-foreground text-xs leading-none'>{session.data?.user?.email}</p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <Link href='/profile'>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link href='/settings'>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => signOut({ callbackUrl: '/' })} className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
