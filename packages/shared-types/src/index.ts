export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  price: string
  compareAtPrice?: string
  sku: string
  stock: number
  images?: string[]
  brandId?: string
  categoryId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductWithRelations extends Product {
  brand?: Brand
  category?: Category
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
  total: string
}

export interface Order {
  id: string
  userId: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: string
  shippingAddress?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'admin'
}
