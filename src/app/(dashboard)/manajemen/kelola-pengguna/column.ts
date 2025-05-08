'use client'

import { ColumnDef } from '@tanstack/react-table'

export const UserColumn: ColumnDef<{ email: string; role: string; jabatan: string; jobLevel: string; status: string }>[] = [
  { accessorKey: 'email', header: 'Alamat Email' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'jabatan', header: 'Jabatan' },
  { accessorKey: 'jobLevel', header: 'Job Level' },
  { accessorKey: 'status', header: 'Status' }
]
