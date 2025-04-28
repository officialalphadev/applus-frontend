import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/services/product.service'
import type { IProduct, IProductQueryParams } from '@/type/product.types'

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: IProductQueryParams) => [...productKeys.lists(), { ...filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  category: (category: string) => [...productKeys.categories(), category] as const
}

// Hooks
export const useProducts = (params?: IProductQueryParams) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => productService.getProducts(params),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id // Only run if id is provided
  })
}

export const useProductSearch = (query: string) => {
  return useQuery({
    queryKey: [...productKeys.lists(), 'search', query],
    queryFn: () => productService.searchProducts(query),
    enabled: query.length > 0, // Only run if query is not empty
    staleTime: 2 * 60 * 1000 // 2 minutes
  })
}

export const useProductsByCategory = (category: string, params?: IProductQueryParams) => {
  return useQuery({
    queryKey: [...productKeys.category(category), params],
    queryFn: () => productService.getProductsByCategory(category, params),
    enabled: !!category, // Only run if category is provided
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

// Mutations
export const useAddProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: Omit<IProduct, 'id'>) => productService.addProduct(product),
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<IProduct> }) => productService.updateProduct(id, product),
    onSuccess: (data) => {
      // Update the product in the cache
      queryClient.setQueryData(productKeys.detail(data.id), data)
      // Invalidate lists that might contain this product
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: (_, id) => {
      // Remove the product from the cache
      queryClient.removeQueries({ queryKey: productKeys.detail(id) })
      // Invalidate lists that might contain this product
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
    }
  })
}
