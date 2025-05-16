'use client'

import Link from 'next/link'
// import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { LoginDefaultValue, LoginSchema, TLoginSchema } from './schema'
import { Card, Form, Input } from '@/component'
import { useForm } from '@/hook'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  // const [error, setError] = useState('')

  const form = useForm<TLoginSchema>({
    defaultValues: LoginDefaultValue,
    schema: LoginSchema
  })

  async function handleSubmit(payload: TLoginSchema) {
    // const response = await signIn('credentials', {
    //   username: payload.username,
    //   password: payload.password,
    //   redirect: false
    // })

    // if (response?.error) {
    //   setError(response.error)
    //   return
    // }

    console.log('DATA', payload)

    router.replace(callbackUrl)
  }

  return (
    <div className='flex h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <Card.Header className='space-y-1 text-center'>
          <Card.Title className='text-2xl font-bold'>Sign in to your account</Card.Title>
          <Card.Description>Enter your credentials to access your account</Card.Description>
        </Card.Header>
        <Form form={form} onSubmit={handleSubmit}>
          <Card.Content className='space-y-4'>
            {/* {error && <span>{error}</span>} */}
            <Form.Field label='Username' name='username' render={(field) => <Input {...field} type='text' required />} />
            <Form.Field label='Password' name='password' render={(field) => <Input {...field} type='password' required />} />
            <Link href='#' className='text-primary text-sm font-medium hover:underline'>
              Forgot password?
            </Link>
          </Card.Content>
          <Card.Footer>
            <Form.SubmitButton className='w-full'>Sign in</Form.SubmitButton>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  )
}
