'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog'

import { Icon } from '@/component'
import { cn } from '@/lib'

// const Sheet = SheetPrimitive.Root
export function Sheet(props: Readonly<React.ComponentProps<typeof Root>>) {
  return <Root {...props} />
}

Sheet.Trigger = Trigger

Sheet.Close = Close

Sheet.Portal = Portal

Sheet.Overlay = function SheetOverlay({ className, ...props }: React.ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
        className
      )}
      {...props}
    />
  )
}

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof Content>, VariantProps<typeof sheetVariants> {}

Sheet.Content = function SheetContent({ className, side = 'right', children, ...props }: SheetContentProps) {
  return (
    <Portal>
      <Overlay />
      <Content className={cn(sheetVariants({ side }), className)} {...props}>
        <Close className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'>
          <Icon name='x' className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </Close>
        {children}
      </Content>
    </Portal>
  )
}

Sheet.Header = function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
}

Sheet.Footer = function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
}

Sheet.Title = function SheetTitle({ className, ...props }: React.ComponentProps<typeof Title>) {
  return <Title className={cn('text-foreground text-lg font-semibold', className)} {...props} />
}

Sheet.Description = function SheetDescription({ className, ...props }: React.ComponentProps<typeof Description>) {
  return <Description className={cn('text-muted-foreground text-sm', className)} {...props} />
}
