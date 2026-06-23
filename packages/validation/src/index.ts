import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  compareAtPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  sku: z.string().min(1).max(100),
  stock: z.number().min(0),
  images: z.array(z.string().url()).optional(),
  brandId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
})

export const categorySchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  image: z.string().url().optional(),
  parentId: z.string().uuid().optional(),
})

export const brandSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  logo: z.string().url().optional(),
})

export const addToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().min(1),
})

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0),
})

export const checkoutSchema = z.object({
  shippingAddress: z.string().min(10),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal']),
})

export type ProductInput = z.infer<typeof productSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type BrandInput = z.infer<typeof brandSchema>
export type AddToCartInput = z.infer<typeof addToCartSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
