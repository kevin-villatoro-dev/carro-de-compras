import { useQuery } from '@tanstack/react-query'
import { api, type Brand } from '@/lib/api'

export function useBrands() {
  return useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: () => api.brands.list(),
  })
}
