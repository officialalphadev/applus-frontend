import { Button } from '@/component'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='mb-8 text-4xl font-bold'>Welcome to Next.js Authentication</h1>
      <p className='mb-8 text-xl'>Get started by signing in to your account</p>
      <Button asChild size='lg'>
        <Link href='/'>Get Started</Link>
      </Button>
    </div>
  )
}
