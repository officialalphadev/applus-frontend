'use client'

import { Fallback, Image, Root } from '@radix-ui/react-avatar'

import { cn } from '@/lib'

export function Avatar({ className, ...props }: React.ComponentProps<typeof Root>) {
  return <Root className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
}

Avatar.Image = function AvatarImage({ className, ...props }: React.ComponentProps<typeof Image>) {
  return <Image className={cn('aspect-square h-full w-full', className)} alt={props.alt} {...props} />
}

Avatar.Fallback = function AvatarFallback({ className, ...props }: React.ComponentProps<typeof Fallback>) {
  return <Fallback className={cn('bg-muted flex h-full w-full items-center justify-center rounded-full', className)} {...props} />
}
