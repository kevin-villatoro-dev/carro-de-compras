import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { categoryService } from './service'

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return categoryService.findAll()
  })

  app.get('/:slug', async (request, reply) => {
    const paramsSchema = z.object({ slug: z.string() })
    const parsed = paramsSchema.safeParse(request.params)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid params' })
    }
    const category = await categoryService.findBySlug(parsed.data.slug)
    if (!category) {
      return reply.status(404).send({ error: 'Category not found' })
    }
    return category
  })
}
