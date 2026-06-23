import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { orderService } from './service'

const checkoutSchema = z.object({
  userId: z.string().min(1),
  shippingAddress: z.string().min(10),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal']),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().min(1),
  })).min(1),
})

export async function orderRoutes(app: FastifyInstance) {
  app.post('/checkout', async (request, reply) => {
    const parsed = checkoutSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid body', details: parsed.error.issues })
    }

    try {
      const result = await orderService.checkout(parsed.data)
      return reply.status(201).send(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Checkout failed'
      return reply.status(400).send({ error: message })
    }
  })

  app.get('/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const parsed = paramsSchema.safeParse(request.params)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid params' })
    }

    const order = await orderService.findById(parsed.data.id)
    if (!order) {
      return reply.status(404).send({ error: 'Order not found' })
    }

    return order
  })
}
