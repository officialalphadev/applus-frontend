'use client'

import { useMemo } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

import { Button, DropdownMenu, Input, Select, Table } from '@/component'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onViewRow?: (row: TData) => void
  onDeleteRow?: (row: TData) => void
  onEditRow?: (row: TData) => void
  onSearch?: (value: string) => void
  pagination?: boolean
}

export function DataTable<TData, TValue>(props: Readonly<DataTableProps<TData, TValue>>) {
  const { columns: parentColumns, data, pagination = true, onDeleteRow, onEditRow, onViewRow, onSearch } = props

  const columns = useMemo(() => {
    if (!onViewRow && !onEditRow && !onDeleteRow) return parentColumns
    const actionColumn: ColumnDef<TData, TValue> = {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align='end'>
            {onViewRow && <DropdownMenu.Item onClick={() => onViewRow(row.original)}>View</DropdownMenu.Item>}
            {onEditRow && <DropdownMenu.Item onClick={() => onEditRow(row.original)}>Edit</DropdownMenu.Item>}
            {onDeleteRow && <DropdownMenu.Item onClick={() => onDeleteRow(row.original)}>Delete</DropdownMenu.Item>}
          </DropdownMenu.Content>
        </DropdownMenu>
      )
    }

    return [...parentColumns, actionColumn]
  }, [parentColumns, onViewRow, onEditRow, onDeleteRow])

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = event.currentTarget.search.value
    onSearch?.(search)
  }

  return (
    <div className='w-full divide-y rounded-md border'>
      {onSearch && (
        <form className='flex items-center justify-end gap-4 p-4' onSubmit={handleSearch}>
          <Input name='search' placeholder='Search...' className='max-w-sm' />
          <Button>Search</Button>
        </form>
      )}
      <Table>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</Table.Head>
              ))}
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
      {pagination && (
        <div className='flex items-center justify-between p-4'>
          <div className='text-muted-foreground flex-1 text-sm'>
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='flex items-center space-x-6 lg:space-x-8'>
            <div className='flex items-center space-x-2'>
              <p className='text-sm font-medium'>Rows per page</p>
              <Select value={String(table.getState().pagination.pageSize)} onValueChange={(value) => table.setPageSize(Number(value))}>
                <Select.Trigger className='h-8 w-[70px]'>
                  <Select.Value placeholder={table.getState().pagination.pageSize} />
                </Select.Trigger>
                <Select.Content side='top'>
                  {['10', '20', '30', '40', '50'].map((pageSize) => (
                    <Select.Item key={pageSize} value={pageSize}>
                      {pageSize}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeft />
              </Button>
              <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
