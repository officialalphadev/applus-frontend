'use client'
import { StarIcon, ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import { useProduct } from '@/hook'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card } from '../ui/card'
import Image from 'next/image'

interface ProductDetailsProps {
  id: number
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const { data: product, isLoading, isError, error } = useProduct(id)

  if (isLoading) {
    return (
      <div>
        <div className='mb-6 flex items-center'>
          <Skeleton className='mr-4 h-10 w-24' />
          <Skeleton className='h-8 w-48' />
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <Skeleton className='aspect-square w-full' />
          <div className='space-y-4'>
            <Skeleton className='h-10 w-3/4' />
            <Skeleton className='h-6 w-1/2' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-12 w-full' />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className='rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700'>
        <p>Error loading product: {error instanceof Error ? error.message : 'Product not found'}</p>
        <Button variant='outline' className='mt-2' asChild>
          <Link href='/products'>Back to Products</Link>
        </Button>
      </div>
    )
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div>
      <div className='mb-6 flex items-center'>
        <Button variant='ghost' asChild className='mr-4'>
          <Link href='/products'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Products
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>{product.title}</h1>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100'>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={600}
            height={600}
            placeholder='blur'
            blurDataURL={'/placeholder.svg?height=600&width=600'}
          />
          {product.discountPercentage > 0 && (
            <Badge className='absolute top-4 right-4 bg-red-500 text-white'>{Math.round(product.discountPercentage)}% OFF</Badge>
          )}
        </div>

        <div>
          <div className='mb-2 flex items-center gap-2'>
            <Badge variant='outline'>{product.category}</Badge>
            <Badge variant='outline'>{product.brand}</Badge>
          </div>

          <div className='mb-4 flex items-center'>
            <div className='flex items-center'>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className='ml-2'>({product.rating.toFixed(1)})</span>
          </div>

          <p className='mb-6 text-gray-700'>{product.description}</p>

          <div className='mb-4 flex items-baseline gap-3'>
            {product.discountPercentage > 0 && <span className='text-lg text-gray-500 line-through'>${product.price.toFixed(2)}</span>}
            <span className='text-3xl font-bold'>${discountedPrice.toFixed(2)}</span>
          </div>

          <div className='mb-6'>
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm ${
                product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock > 10 ? `In Stock (${product.stock} available)` : product.stock > 0 ? `Low Stock (${product.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          <Button className='w-full' disabled={product.stock === 0}>
            <ShoppingCart className='mr-2 h-4 w-4' />
            Add to Cart
          </Button>

          <div className='mt-8'>
            <Tabs defaultValue='details'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='details'>Details</TabsTrigger>
                <TabsTrigger value='shipping'>Shipping</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value='details' className='mt-4'>
                <Card>
                  <Card.Content className='pt-4'>
                    <dl className='divide-y'>
                      <div className='grid grid-cols-3 py-2'>
                        <dt className='font-medium text-gray-500'>Brand</dt>
                        <dd className='col-span-2'>{product.brand}</dd>
                      </div>
                      <div className='grid grid-cols-3 py-2'>
                        <dt className='font-medium text-gray-500'>SKU</dt>
                        <dd className='col-span-2'>{product.sku}</dd>
                      </div>
                      <div className='grid grid-cols-3 py-2'>
                        <dt className='font-medium text-gray-500'>Weight</dt>
                        <dd className='col-span-2'>{product.weight} kg</dd>
                      </div>
                      <div className='grid grid-cols-3 py-2'>
                        <dt className='font-medium text-gray-500'>Dimensions</dt>
                        <dd className='col-span-2'>
                          {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                        </dd>
                      </div>
                      <div className='grid grid-cols-3 py-2'>
                        <dt className='font-medium text-gray-500'>Warranty</dt>
                        <dd className='col-span-2'>{product.warrantyInformation}</dd>
                      </div>
                    </dl>
                  </Card.Content>
                </Card>
              </TabsContent>
              <TabsContent value='shipping' className='mt-4'>
                <Card>
                  <Card.Content className='pt-4'>
                    <h3 className='mb-2 font-medium'>Shipping Information</h3>
                    <p className='mb-4'>{product.shippingInformation}</p>

                    <div className='space-y-2'>
                      <div className='flex justify-between border-b py-2'>
                        <span className='text-gray-500'>Delivery Time</span>
                        <span>3-5 business days</span>
                      </div>
                      <div className='flex justify-between border-b py-2'>
                        <span className='text-gray-500'>Return Policy</span>
                        <span>{product.returnPolicy}</span>
                      </div>
                      <div className='flex justify-between py-2'>
                        <span className='text-gray-500'>Minimum Order</span>
                        <span>{product.minimumOrderQuantity} units</span>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </TabsContent>
              <TabsContent value='reviews' className='mt-4'>
                <Card>
                  <Card.Content className='pt-4'>
                    <h3 className='mb-4 font-medium'>Customer Reviews</h3>

                    {product.reviews.length > 0 ? (
                      <div className='space-y-4'>
                        {product.reviews.map((review, index) => (
                          <div key={index} className='border-b pb-4 last:border-0'>
                            <div className='mb-2 flex items-center justify-between'>
                              <div>
                                <p className='font-medium'>{review.reviewerName}</p>
                                <p className='text-xs text-gray-500'>{new Date(review.date).toLocaleDateString()}</p>
                              </div>
                              <div className='flex'>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                            <p>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className='text-gray-500'>No reviews yet</p>
                    )}
                  </Card.Content>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
