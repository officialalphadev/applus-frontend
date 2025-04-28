'use client'

import { useSession } from 'next-auth/react'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Button } from './button'
import { DropdownMenu } from './dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

export function UserNav() {
  const { data: session } = useSession()

  if (!session?.user) {
    return (
      <Button asChild variant='ghost'>
        <Link href='/auth/login'>Sign in</Link>
      </Button>
    )
  }

  const userInitials = session.user.name
    ? session.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U'

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={session.user.image || ''} alt={session.user.name || 'User'} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='w-56' align='end' forceMount>
        <DropdownMenu.Label className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{session.user.name}</p>
            <p className='text-muted-foreground text-xs leading-none'>{session.user.email}</p>
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
