'use client'

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react'
import { DropdownMenu, Avatar, useSidebar, Sidebar } from '@/component'

export function NavUser({
  user
}: Readonly<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>) {
  const { isMobile } = useSidebar()
  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Sidebar.MenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <Avatar.Image src={user.avatar} alt={user.name} />
                <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </Sidebar.MenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenu.Label className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <Avatar.Image src={user.avatar} alt={user.name} />
                  <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.name}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <BadgeCheck />
                Account
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <CreditCard />
                Billing
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Bell />
                Notifications
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <LogOut />
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}
