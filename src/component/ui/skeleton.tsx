import { cn } from '@/lib'

export function Skeleton({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />
}
