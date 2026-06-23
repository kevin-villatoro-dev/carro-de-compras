import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { brandService } from './service'

export async function brandRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return brandService.findAll()
  })

  app.get('/:slug', async (request, reply) => {
    const paramsSchema = z.object({ slug: z.string() })
    const parsed = paramsSchema.safeParse(request.params)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid params' })
    }
    const brand = await brandService.findBySlug(parsed.data.slug)
    if (!brand) {
      return reply.status(404).send({ error: 'Brand not found' })
    }
    return brand
  })
}
