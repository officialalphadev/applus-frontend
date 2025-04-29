export interface IProductDimensions {
  width: number
  height: number
  depth: number
}

export interface IProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface IProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: IProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: IProductReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: IProductMeta
  thumbnail: string
  images: string[]
}

export interface IProductsResponse {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

export interface IProductQueryParams {
  limit?: number
  skip?: number
  select?: string
}
