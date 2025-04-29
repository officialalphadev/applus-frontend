'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProduct, IProductQueryParams } from '@/type'
import { ProductService } from '@/service'
import { TIME } from '@/lib'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: IProductQueryParams) => [...productKeys.lists(), { ...filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  category: (category: string) => [...productKeys.categories(), category] as const
}

export const useProducts = (params?: IProductQueryParams) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => ProductService.GetProducts(params),
    staleTime: TIME.FIVE_MINUTES
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => ProductService.GetProduct(id),
    staleTime: TIME.TEN_MINUTES,
    enabled: !!id
  })
}

export const useProductSearch = (query: string) => {
  return useQuery({
    queryKey: [...productKeys.lists(), 'search', query],
    queryFn: () => ProductService.SearchProducts(query),
    enabled: query.length > 0,
    staleTime: TIME.TWO_MINUTES
  })
}

export const useProductsByCategory = (category: string, params?: IProductQueryParams) => {
  return useQuery({
    queryKey: [...productKeys.category(category), params],
    queryFn: () => ProductService.GetProductsByCategory(category, params),
    enabled: !!category,
    staleTime: TIME.FIVE_MINUTES
  })
}

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product: Omit<IProduct, 'id'>) => ProductService.AddProduct(product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productKeys.lists() })
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<IProduct> }) => ProductService.UpdateProduct(id, product),
    onSuccess: (data) => {
      queryClient.setQueryData(productKeys.detail(data.id), data)
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => ProductService.DeleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: productKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}
