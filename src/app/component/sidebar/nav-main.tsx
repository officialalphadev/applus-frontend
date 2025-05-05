'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import { Sidebar, Collapsible } from '@/component'

export function NavMain({
  items
}: Readonly<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>) {
  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
      <Sidebar.Menu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
            <Sidebar.MenuItem>
              <Collapsible.Trigger asChild>
                <Sidebar.MenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </Sidebar.MenuButton>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Sidebar.MenuSub>
                  {item.items?.map((subItem) => (
                    <Sidebar.MenuSubItem key={subItem.title}>
                      <Sidebar.MenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  ))}
                </Sidebar.MenuSub>
              </Collapsible.Content>
            </Sidebar.MenuItem>
          </Collapsible>
        ))}
      </Sidebar.Menu>
    </Sidebar.Group>
  )
}
