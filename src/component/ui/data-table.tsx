'use client'

import { useEffect, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Button, DropdownMenu, Table } from '@/component'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  enableRowAction?: boolean
  renderActionMenu?: (row: TData) => React.ReactNode
}

export function DataTable<TData, TValue>({ columns: parentColumns, data, enableRowAction, renderActionMenu }: Readonly<DataTableProps<TData, TValue>>) {
  const [columns, setColumns] = useState(parentColumns)

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  useEffect(() => {
    const ActionColumn: ColumnDef<TData, TValue> = {
      // id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align='end'>{renderActionMenu?.(row.original)}</DropdownMenu.Content>
          </DropdownMenu>
        )
      }
    }

    if (enableRowAction) setColumns((columns) => [...columns, ActionColumn])
  }, [columns, enableRowAction, renderActionMenu])

  return (
    <div className='rounded-md border'>
      <Table>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return <Table.Head key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</Table.Head>
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell className='h-24 text-center'>No results.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}
