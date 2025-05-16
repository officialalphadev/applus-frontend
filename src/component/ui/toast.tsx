'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Provider, Viewport, Root, Action, Close, Title, Description } from '@radix-ui/react-toast'

import { Icon } from '@/component'
import { cn } from '@/lib'

export type ToastActionElement = React.ReactElement<typeof Action>

export const toastVariants = cva(
  cn(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-2',
    'overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all duration-300',
    'data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full data-[state=open]:animate-in',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[swipe=cancel]:translate-x-0',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none'
  ),
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)

Toast.Provider = Provider

export function Toast({ className, variant, ...props }: React.ComponentProps<typeof Root> & VariantProps<typeof toastVariants>) {
  return <Root className={cn(toastVariants({ variant }), className)} {...props} />
}

Toast.Viewport = function ToastViewport({ className, ...props }: React.ComponentProps<typeof Viewport>) {
  return (
    <Viewport
      className={cn(
        'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4',
        'sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
        className
      )}
      {...props}
    />
  )
}

Toast.Action = function ToastAction({ className, ...props }: React.ComponentProps<typeof Action>) {
  return (
    <Action
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors',
        'focus:ring-ring focus:group-[.destructive]:ring-destructive focus:ring-1 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
        'hover:bg-secondary group-[.destructive]:border-muted/40 hover:group-[.destructive]:border-destructive/30',
        'hover:group-[.destructive]:bg-destructive hover:group-[.destructive]:text-destructive-foreground',
        className
      )}
      {...props}
    />
  )
}

Toast.Close = function ToastClose({ className, ...props }: React.ComponentProps<typeof Close>) {
  return (
    <Close
      className={cn(
        'text-foreground/50 hover:text-foreground absolute top-1 right-1 rounded-md p-1 opacity-0 transition-opacity',
        'focus:opacity-100 focus:ring-1 focus:outline-hidden focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600',
        'group-hover:opacity-100 group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50',
        className
      )}
      {...props}
    >
      <Icon name='x' className='size-4' />
    </Close>
  )
}

Toast.Title = function ToastTitle({ className, ...props }: React.ComponentProps<typeof Title>) {
  return <Title className={cn('text-sm font-semibold [&+div]:text-xs', className)} {...props} />
}

Toast.Description = function ToastDescription({ className, ...props }: React.ComponentProps<typeof Description>) {
  return <Description className={cn('text-sm opacity-90', className)} {...props} />
}
