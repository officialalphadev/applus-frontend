'use client'

import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'

import { cn } from '@/lib'

export function Tabs({ children, ...props }: React.ComponentProps<typeof Root>) {
  return <Root {...props}>{children}</Root>
}

Tabs.List = function TabsList({ className, ...props }: React.ComponentProps<typeof List>) {
  return <List className={cn('bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1', className)} {...props} />
}

Tabs.Trigger = function TabsTrigger({ className, ...props }: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'ring-offset-background disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

Tabs.Content = function TabsContent({ className, ...props }: React.ComponentProps<typeof Content>) {
  return (
    <Content
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
      {...props}
    />
  )
}
