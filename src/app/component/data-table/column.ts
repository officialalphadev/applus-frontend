'use client'

import { ColumnDef } from '@tanstack/react-table'

import { IProduct } from '@/type'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 500
  },
  {
    accessorKey: 'category',
    header: 'Category',
    size: 500
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 500,
    cell: ({ row }) => {
      const price = row.original.price
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
      return formatted
    }
  }
]
