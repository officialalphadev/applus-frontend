'use client'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'
import { IProduct } from '@/type/product-type'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Image from 'next/image'

interface ProductCardProps {
  product: IProduct
}

export default function ProductCard({ product }: Readonly<ProductCardProps>) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Card className='flex h-full flex-col overflow-hidden'>
      <div className='relative aspect-square w-full bg-gray-100'>
        {/* <img src={product.thumbnail || `/placeholder.svg?height=300&width=300`} alt={product.title} className='h-full w-full object-cover' /> */}
        <Image src={product.thumbnail} alt={product.title} width={300} height={300} placeholder='blur' blurDataURL={'/placeholder.svg'} />
        {product.discountPercentage > 0 && <Badge className='absolute top-2 right-2 bg-red-500'>{Math.round(product.discountPercentage)}% OFF</Badge>}
      </div>

      <Card.Header className='pb-2'>
        <div className='flex items-start justify-between'>
          <Card.Title className='line-clamp-1 text-lg'>{product.title}</Card.Title>
          <Badge variant='outline'>{product.category}</Badge>
        </div>
        <Card.Description className='line-clamp-2'>{product.description}</Card.Description>
      </Card.Header>

      <Card.Content className='flex-grow pb-2'>
        <div className='mb-2 flex items-center'>
          <div className='flex items-center'>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className='ml-2 text-xs'>({product.rating.toFixed(1)})</span>
        </div>

        <div className='flex items-baseline gap-2'>
          {product.discountPercentage > 0 && <span className='text-sm text-gray-500 line-through'>${product.price.toFixed(2)}</span>}
          <span className='text-lg font-bold'>${discountedPrice.toFixed(2)}</span>
        </div>

        <div className='mt-2 text-sm'>
          <span className={`${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
          </span>
        </div>
      </Card.Content>

      <Card.Footer>
        <Button asChild className='w-full'>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </Card.Footer>
    </Card>
  )
}
