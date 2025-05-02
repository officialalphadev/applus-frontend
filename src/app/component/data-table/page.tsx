'use client'

import { useProducts, useProductSearch, useSearchParams } from '@/hook'
import { Animate, DataTable } from '@/component'
import { columns } from './column'

export default function DataTablePage() {
  const { searchParams, setSearchParams } = useSearchParams({ search: undefined })

  const search = searchParams.get('search') ?? ''

  const products = useProducts({ limit: 1000, skip: 0 })
  const productsSearch = useProductSearch(search)

  if (products.isLoading || productsSearch.isLoading) return null

  return (
    <div className='h-screen w-2xl'>
      <Animate type='slideUp' asChild>
        <DataTable
          data={search ? (productsSearch.data?.products ?? []) : (products.data?.products ?? [])}
          columns={columns}
          onViewRow={() => alert('view')}
          onEditRow={() => alert('edit')}
          onDeleteRow={() => alert('delete')}
          onSearch={(value) => setSearchParams({ search: value })}
        />
      </Animate>
    </div>
  )
}
