import { IProduct, IProductQueryParams, IProductsResponse } from '@/type'
import { axios } from '@/lib'

export class ProductService {
  static async GetProducts(params?: IProductQueryParams): Promise<IProductsResponse> {
    const response = await axios.get<IProductsResponse>('/products', { params })
    return response.data
  }

  static async GetProduct(id: number): Promise<IProduct> {
    const response = await axios.get<IProduct>(`/products/${id}`)
    return response.data
  }

  static async GetProductsByCategory(category: string, params?: IProductQueryParams): Promise<IProductsResponse> {
    const response = await axios.get<IProductsResponse>(`/products/category/${category}`, { params })
    return response.data
  }

  static async SearchProducts(query: string): Promise<IProductsResponse> {
    const response = await axios.get<IProductsResponse>(`/products/search`, { params: { q: query } })
    return response.data
  }

  static async AddProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
    const response = await axios.post<IProduct>('/products/add', product)
    return response.data
  }

  static async UpdateProduct(id: number, product: Partial<IProduct>): Promise<IProduct> {
    const response = await axios.put<IProduct>(`/products/${id}`, product)
    return response.data
  }

  static async DeleteProduct(id: number): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> {
    const response = await axios.delete(`/products/${id}`)
    return response.data
  }
}
