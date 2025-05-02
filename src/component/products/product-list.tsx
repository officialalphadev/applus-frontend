'use client'

import ProductCard from './product-card'
import { useProducts, useSearchParams } from '@/hook'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

export default function ProductList() {
  const { searchParams, setSearchParams } = useSearchParams({ page: '1', limit: '10' })

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const skip = page * limit

  const { data, isLoading, isError, error } = useProducts({ limit, skip })

  const totalPages = Math.ceil((data?.total ?? 0) / limit) - 1

  if (isLoading || !skip) {
    return (
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='rounded-lg border p-4'>
            <Skeleton className='mb-4 h-48 w-full' />
            <Skeleton className='mb-2 h-6 w-3/4' />
            <Skeleton className='mb-4 h-4 w-1/2' />
            <Skeleton className='h-10 w-full' />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='mt-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700'>
        <p>Error loading products: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <Button variant='outline' className='mt-2' onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {data?.products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className='mt-8 flex items-center justify-between'>
        <Button onClick={() => setSearchParams({ page: String(page - 1) })} disabled={page === 0} variant='outline'>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setSearchParams({ page: String(page + 1) })} disabled={page + 1 >= totalPages} variant='outline'>
          Next
        </Button>
      </div>
    </div>
  )
}
