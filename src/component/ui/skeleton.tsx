import { cn } from '@/lib'

export function Skeleton({ className, ...props }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  // by default using bg-muted
  return <div className={cn('animate-pulse rounded-md bg-neutral-300', className)} {...props} />
}
