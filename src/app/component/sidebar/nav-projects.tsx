'use client'

import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from 'lucide-react'

import { useSidebar, DropdownMenu, Sidebar } from '@/component'

export function NavProjects({
  projects
}: Readonly<{
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>) {
  const { isMobile } = useSidebar()

  return (
    <Sidebar.Group className='group-data-[collapsible=icon]:hidden'>
      <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
      <Sidebar.Menu>
        {projects.map((item) => (
          <Sidebar.MenuItem key={item.name}>
            <Sidebar.MenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </Sidebar.MenuButton>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Sidebar.MenuAction showOnHover>
                  <MoreHorizontal />
                  <span className='sr-only'>More</span>
                </Sidebar.MenuAction>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className='w-48 rounded-lg' side={isMobile ? 'bottom' : 'right'} align={isMobile ? 'end' : 'start'}>
                <DropdownMenu.Item>
                  <Folder className='text-muted-foreground' />
                  <span>View Project</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Forward className='text-muted-foreground' />
                  <span>Share Project</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <Trash2 className='text-muted-foreground' />
                  <span>Delete Project</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Sidebar.MenuItem>
        ))}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton className='text-sidebar-foreground/70'>
            <MoreHorizontal className='text-sidebar-foreground/70' />
            <span>More</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Group>
  )
}
