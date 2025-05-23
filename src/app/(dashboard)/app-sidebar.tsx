'use client'

import { BadgeCheck, Bell, ChevronRight, ChevronsUpDown, CreditCard, Home, LogOut, Settings2, Sparkles, Archive, Building, Calendar } from 'lucide-react'
import Link from 'next/link'

import { Avatar, Collapsible, DropdownMenu, Sidebar, useSidebar } from '@/component'
// import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { AuthService } from '@/service'
import { useMyProfile } from '@/hook'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  menus: [
    {
      title: 'Beranda',
      url: '/',

      icon: <Home className='!size-5' />
    },
    {
      title: 'Manajemen',
      icon: <Settings2 className='!size-5' />,
      items: [
        { title: 'Kelola Pengguna', url: '/manajemen/kelola-pengguna' },
        { title: 'Kelola Role', url: '/manajemen/kelola-role' }
      ]
    },
    // {
    //   title: 'Kepegawaian',
    //   url: '/',
    //   icon: BookOpen,
    //   items: [
    //     { title: 'Introduction', url: '/' },
    //     { title: 'Get Started', url: '/' },
    //     { title: 'Tutorials', url: '/' },
    //     { title: 'Changelog', url: '/' }
    //   ]
    // },
    // {
    //   title: 'Kurikulum',
    //   url: '/',
    //   icon: Settings2,
    //   items: [
    //     { title: 'General', url: '/' },
    //     { title: 'Team', url: '/' },
    //     { title: 'Billing', url: '/' },
    //     { title: 'Limits', url: '/' }
    //   ]
    // },
    {
      title: 'Sarana Prasarana',
      // url: '/',
      icon: <Building className='!size-5' />,
      items: [
        { title: 'General', url: '/saranaprasarana/general' },
        { title: 'Team', url: '/saranaprasarana/team' },
        { title: 'Billing', url: '/saranaprasarana/billing' },
        { title: 'Limits', url: '/saranaprasarana/limits' }
      ]
    },
    {
      title: 'E-Arsip',
      // url: '/',
      icon: <Archive className='!size-5' />,
      items: [
        { title: 'General', url: '/earsip/general' },
        { title: 'Team', url: '/earsip/team' },
        { title: 'Billing', url: '/earsip/billing' },
        { title: 'Limits', url: '/earsip/limits' }
      ]
    },
    {
      title: 'Humas',
      // url: '/',
      icon: <Calendar className='!size-5' />,
      items: [
        { title: 'General', url: '/humas/general' },
        { title: 'Team', url: '/humas/team' },
        { title: 'Billing', url: '/humas/billing' },
        { title: 'Limits', url: '/humas/limits' }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar()
  const session = useSession()
  const pathname = usePathname()
  console.log('searchParams', pathname)
  const isParentActive = (items?: { url: string }[]) => {
    if (!items) return false
    return items.some((item) => pathname.startsWith(item.url))
  }

  const { data: myProfile } = useMyProfile()

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
                  <Sidebar.MenuButton isActive={pathname === url} asChild>
                    <Link href={url}>
                      {Icon}
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
                    <Sidebar.MenuButton isActive={isParentActive(items)} tooltip={title}>
                      {Icon}
                      <span>{title}</span>
                      <ChevronRight className='ml-auto transition-all duration-300 group-data-[state=open]/collapsible:rotate-90' />
                    </Sidebar.MenuButton>
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                    <Sidebar.MenuSub>
                      {items?.map((subItem) => (
                        <Sidebar.MenuSubItem key={subItem.title}>
                          <Sidebar.MenuSubButton isActive={pathname === subItem.url} asChild>
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
                    {session.data && <Avatar.Image src={session.data?.user?.image as string} alt={session.data?.user?.name ?? 'dinas pendidikan'} />}
                    <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{session.data?.user?.name}</span>
                    <span className='truncate text-xs'>{myProfile?.data.emailAddress}</span>
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
                      {session.data && <Avatar.Image src={session.data?.user?.image as string} alt={session.data?.user?.name ?? 'dinas pendidikan'} />}
                      <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>{session.data?.user?.name}</span>
                      <span className='truncate text-xs'>{myProfile?.data.emailAddress}</span>
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
                <DropdownMenu.Item
                  onClick={async () => {
                    const response = await AuthService.SignOut()
                    if (response.statusCode === 200) document.location.reload()
                  }}
                >
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
