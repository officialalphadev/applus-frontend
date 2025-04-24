'use client'

import { Animate, Button, Card } from '@/component'

export default function CardPage() {
  return (
    <Animate type='slideUp' asChild>
      <Card className='w-96'>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Deploy your new project in one-click.</Card.Description>
        </Card.Header>
        <Card.Content>Card Content</Card.Content>
        <Card.Footer className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </Card.Footer>
      </Card>
    </Animate>
  )
}
