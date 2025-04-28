'use client'
import { redirect } from 'next/navigation'
import { Card, LogoutButton } from '@/component'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    redirect('/auth/login?callbackUrl=/dashboard')
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='container mx-auto flex-1 py-8'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <LogoutButton />
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <Card.Header>
              <Card.Title>Welcome, {session?.user?.name}!</Card.Title>
              <Card.Description>You are now signed in to your account</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Email:</span>
                  <span>{session?.user?.email}</span>
                </div>
                {session?.user?.name && (
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Username:</span>
                    <span>{session?.user?.name}</span>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      </main>
    </div>
  )
}
