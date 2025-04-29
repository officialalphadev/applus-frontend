'use client'

import { Root } from '@radix-ui/react-label'

import { cn } from '@/lib'

export function Label({ className, ...props }: React.ComponentProps<typeof Root>) {
  return <Root className={cn('text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />
}
