'use client'

import { IUser } from '@/type'
import { ColumnDef } from '@tanstack/react-table'

export const UserColumn: ColumnDef<IUser>[] = [
  { accessorKey: 'emailAddress', header: 'Alamat Email' },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const { isActive } = row.original
      return isActive ? 'Aktif' : 'Tidak Aktif'
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Dibuat',
    cell: ({ row }) => {
      const { createdAt } = row.original
      const date = new Date(createdAt)
      const formatted = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(date)
      return formatted
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Terakhir Diubah',
    cell: ({ row }) => {
      const { createdAt } = row.original
      const date = new Date(createdAt)
      const formatted = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(date)
      return formatted
    }
  }
]
