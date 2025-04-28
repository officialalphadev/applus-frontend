import axiosInstance from '@/lib/axios'
import { IProduct, IProductQueryParams, IProductsResponse } from '@/type/product.types'

export const productService = {
  /**
   * Get all products with pagination and filtering options
   */
  getProducts: async (params?: IProductQueryParams): Promise<IProductsResponse> => {
    const response = await axiosInstance.get<IProductsResponse>('/products', { params })
    return response.data
  },

  /**
   * Get a single product by ID
   */
  getProductById: async (id: number): Promise<IProduct> => {
    const response = await axiosInstance.get<IProduct>(`/products/${id}`)
    return response.data
  },

  /**
   * Search products by query
   */
  searchProducts: async (query: string): Promise<IProductsResponse> => {
    const response = await axiosInstance.get<IProductsResponse>(`/products/search`, {
      params: { q: query }
    })
    return response.data
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (category: string, params?: IProductQueryParams): Promise<IProductsResponse> => {
    const response = await axiosInstance.get<IProductsResponse>(`/products/category/${category}`, {
      params
    })
    return response.data
  },

  /**
   * Add a new product
   */
  addProduct: async (product: Omit<IProduct, 'id'>): Promise<IProduct> => {
    const response = await axiosInstance.post<IProduct>('/products/add', product)
    return response.data
  },

  /**
   * Update a product
   */
  updateProduct: async (id: number, product: Partial<IProduct>): Promise<IProduct> => {
    const response = await axiosInstance.put<IProduct>(`/products/${id}`, product)
    return response.data
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id: number): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> => {
    const response = await axiosInstance.delete(`/products/${id}`)
    return response.data
  }
}
