import type { FastifyInstance } from 'fastify'
import { z } from 'zod'

const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().min(1),
})

export async function cartRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return { items: [], total: 0 }
  })

  app.post('/', async (request, reply) => {
    const parsed = cartItemSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid body', details: parsed.error.issues })
    }
    const { productId, quantity } = parsed.data
    return { message: 'Item added', productId, quantity }
  })

  app.patch('/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const bodySchema = z.object({ quantity: z.number().min(0) })
    const paramsParsed = paramsSchema.safeParse(request.params)
    const bodyParsed = bodySchema.safeParse(request.body)
    if (!paramsParsed.success || !bodyParsed.success) {
      return reply.status(400).send({ error: 'Invalid params or body' })
    }
    return { message: 'Item updated', id: paramsParsed.data.id, quantity: bodyParsed.data.quantity }
  })

  app.delete('/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const parsed = paramsSchema.safeParse(request.params)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid params' })
    }
    return { message: 'Item removed', id: parsed.data.id }
  })

  app.delete('/', async () => {
    return { message: 'Cart cleared' }
  })
}
