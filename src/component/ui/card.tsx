'use client'

import { cn } from '@/lib'

export function Card({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('bg-card text-card-foreground rounded-xl border shadow-xs', className)} {...props} />
}

Card.Header = function CardHeader({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

Card.Title = function CardTitle({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('leading-none font-semibold tracking-tight', className)} {...props} />
}

Card.Description = function CardDescription({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('text-muted-foreground text-sm', className)} {...props} />
}

Card.Content = function CardContent({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

Card.Footer = function CardFooter({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
