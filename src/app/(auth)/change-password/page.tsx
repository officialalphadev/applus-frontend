'use client'

import { Animate, Card, Form, Input } from '@/component'
import { useForm } from '@/hook'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ChangePasswordDefaultValue, ChangePasswordSchema, ChangePasswordSchemaType } from './schema'

export default function ChangePasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  const [error, setError] = useState('')

  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: ChangePasswordDefaultValue,
    schema: ChangePasswordSchema
  })

  async function handleSubmit(payload: ChangePasswordSchemaType) {
    console.log('DATA', payload)

    if (payload) {
      setError('')
    }

    router.replace(callbackUrl)
  }

  return (
    <div className='flex h-full items-center justify-center px-4 lg:px-0'>
      <Animate type='slideUp' asChild>
        <Card className='w-full max-w-[674px]'>
          <Card.Header className='space-y-3'>
            <div className='space-y-2'>
              <Card.Title className='text-xl font-semibold text-neutral-700 lg:text-2xl'>Ubah Password Terlebih Dahulu</Card.Title>
              <Card.Description className='text-sm text-neutral-400 lg:text-base'>
                Demi keamanan akun , kami mewajibkan perubahan password sebelum mengakses halaman dashboard.{' '}
              </Card.Description>
            </div>
            <Card.Description className='text-xs text-neutral-400'>
              *Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol agar lebih kuat.
            </Card.Description>
          </Card.Header>
          <Form form={form} onSubmit={handleSubmit}>
            <Card.Content className='space-y-6'>
              {error && <span>{error}</span>}
              <Form.Field
                label='Kata Sandi'
                name='password'
                render={(field) => <Input {...field} type='password' placeholder='Buat kata sandi baru' required />}
              />
              <Form.Field
                label='Konfirmasi Kata Sandi'
                name='password'
                render={(field) => <Input {...field} type='password' placeholder='Ketik ulang kata sandi baru' required />}
              />
            </Card.Content>
            <Card.Footer className='flex items-center justify-center'>
              <Form.SubmitButton className='max-w-[158px]'>Ubah Kata Sandi</Form.SubmitButton>
            </Card.Footer>
          </Form>
        </Card>
      </Animate>
    </div>
  )
}
