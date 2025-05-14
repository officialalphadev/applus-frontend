'use client'

import { Root, Viewport, Corner, ScrollAreaScrollbar, ScrollAreaThumb } from '@radix-ui/react-scroll-area'

import { cn } from '@/lib'

export function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root className={cn('relative overflow-hidden', className)} {...props}>
      <Viewport className='h-full w-full rounded-[inherit]'>{children}</Viewport>
      <ScrollArea.Scrollbar />
      <Corner />
    </Root>
  )
}

ScrollArea.Scrollbar = function ScrollBar({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        'flex touch-none transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className
      )}
      {...props}
    >
      <ScrollAreaThumb className='bg-border relative flex-1 rounded-full' />
    </ScrollAreaScrollbar>
  )
}
