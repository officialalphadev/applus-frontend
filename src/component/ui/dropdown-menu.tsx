'use client'

import { Check, ChevronRight, Circle } from 'lucide-react'
import { RadioItem, Root, Separator, Sub, SubContent, SubTrigger, Trigger } from '@radix-ui/react-dropdown-menu'
import { CheckboxItem, Content, Group, Item, ItemIndicator, Label, Portal, RadioGroup } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/lib'

DropdownMenu.Trigger = Trigger
DropdownMenu.Group = Group
DropdownMenu.Portal = Portal
DropdownMenu.Sub = Sub
DropdownMenu.RadioGroup = RadioGroup

export function DropdownMenu(props: Readonly<React.ComponentProps<typeof Root>>) {
  return <Root {...props} />
}

DropdownMenu.SubTrigger = function DropdownMenuSubTrigger(props: React.ComponentProps<typeof SubTrigger> & { inset?: boolean }) {
  const { className, children, inset, ...rest } = props
  return (
    <SubTrigger
      className={cn(
        'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden',
        'focus:bg-accent data-[state=open]:bg-accent cursor-default select-none',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRight className='ml-auto' />
    </SubTrigger>
  )
}

DropdownMenu.SubContent = function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof SubContent>) {
  return (
    <SubContent
      className={cn(
        'bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  )
}

DropdownMenu.Content = function DropdownMenuContent({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </Portal>
  )
}

DropdownMenu.Item = function DropdownMenuItem({ className, inset, ...props }: React.ComponentProps<typeof Item> & { inset?: boolean }) {
  return (
    <Item
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'focus:bg-accent focus:text-accent-foreground',
        'outline-hidden transition-colors select-none',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
}

DropdownMenu.CheckboxItem = function DropdownMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof CheckboxItem>) {
  return (
    <CheckboxItem
      className={cn(
        'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'focus:bg-accent focus:text-accent-foreground',
        'outline-hidden transition-colors select-none',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ItemIndicator>
          <Check className='h-4 w-4' />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  )
}

DropdownMenu.RadioItem = function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof RadioItem>) {
  return (
    <RadioItem
      className={cn(
        'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        'focus:bg-accent focus:text-accent-foreground',
        'outline-hidden transition-colors select-none',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ItemIndicator>
          <Circle className='h-2 w-2 fill-current' />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  )
}

DropdownMenu.Label = function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof Label> & { inset?: boolean }) {
  return <Label className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />
}

DropdownMenu.Separator = function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
}

DropdownMenu.Shortcut = function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
}
