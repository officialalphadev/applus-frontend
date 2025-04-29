'use client'

import { Root, Trigger, Anchor, Portal, Content } from '@radix-ui/react-popover'

import { cn } from '@/lib'

Popover.Trigger = Trigger
Popover.Anchor = Anchor

export function Popover(props: Readonly<React.ComponentProps<typeof Root>>) {
  return <Root {...props} />
}

Popover.Content = function PopoverContent({ className, align = 'center', sideOffset = 4, ...props }: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground rounded-md border p-4 shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
          'z-50 origin-[--radix-popover-content-transform-origin]',
          className
        )}
        {...props}
      />
    </Portal>
  )
}
