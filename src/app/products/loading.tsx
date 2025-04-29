import { Skeleton } from '@/component'

export default function LoginLoading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='space-y-2'>
          <Skeleton className='mx-auto h-8 w-3/4' />
          <Skeleton className='mx-auto h-4 w-1/2' />
        </div>
        <div className='space-y-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
    </div>
  )
}
