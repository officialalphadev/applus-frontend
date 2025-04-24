'use client'

import { LabelProps, Root } from '@radix-ui/react-label'

import { cn } from '@/lib'

export function Label({ className, ...props }: LabelProps) {
  return <Root className={cn('text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />
}
