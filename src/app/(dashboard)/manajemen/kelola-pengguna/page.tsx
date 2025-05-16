'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { DataTable, SplashScreen } from '@/component'
import { UserColumn } from './column'
import { useUsers } from '@/hook'
import { Logger } from '@/lib'

export default function KelolaPengguna() {
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const search = searchParams.get('search') ?? ''

  const { data: users, isFetching } = useUsers({ page, limit, search })

  const router = useRouter()

  if (isFetching) return <SplashScreen />

  return (
    <div className='space-y-8'>
      <div className='flex items-end gap-4'>
        <div className='flex-1 space-y-4'>
          <h1 className='text-2xl font-bold'>Kelola Pengguna</h1>
          <p className='text-base font-medium'>Lihat dan kelola pengguna serta tim dalam organisasi Anda</p>
        </div>
      </div>
      <DataTable
        data={users?.data?.rows ?? []}
        columns={UserColumn}
        onAddRow={() => router.push('/manajemen/kelola-pengguna/tambah-pengguna')}
        iconAddRow='user-round-plus'
        textAddRow='Tambah Pengguna'
        onViewRow={() => {}}
        onEditRow={(user) => router.push('/manajemen/kelola-pengguna/edit-pengguna?id=' + user.emailAddress)}
        onDeleteRow={() => Logger.Trace('delete row')}
        pagination={users?.data.meta}
        placeholderSearch='Cari pengguna ...'
        textButtonSearch='Cari'
        withSearchParams
      />
    </div>
  )
}
