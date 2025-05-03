import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib'

export function Breadcrumb(props: React.ComponentPropsWithoutRef<'nav'> & { separator?: React.ReactNode }) {
  return <nav aria-label='breadcrumb' {...props} />
}

Breadcrumb.List = function BreadcrumbList({ className, ...props }: React.ComponentPropsWithoutRef<'ol'>) {
  return <ol className={cn('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className)} {...props} />
}

Breadcrumb.Item = function BreadcrumbItem({ className, ...props }: React.ComponentPropsWithoutRef<'li'>) {
  return <li className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}

Breadcrumb.Link = function BreadcrumbLink({
  className,
  asChild,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'a'
  return <Comp className={cn('hover:text-foreground transition-colors', className)} {...props} />
}

Breadcrumb.Page = function BreadcrumbPage({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span role='link' aria-disabled='true' aria-current='page' className={cn('text-foreground font-normal', className)} {...props} />
}

Breadcrumb.Separator = function BreadcrumbSeparator({ className, children, ...props }: React.ComponentPropsWithoutRef<'li'>) {
  return (
    <li role='presentation' aria-hidden='true' className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  )
}

Breadcrumb.Ellipsis = function BreadcrumbEllipsis({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span role='presentation' aria-hidden='true' className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
      <MoreHorizontal className='h-4 w-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}
