import ProductDetails from '@/component/products/product-details'

type Params = Promise<{ id: string }>

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params
  return (
    <div className='container mx-auto py-8'>
      <ProductDetails id={Number.parseInt(id, 10)} />
    </div>
  )
}
