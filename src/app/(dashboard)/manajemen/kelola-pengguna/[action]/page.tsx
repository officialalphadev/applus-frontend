'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { TambahPenggunaDefaultValue, TambahPenggunaSchema, TambahPenggunaType } from './schema'
import { Button, Card, Combobox, Form, Input, SelectModal } from '@/component'
import { useForm, useProducts, useSearchParams } from '@/hook'
import { Logger } from '@/lib'

const JABATAN_OPTIONS = [
  { id: '1', label: 'Jabatan 1' },
  { id: '2', label: 'Jabatan 2' },
  { id: '3', label: 'Jabatan 3' },
  { id: '4', label: 'Jabatan 4' },
  { id: '5', label: 'Jabatan 5' }
]

const JOB_LEVEL_OPTIONS = [
  { id: '1', label: 'Job Level 1' },
  { id: '2', label: 'Job Level 2' },
  { id: '3', label: 'Job Level 3' },
  { id: '4', label: 'Job Level 4' },
  { id: '5', label: 'Job Level 5' }
]

const UNIT_OPTIONS = [
  { id: '1', label: 'Unit 1' },
  { id: '2', label: 'Unit 2' },
  { id: '3', label: 'Unit 3' },
  { id: '4', label: 'Unit 4' },
  { id: '5', label: 'Unit 5' }
]

// const ROLE_OPTIONS = [
//   { id: '1', label: 'Role 1' },
//   { id: '2', label: 'Role 2' },
//   { id: '3', label: 'Role 3' },
//   { id: '4', label: 'Role 4' },
//   { id: '5', label: 'Role 5' }
// ]

export default function TambahPengguna() {
  const { searchParams } = useSearchParams()

  const id = searchParams.get('id')

  const form = useForm<TambahPenggunaType>({
    defaultValues: TambahPenggunaDefaultValue,
    schema: TambahPenggunaSchema
  })

  const { data } = useProducts({ limit: 10, skip: 0 })

  async function handleSubmit(payload: TambahPenggunaType) {
    Logger.Trace(payload)
    // const { status } = await SendMessageAction(payload)
    // toast({ title: message })
    // if (status === 'success') form.reset()
  }

  useEffect(() => {
    if (id) {
      form.setValue('email', '3m4tC@example.com')
      form.setValue('jabatanId', '1')
      form.setValue('jobLevelId', '1')
      form.setValue('roleId', '1')
      form.setValue('unitId', '1')
    }
  }, [form, id])

  return (
    <Card className='w-full'>
      <Card.Header>
        <Card.Title>{id ? 'Ubah' : 'Tambah'} Pengguna</Card.Title>
        <Card.Description>{`Form ${id ? 'ubah' : 'tambah'} pengguna.`}</Card.Description>
      </Card.Header>
      <Form form={form} onSubmit={handleSubmit}>
        <Card.Content>
          <Form.Field label='Email' name='email' render={(field) => <Input type='email' placeholder='Masukan email disini' {...field} />} />
          <Form.Field
            label='Jabatan'
            name='jabatanId'
            render={(field) => <Combobox options={JABATAN_OPTIONS} placeholder='Pilih jabatan disini' {...field} />}
          />
          <Form.Field
            label='Job Level'
            name='jobLevelId'
            render={(field) => <Combobox options={JOB_LEVEL_OPTIONS} placeholder='Pilih job level disini' {...field} />}
          />
          <Form.Field
            label='Unit / Lokasi Kerja'
            name='unitId'
            render={(field) => <Combobox options={UNIT_OPTIONS} placeholder='Pilih unit / lokasi kerja disini' {...field} />}
          />
          {/* <Form.Field label='Role' name='unitId' render={(field) => <Combobox options={ROLE_OPTIONS} placeholder='Pilih role disini' {...field} />} /> */}
          <Form.Field
            label='Role'
            name='roleId'
            render={(field) => (
              <SelectModal
                placeholder='Pilih role disini'
                data={data?.products || []}
                optionLabel={(product) => product.title}
                optionValue={(product) => String(product.id)}
                {...field}
              />
            )}
          />
        </Card.Content>
        <Card.Footer className='flex justify-end gap-4'>
          <Link href='/manajemen/kelola-pengguna'>
            <Button variant='outline'>Batal</Button>
          </Link>
          <Form.SubmitButton className='w-fit'>{id ? 'Ubah' : 'Tambah'}</Form.SubmitButton>
        </Card.Footer>
      </Form>
    </Card>
  )
}
