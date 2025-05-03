'use client'

import { Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip'

import { cn } from '@/lib'

Tooltip.Trigger = Trigger
Tooltip.Provider = Provider

export function Tooltip(props: Readonly<React.ComponentProps<typeof Root>>) {
  return <Root {...props} />
}

Tooltip.Content = function TooltipContent({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        sideOffset={sideOffset}
        className={cn(
          'bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md px-3 py-1.5 text-xs',
          className
        )}
        {...props}
      />
    </Portal>
  )
}
