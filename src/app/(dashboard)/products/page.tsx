import ProductList from '@/component/products/product-list'
import ProductSearch from '@/component/products/product-search'

export default function ProductsPage() {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-6 text-3xl font-bold'>Products</h1>
      <ProductSearch />
      <ProductList />
    </div>
  )
}
