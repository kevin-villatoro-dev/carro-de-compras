import { useQuery } from '@tanstack/react-query'
import { api, type Product } from '@/lib/api'

export function useProducts(filters?: { search?: string; category?: string; brand?: string }) {
  return useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: () => api.products.list(filters),
  })
}

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: () => api.products.get(slug),
  })
}
