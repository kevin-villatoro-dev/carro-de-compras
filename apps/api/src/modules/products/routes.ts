import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { productService } from './service'

const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export async function productRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const parsed = productQuerySchema.safeParse(request.query)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid query parameters' })
    }
    const { search, category, brand } = parsed.data
    return productService.findAll({ search, categorySlug: category, brandSlug: brand })
  })

  app.get('/:slug', async (request, reply) => {
    const paramsSchema = z.object({ slug: z.string() })
    const parsed = paramsSchema.safeParse(request.params)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid params' })
    }
    const product = await productService.findBySlug(parsed.data.slug)
    if (!product) {
      return reply.status(404).send({ error: 'Product not found' })
    }
    return product
  })
}
