'use client'

import Link from 'next/link'

import { DropdownMenu, Button, Avatar, Icon } from '@/component'
import { AuthService } from '@/service'
import { useMyProfile } from '@/hook'

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
              <Icon name='user' className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link href='/settings'>
              <Icon name='settings' className='mr-2 h-4 w-4' />
              <span>Settings</span>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handleSignOut} className='cursor-pointer'>
          <Icon name='log-out' className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
