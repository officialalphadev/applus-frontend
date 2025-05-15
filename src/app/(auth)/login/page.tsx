'use client'

import { Form, Input } from '@/component'
import { useForm } from '@/hook'
import { LoginDefaultValue, LoginSchema, LoginSchemaType } from './schema'
import { AuthService } from '@/service'

export default function LoginPage() {
  const form = useForm<LoginSchemaType>({
    defaultValues: LoginDefaultValue,
    schema: LoginSchema
  })

  async function handleSubmit(payload: LoginSchemaType) {
    const response = await AuthService.SignIn(payload)
    if (response.statusCode === 201) document.location.reload()
  }

  return (
    <div className='flex h-full flex-row gap-10 px-10 py-6'>
      <div className='hidden w-1/2 items-center justify-center rounded-md bg-neutral-900 lg:flex'>
        <span className='text-3xl font-bold text-white'>Dinas Pendidikan</span>
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-10 lg:w-1/2'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-semibold text-neutral-900'>Masuk ke Akun Kamu</h1>
          <p className='text-base font-normal text-neutral-700'>
            Silakan masuk dengan email dan kata sandi yang telah terdaftar. Jika belum punya akun, hubungi admin untuk dibuatkan.
          </p>
        </div>
        <Form form={form} onSubmit={handleSubmit} className='flex w-full flex-col gap-10'>
          <div className='flex w-full flex-col gap-6'>
            <Form.Field label='Email' name='emailAddress' render={(field) => <Input {...field} type='email' className='w-full' required />} />
            <Form.Field label='Kata Sandi' name='password' render={(field) => <Input {...field} type='password' required />} />
          </div>
          <div className='flex w-full items-center justify-start'>
            <Form.SubmitButton className='max-w-[150px]'>Masuk</Form.SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  )
}
