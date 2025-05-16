'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { Avatar, Collapsible, DropdownMenu, Icon, Sidebar, useSidebar } from '@/component'
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
      icon: <Icon name='home' className='!size-5' />
    },
    {
      title: 'Manajemen',
      icon: <Icon name='settings-2' className='!size-5' />,
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
      icon: <Icon name='building' className='!size-5' />,
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
      icon: <Icon name='archive' className='!size-5' />,
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
      icon: <Icon name='calendar' className='!size-5' />,
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
  const { data: myProfile } = useMyProfile()
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  function isParentActive(items?: { url: string }[]) {
    if (!items) return false
    return items.some((item) => pathname.startsWith(item.url))
  }

  async function handleSignOut() {
    const response = await AuthService.SignOut()
    if (response.statusCode === 200) document.location.reload()
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <Sidebar.Header className='border-b'>
        <Image src='/asset/logo-dinas.webp' alt='logo-dinas' className='mx-auto h-12 object-contain' width={512} height={512} />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Menu>
          {data.menus.map(({ icon: IconMenu, title, url, items }) => {
            if (!items) {
              return (
                <Sidebar.MenuItem key={title}>
                  <Sidebar.MenuButton isActive={pathname === url} asChild>
                    <Link href={url}>
                      {IconMenu}
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
                      {IconMenu}
                      <span>{title}</span>
                      <Icon name='chevron-right' className='ml-auto transition-all duration-300 group-data-[state=open]/collapsible:rotate-90' />
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
                    {/* {session.data && <Avatar.Image src={session.data?.user?.image as string} alt={session.data?.user?.name ?? 'dinas pendidikan'} />} */}
                    <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    {/* <span className='truncate font-semibold'>{session.data?.user?.name}</span> */}
                    <span className='truncate text-xs'>{myProfile?.data.emailAddress}</span>
                  </div>
                  <Icon name='chevrons-up-down' className='ml-auto size-4' />
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
                      {/* {session.data && <Avatar.Image src={session.data?.user?.image as string} alt={session.data?.user?.name ?? 'dinas pendidikan'} />} */}
                      <Avatar.Fallback className='rounded-lg'>CN</Avatar.Fallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      {/* <span className='truncate font-semibold'>{session.data?.user?.name}</span> */}
                      <span className='truncate text-xs'>{myProfile?.data.emailAddress}</span>
                    </div>
                  </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                  <DropdownMenu.Item>
                    <Icon name='sparkles' />
                    Upgrade to Pro
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                  <DropdownMenu.Item>
                    <Icon name='badge-check' />
                    Account
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Icon name='credit-card' />
                    Billing
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Icon name='bell' />
                    Notifications
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleSignOut}>
                  <Icon name='log-out' />
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
