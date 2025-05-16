'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { Button, ConfirmDeleteModal, Icon, Input, Show, Table } from '@/component'
import { useSetSearchParams } from '@/hook'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  onAddRow?: () => void
  iconAddRow?: React.ComponentProps<typeof Icon>['name']
  textAddRow?: string

  onViewRow?: (row: TData) => void
  onDeleteRow?: (row: TData) => void
  onEditRow?: (row: TData) => void

  onSearch?: (value: string) => void
  placeholderSearch?: string
  textButtonSearch?: string
  defaultSearch?: string
  withSearchParams?: boolean

  pagination?: {
    page: number
    pages: number
    limit: number
    total: number
  }
}

export function DataTable<TData, TValue>(props: Readonly<DataTableProps<TData, TValue>>) {
  const { columns: parentColumns, data, pagination, onDeleteRow, onEditRow, onViewRow, onSearch, defaultSearch, withSearchParams } = props
  const { onAddRow, textAddRow, iconAddRow, placeholderSearch, textButtonSearch } = props

  const setSearchParams = useSetSearchParams()
  const searchParams = useSearchParams()

  const [stateDefaultSearch] = useState(withSearchParams ? (searchParams.get('search') ?? '') : defaultSearch)

  const columns = useMemo(() => {
    if (!onViewRow && !onEditRow && !onDeleteRow) return parentColumns
    const actionColumn: ColumnDef<TData, TValue> = {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
          <Show when={!!onViewRow}>
            <Button size='icon' variant='outline' onClick={() => onViewRow!(row.original)}>
              <Icon name='eye' />
            </Button>
          </Show>
          <Show when={!!onEditRow}>
            <Button size='icon' variant='outline' onClick={() => onEditRow!(row.original)}>
              <Icon name='square-pen' />
            </Button>
          </Show>
          <Show when={!!onDeleteRow}>
            <ConfirmDeleteModal onConfirm={() => onDeleteRow?.(row.original)}>
              <Button size='icon' variant='outline'>
                <Icon name='trash-2' />
              </Button>
            </ConfirmDeleteModal>
          </Show>
        </div>
      )
    }

    return [...parentColumns, actionColumn]
  }, [parentColumns, onViewRow, onEditRow, onDeleteRow])

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onEnd',
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel()
  })

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = event.currentTarget.search.value ?? ''
    if (withSearchParams) {
      setSearchParams({ search, page: '1' })
    } else {
      onSearch?.(search)
    }
  }

  return (
    <div className='w-full divide-y rounded-md border'>
      <div className='flex items-center p-4'>
        {(onSearch || withSearchParams) && (
          <form className='flex flex-1 items-center gap-4' onSubmit={handleSearch}>
            <Input name='search' placeholder={placeholderSearch ?? 'Search...'} defaultValue={stateDefaultSearch} className='max-w-sm' />
            <Button>{textButtonSearch ?? 'Search'}</Button>
          </form>
        )}
        {onAddRow && (
          <Button onClick={onAddRow} className='h-10'>
            <Icon name={iconAddRow ?? 'plus'} /> <span>{textAddRow ?? 'Tambah data'}</span>
          </Button>
        )}
      </div>
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
              <Table.Cell className='h-24 text-center' colSpan={columns.length}>
                No results.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {pagination && (
        <div className='flex items-center justify-between p-4'>
          <div className='flex w-full items-center justify-between space-x-6 lg:space-x-8'>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Page {pagination.page} of {pagination.pages}
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => setSearchParams({ page: '1' })} disabled={pagination.page === 1}>
                <span className='sr-only'>Go to first page</span>
                <Icon name='chevrons-left' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => setSearchParams({ page: String(pagination.page - 1) })}
                disabled={pagination.page === 1}
              >
                <span className='sr-only'>Go to previous page</span>
                <Icon name='chevron-left' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => setSearchParams({ page: String(pagination.page + 1) })}
                disabled={pagination.page === pagination.pages || pagination.pages === 0}
              >
                <span className='sr-only'>Go to next page</span>
                <Icon name='chevron-right' />
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => setSearchParams({ page: String(pagination.pages) })}
                disabled={pagination.page === pagination.pages || pagination.pages === 0}
              >
                <span className='sr-only'>Go to last page</span>
                <Icon name='chevrons-right' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
