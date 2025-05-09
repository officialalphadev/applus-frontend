'use client'

import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button, DataTable } from '@/component'
import { UserColumn } from './column'
import { Logger } from '@/lib'

const users = [
  {
    email: 'kpldisdik@gmail.com',
    role: 'Super Admin',
    jabatan: 'Kepala Dinas Pendidikan',
    jobLevel: 'Eselon IIb',
    status: 'Active'
  },
  {
    email: 'skrtarisdisdik@gmail.com',
    role: 'Admin Utama',
    jabatan: 'Sekertaris Dinas',
    jobLevel: 'Eselon IIIa',
    status: 'Active'
  },
  {
    email: 'kabiddisdik@gmail.com',
    role: 'Manager Bidang',
    jabatan: 'Kepala Bidang (Kabid)',
    jobLevel: 'Eselon IIIa/b',
    status: 'Active'
  },
  {
    email: 'kasidisdik@gmail.com',
    role: 'Admin',
    jabatan: 'Kepala Seksi (Kasi)',
    jobLevel: 'Eselon IVa',
    status: 'Active'
  },
  {
    email: 'subkrdnator@gmail.com',
    role: 'Admin Pendukung',
    jabatan: 'Subkoordinator/Subbagian',
    jobLevel: 'Eselon IVb',
    status: 'Active'
  },
  {
    email: 'anlsiskpgwaian@gmail.com',
    role: 'Admin Kepegawaian',
    jabatan: 'Analisis Kepegawaian',
    jobLevel: 'Fungsional Ahli',
    status: 'Active'
  },
  {
    email: 'prncanadisdik@gmail.com',
    role: 'Admin Perencanaan',
    jabatan: 'Perencana',
    jobLevel: 'Fungsional Ahli',
    status: 'Active'
  },
  {
    email: 'arsiparis_kom@gmail.com',
    role: 'Admin Teknis',
    jabatan: 'Arsiparis, Pranata Komputer, dll',
    jobLevel: 'Fungsional Terampil',
    status: 'Active'
  },
  {
    email: 'operatordpdk@gmail.com',
    role: 'Operator',
    jabatan: 'Operator Dapodik / Keuangan',
    jobLevel: 'Pelaksana / Entry Level',
    status: 'Active'
  },
  {
    email: 'staftu@gmail.com',
    role: 'Data Entry',
    jabatan: 'Staf TU / Admin Subbag',
    jobLevel: 'Entry-level / Non-eselon',
    status: 'Active'
  }
]

export default function KelolaPengguna() {
  const router = useRouter()

  return (
    <div className='space-y-8'>
      <div className='flex items-end gap-4'>
        <div className='flex-1 space-y-4'>
          <h1 className='text-2xl font-bold'>Kelola Pengguna</h1>
          <p className='text-base font-medium'>Lihat dan kelola pengguna serta tim dalam organisasi Anda</p>
        </div>
        <Link href='/manajemen/kelola-pengguna/tambah-pengguna'>
          <Button>
            <PlusIcon /> Tambah Pegguna
          </Button>
        </Link>
      </div>
      <DataTable
        data={users}
        columns={UserColumn}
        onEditRow={(user) => router.push('/manajemen/kelola-pengguna/edit-pengguna?id=' + user.email)}
        onDeleteRow={() => Logger.Trace('delete row')}
        onSearch={() => {}}
      />
    </div>
  )
}
