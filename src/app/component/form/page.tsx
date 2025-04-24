'use client'

// import { motion } from 'motion/react'

import { Form, Input, Textarea, Animate, Card } from '@/component'
import { SendMessageDefaultValue, SendMessageSchema, TSendMessageSchema } from './schema'
import { SendMessageAction } from './action'
import { useForm } from '@/hook'
// import { slideUpAnimate } from '@/libs'
// import { useEffect } from 'react'

// const OPTIONS = [
//   { id: 'next.js', label: 'Next.js' },
//   { id: 'sveltekit', label: 'SvelteKit' },
//   { id: 'nuxt.js', label: 'Nuxt.js' },
//   { id: 'remix', label: 'Remix' },
//   { id: 'astro', label: 'Astro' }
// ]

export default function FormPage() {
  // const { toast } = useToast()

  const form = useForm<TSendMessageSchema>({ defaultValues: SendMessageDefaultValue, schema: SendMessageSchema })

  async function handleSubmit(payload: TSendMessageSchema) {
    const { status } = await SendMessageAction(payload)
    // toast({ title: message })s
    if (status === 'success') form.reset()
  }

  // useEffect(() => {
  //   form.setValue('name', 'Hendra')
  //   form.setValue('email', '3m4tC@example.com')
  //   form.setValue('message', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem?')
  //   form.setValue('category', OPTIONS[0].id)
  // }, [form])

  return (
    <Animate type='slideUp' asChild>
      <Card className='w-96'>
        <Card.Header>
          <Card.Title>Form</Card.Title>
        </Card.Header>
        <Card.Content>
          <Form form={form} onSubmit={handleSubmit}>
            <Form.Field label='Nama' name='name' render={(field) => <Input type='text' {...field} />} />
            <Form.Field label='Email' name='email' render={(field) => <Input type='email' {...field} />} />
            <Form.Field label='Pesan' name='message' render={(field) => <Textarea rows={6} {...field} />} />
            <Form.SubmitButton>Kirim Pesan</Form.SubmitButton>
          </Form>
        </Card.Content>
      </Card>
    </Animate>
  )
}
