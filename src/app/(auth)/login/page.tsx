'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { LoginDefaultValue, LoginSchema, LoginSchemaType } from './schema'
import { Card, Form, Input } from '@/component'
import { useForm } from '@/hook'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  const [error, setError] = useState('')

  const form = useForm<LoginSchemaType>({
    defaultValues: LoginDefaultValue,
    schema: LoginSchema
  })

  async function handleSubmit(payload: LoginSchemaType) {
    const response = await signIn('credentials', {
      username: payload.username,
      password: payload.password,
      redirect: false
    })

    if (response?.error) {
      setError(response.error)
      return
    }

    router.replace(callbackUrl)
  }

  return (
    <Card className='w-full max-w-md'>
      <Card.Header className='space-y-1 text-center'>
        <Card.Title className='text-2xl font-bold'>Masuk ke akun anda</Card.Title>
        <Card.Description>Masukkan kredensial anda untuk mengakses akun anda</Card.Description>
      </Card.Header>
      <Form form={form} onSubmit={handleSubmit}>
        <Card.Content className='space-y-4'>
          {error && <span>{error}</span>}
          <Form.Field label='Username' name='username' render={(field) => <Input {...field} type='text' required />} />
          <Form.Field label='Kata Sandi' name='password' render={(field) => <Input {...field} type='password' required />} />
          <Link href='#' className='text-primary text-sm font-medium hover:underline'>
            Lupa kata sandi?
          </Link>
        </Card.Content>
        <Card.Footer>
          <Form.SubmitButton className='w-full'>Masuk</Form.SubmitButton>
        </Card.Footer>
      </Form>
    </Card>
  )
}
