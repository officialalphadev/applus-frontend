import { Button } from '@/component'

export default function ButtonPage() {
  return (
    <>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Button variant='default'>Default</Button>
        <Button variant='destructive'>Destructive</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='link'>Link</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='secondary'>Secondary</Button>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Button variant='default' size='sm'>
          Small
        </Button>
        <Button variant='destructive' size='default'>
          Default
        </Button>
        <Button variant='ghost' size='lg'>
          Large
        </Button>
        <Button variant='outline' size='icon'>
          Icon
        </Button>
      </div>
    </>
  )
}
