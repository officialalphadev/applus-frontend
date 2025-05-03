'use client'

import { Root } from '@radix-ui/react-separator'
import { cn } from '@/lib'

export function Separator({ className, orientation = 'horizontal', ...props }: React.ComponentProps<typeof Root>) {
  return <Root className={cn('bg-border shrink-0', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)} {...props} />
}
