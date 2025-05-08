'use client'

import Link from 'next/link'
import { BadgeCheck, Bell, BookOpen, Bot, ChevronRight, ChevronsUpDown, CreditCard, Home, LogOut, Settings2, Sparkles } from 'lucide-react'

import { Avatar, Collapsible, DropdownMenu, Sidebar, useSidebar } from '@/component'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  menus: [
    { title: 'Beranda', url: '/', icon: Home },
    {
      title: 'Manajemen',
      icon: Bot,
      items: [
        { title: 'Kelola Pengguna', url: '/manajemen/kelola-pengguna' },
        { title: 'Kelola Role', url: '/manajemen/kelola-role' }
      ]
    },
    {
      title: 'Kepegawaian',
      url: '/',
      icon: BookOpen,
      items: [
        { title: 'Introduction', url: '/' },
        { title: 'Get Started', url: '/' },
        { title: 'Tutorials', url: '/' },
        { title: 'Changelog', url: '/' }
      ]
    },
    {
      title: 'Kurikulum',
      url: '/',
      icon: Settings2,
      items: [
        { title: 'General', url: '/' },
        { title: 'Team', url: '/' },
        { title: 'Billing', url: '/' },
        { title: 'Limits', url: '/' }
      ]
    },
    {
      title: 'Sarana Prasarana',
      url: '/',
      icon: Settings2,
      items: [
        { title: 'General', url: '/' },
        { title: 'Team', url: '/' },
        { title: 'Billing', url: '/' },
        { title: 'Limits', url: '/' }
      ]
    },
    {
      title: 'E-Arsip',
      url: '/',
      icon: Settings2,
      items: [
        { title: 'General', url: '/' },
        { title: 'Team', url: '/' },
        { title: 'Billing', url: '/' },
        { title: 'Limits', url: '/' }
      ]
    },
    {
      title: 'Humas',
      url: '/',
      icon: Settings2,
      items: [
        { title: 'General', url: '/' },
        { title: 'Team', url: '/' },
        { title: 'Billing', url: '/' },
        { title: 'Limits', url: '/' }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar()

  return (
    <Sidebar collapsible='icon' {...props}>
      <Sidebar.Header className='border-b'>
        <Image src='/asset/logo-dinas.webp' alt='logo-dinas' className='mx-auto h-12 object-contain' width={512} height={512} />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Menu>
          {data.menus.map(({ icon: Icon, title, url, items }) => {
            if (!items) {
              return (
                <Sidebar.MenuItem key={title}>
                  <Sidebar.MenuButton asChild>
                    <Link href={url}>
                      {Icon && <Icon />}
                      <span>{title}</span>
                    </Link>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              )
            }

            return (
              <Collapsible key={title} asChild className='group/collapsible'>
                <Sidebar.MenuItem>
                  <Collapsible.Trigger asChild>
                    <Sidebar.MenuButton tooltip={title}>
                      {Icon && <Icon />}
                      <span>{title}</span>
                      <ChevronRight className='ml-auto transition-all duration-300 group-data-[state=open]/collapsible:rotate-90' />
                    </Sidebar.MenuButton>
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                    <Sidebar.MenuSub>
                      {items?.map((subItem) => (
                        <Sidebar.MenuSubItem key={subItem.title}>
                          <Sidebar.MenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                      ))}
                    </Sidebar.MenuSub>
                  </Collapsible.Content>
                </Sidebar.MenuItem>
              </Collapsible>
            )
          })}
        </Sidebar.Menu>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Sidebar.MenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <Avatar.Image src={data.user.avatar} alt={data.user.name} />
                    <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{data.user.name}</span>
                    <span className='truncate text-xs'>{data.user.email}</span>
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
                      <Avatar.Image src={data.user.avatar} alt={data.user.name} />
                      <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>{data.user.name}</span>
                      <span className='truncate text-xs'>{data.user.email}</span>
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
                <DropdownMenu.Item onClick={() => signOut()}>
                  <LogOut />
                  Log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Footer>
      <Sidebar.Rail />
    </Sidebar>
  )
}
