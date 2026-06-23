const API_BASE = '/api'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const { headers: customHeaders, ...restOptions } = options || {}
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error || `API error: ${res.status}`)
  }

  return res.json()
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
  isActive: boolean
  createdAt: string
  brand?: Brand
  category?: Category
}

export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
}

export interface CheckoutItem {
  productId: string
  quantity: number
}

export interface CheckoutInput {
  userId: string
  shippingAddress: string
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal'
  items: CheckoutItem[]
}

export interface CheckoutResponse {
  orderId: string
  total: string
  status: string
  message: string
}

export const api = {
  products: {
    list: (params?: { search?: string; category?: string; brand?: string }) => {
      const query = new URLSearchParams(params).toString()
      return fetchAPI<Product[]>(`/products${query ? `?${query}` : ''}`)
    },
    get: (slug: string) => fetchAPI<Product>(`/products/${slug}`),
  },
  categories: {
    list: () => fetchAPI<Category[]>('/categories'),
  },
  brands: {
    list: () => fetchAPI<Brand[]>('/brands'),
  },
  orders: {
    checkout: (input: CheckoutInput) => fetchAPI<CheckoutResponse>('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
    get: (id: string) => fetchAPI<any>(`/orders/${id}`),
  },
}

export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return num.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
}

export function calcDiscount(price: string, compareAt: string): number {
  const p = parseFloat(price)
  const c = parseFloat(compareAt)
  if (c <= 0 || p >= c) return 0
  return Math.round(((c - p) / c) * 100)
}
