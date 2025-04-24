'use client'

import { cn } from '@/lib'

export function Table({ className, ...props }: Readonly<React.HTMLAttributes<HTMLTableElement>>) {
  return (
    <div className='relative w-full overflow-auto'>
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

Table.Header = function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />
}

Table.Body = function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

Table.Footer = function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)} {...props} />
}

Table.Row = function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)} {...props} />
}

Table.Head = function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}

Table.Cell = function TableCell({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)} {...props} />
}

Table.Caption = function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
}
