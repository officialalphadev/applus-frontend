'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, X } from 'lucide-react'

import { useDebounce, useProductSearch } from '@/hook'
import { Button, Card, Input } from '@/component'

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data, isLoading } = useProductSearch(debouncedSearchTerm)

  const handleClear = () => setSearchTerm('')

  return (
    <div className='relative mb-8'>
      <div className='flex gap-2'>
        <div className='relative flex-grow'>
          <Search className='absolute top-2.5 left-2.5 h-4 w-4 text-gray-500' />
          <Input type='search' placeholder='Search products...' className='pl-8' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {searchTerm && (
            <Button variant='ghost' size='sm' className='absolute top-0 right-0 h-full px-3' onClick={handleClear}>
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>
      </div>

      {debouncedSearchTerm && (
        <Card className='absolute z-10 mt-1 w-full shadow-lg'>
          <Card.Content className='p-2'>
            {isLoading ? (
              <p className='p-2 text-sm text-gray-500'>Searching...</p>
            ) : data?.products && data.products.length > 0 ? (
              <ul className='divide-y'>
                {data.products.slice(0, 5).map((product) => (
                  <li key={product.id} className='py-2'>
                    <Link href={`/products/${product.id}`} className='flex items-center gap-3 rounded p-2 hover:bg-gray-50'>
                      <div className='h-10 w-10 rounded bg-gray-100'>
                        {/* <img
                          src={product.thumbnail || `/placeholder.svg?height=40&width=40`}
                          alt={product.title}
                          className='h-full w-full rounded object-cover'
                        /> */}
                        <Image src={product.thumbnail} alt={product.title} width={40} height={40} placeholder='blur' blurDataURL={'/placeholder.svg'} />
                      </div>
                      <div>
                        <p className='font-medium'>{product.title}</p>
                        <p className='text-sm text-gray-500'>${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
                {data.products.length > 5 && (
                  <li className='py-2 text-center'>
                    <Link href={`/products/search?q=${encodeURIComponent(debouncedSearchTerm)}`} className='text-primary text-sm hover:underline'>
                      View all {data.total} results
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <p className='p-2 text-sm text-gray-500'>No products found</p>
            )}
          </Card.Content>
        </Card>
      )}
    </div>
  )
}
