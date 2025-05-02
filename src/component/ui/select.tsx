'use client'

import { Group, Icon, Root, Trigger, Value, Portal, Content, Viewport, Label, Item, ItemText, Separator } from '@radix-ui/react-select'
import { ScrollUpButton, ScrollDownButton, ItemIndicator } from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/lib'

Select.Group = Group
Select.Value = Value

export function Select({ ...props }: React.ComponentProps<typeof Root>) {
  return <Root {...props} />
}

Select.Trigger = function SelectTrigger({ className, ...props }: React.ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      className={cn(
        'flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm',
        'focus:ring-ring ring-offset-background focus:ring-1 focus:outline-none',
        'data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1',
        'border-input disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Icon asChild>
        <ChevronDown className='h-4 w-4 opacity-50' />
      </Icon>
    </Trigger>
  )
}

Select.ScrollUpButton = function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof ScrollUpButton>) {
  return (
    <ScrollUpButton className={cn('flex cursor-default items-center justify-center py-1', className)} {...props}>
      <ChevronUp className='h-4 w-4' />
    </ScrollUpButton>
  )
}

Select.ScrollDownButton = function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof ScrollDownButton>) {
  return (
    <ScrollDownButton className={cn('flex cursor-default items-center justify-center py-1', className)} {...props}>
      <ChevronDown className='h-4 w-4' />
    </ScrollDownButton>
  )
}

Select.Content = function SelectConent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <Select.ScrollUpButton />
        <Viewport className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}>
          {children}
        </Viewport>
        <Select.ScrollDownButton />
      </Content>
    </Portal>
  )
}

Select.Label = function SelectLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
}

Select.Item = function SelectItem({ className, children, ...props }: React.ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ItemIndicator>
          <Check className='h-4 w-4' />
        </ItemIndicator>
      </span>
      <ItemText>{children}</ItemText>
    </Item>
  )
}

Select.Separator = function SelectSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
}
