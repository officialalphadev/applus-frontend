'use client'

import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from 'lucide-react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from './sidebar'
import { DropdownMenu } from './dropdown-menu'

export function NavProjects({
  projects
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className='sr-only'>More</span>
                </SidebarMenuAction>
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
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className='text-sidebar-foreground/70'>
            <MoreHorizontal className='text-sidebar-foreground/70' />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
