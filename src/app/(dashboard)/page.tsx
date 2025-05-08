'use client'

import { useSession } from 'next-auth/react'

import { Card } from '@/component'

export default function DashboardPage() {
  const session = useSession()

  if (session.status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <Card>
        <Card.Header>
          <Card.Title>Welcome, {session.data?.user?.name}!</Card.Title>
          <Card.Description>You are now signed in to your account</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Email:</span>
              <span>{session.data?.user?.email}</span>
            </div>
            {session.data?.user?.name && (
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Username:</span>
                <span>{session.data?.user?.name}</span>
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}
