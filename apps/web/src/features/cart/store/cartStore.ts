import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function calcCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      immer((set) => ({
        items: [],

        addItem: (item, quantity = 1) =>
          set((state) => {
            const existing = state.items.find((i: CartItem) => i.id === item.id)
            if (existing) {
              const newQty = existing.quantity + quantity
              existing.quantity = Math.min(newQty, existing.stock)
            } else {
              state.items.push({ ...item, quantity: Math.min(quantity, item.stock) })
            }
          }, false),

        removeItem: (id) =>
          set((state) => {
            const index = state.items.findIndex((i: CartItem) => i.id === id)
            if (index !== -1) {
              state.items.splice(index, 1)
            }
          }, false),

        updateQuantity: (id, quantity) =>
          set((state) => {
            const item = state.items.find((i: CartItem) => i.id === id)
            if (item) {
              if (quantity <= 0) {
                const index = state.items.findIndex((i: CartItem) => i.id === id)
                state.items.splice(index, 1)
              } else if (quantity <= item.stock) {
                item.quantity = quantity
              }
            }
          }, false),

        clearCart: () => set({ items: [] }, false),
      })),
      {
        name: 'cart-storage',
        partialize: (state) => ({ items: state.items }),
      }
    ),
    { name: 'CartStore' }
  )
)

// Derived selectors — use these in components instead of calling store methods
export function useCartTotal(): number {
  return useCartStore((state) => calcTotal(state.items))
}

export function useCartCount(): number {
  return useCartStore((state) => calcCount(state.items))
}

export function useClearCart(): () => void {
  return useCartStore((state) => state.clearCart)
}
