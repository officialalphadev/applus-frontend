'use client'

import { X } from 'lucide-react'
import { Root, Trigger, Portal, Close, Overlay, Content, Title, Description, DialogProps } from '@radix-ui/react-dialog'
import { DialogOverlayProps, DialogPortalProps, DialogTitleProps, DialogDescriptionProps } from '@radix-ui/react-dialog'

import { cn } from '@/lib'

Dialog.Trigger = Trigger
Dialog.Portal = Portal
Dialog.Close = Close

export function Dialog(props: DialogProps) {
  return <Root {...props} />
}

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-lg',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  )
}
Dialog.Overlay = DialogOverlay

function DialogContent({ className, children, ...props }: DialogPortalProps & { className?: string }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Content
        className={cn(
          'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'bg-background grid w-full max-w-lg gap-4 border p-6 shadow-lg transition-all duration-500 sm:rounded-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          className={cn(
            'absolute top-4 right-4 rounded-sm opacity-70 transition-opacity',
            'ring-offset-background focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            'hover:opacity-100 disabled:pointer-events-none'
          )}
        >
          <X className='size-4' />
          <span className='sr-only'>Close</span>
        </Dialog.Close>
      </Content>
    </Dialog.Portal>
  )
}
Dialog.Content = DialogContent

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
}
Dialog.Header = DialogHeader

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}
Dialog.Footer = DialogFooter

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <Title className={cn('text-lg leading-none font-semibold tracking-tight', className)} {...props} />
}
Dialog.Title = DialogTitle

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <Description className={cn('text-muted-foreground text-sm', className)} {...props} />
}
Dialog.Description = DialogDescription
