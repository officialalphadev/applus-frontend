'use client'

import { Root, Indicator } from '@radix-ui/react-checkbox'

import { Icon } from '@/component'
import { cn } from '@/lib'

export function Checkbox({ className, ...props }: React.ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn(
        'peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Indicator className={cn('flex items-center justify-center text-current')}>
        <Icon name='check' className='h-4 w-4' />
      </Indicator>
    </Root>
  )
}
