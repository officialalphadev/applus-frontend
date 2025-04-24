'use client'

import { cn } from '@/lib'

export function Input({ className, ...props }: Readonly<React.InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input
      className={cn(
        'border-input flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-hidden transition-all duration-300 md:text-sm',
        'focus:ring-ring/50 placeholder:text-muted-foreground focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
        'file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      {...props}
    />
  )
}
