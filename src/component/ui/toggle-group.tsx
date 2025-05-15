'use client'

import * as React from 'react'
import { Root, Item } from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib'
import { toggleVariants } from './toggle'

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default'
})

export function ToggleGroup({ className, variant, children, size, ...props }: React.ComponentProps<typeof Root> & VariantProps<typeof toggleVariants>) {
  return (
    <Root className={cn('flex items-center justify-center gap-1', className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </Root>
  )
}

ToggleGroup.Item = function ToggleGroupItem({
  className,
  children,
  size,
  variant,
  ...props
}: React.ComponentPropsWithoutRef<typeof Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  return (
    <Item
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      )}
      {...props}
    >
      {children}
    </Item>
  )
}
