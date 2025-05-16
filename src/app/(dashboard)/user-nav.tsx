'use client'

import Link from 'next/link'
import { LogOut, Settings, User } from 'lucide-react'

import { DropdownMenu, Button, Avatar } from '@/component'
import { useMyProfile } from '@/hook'
import { AuthService } from '@/service'

export function UserNav() {
  const { data: myProfile } = useMyProfile()

  async function handleSignOut() {
    const response = await AuthService.SignOut()
    if (response.statusCode === 200) document.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant='ghost' className='relative size-8 rounded-full'>
          <Avatar className='size-8'>
            {/* <Avatar.Image src={session.data?.user?.image ?? ''} alt={session.data?.user?.name ?? 'avatar'} /> */}
            <Avatar.Fallback>CN</Avatar.Fallback>
          </Avatar>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='w-56' align='end' forceMount>
        <DropdownMenu.Label className='font-normal'>
          <div className='flex flex-col space-y-1'>
            {/* <p className='text-sm leading-none font-medium'>{session.data?.user?.name}</p> */}
            <p className='text-muted-foreground text-xs leading-none'>{myProfile?.data.emailAddress}</p>
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
        <DropdownMenu.Item onClick={handleSignOut} className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
