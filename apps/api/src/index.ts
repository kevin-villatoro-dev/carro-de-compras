import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { rateLimitPlugin } from '@/plugins/rate-limit'
import { productRoutes } from '@/modules/products/routes'
import { categoryRoutes } from '@/modules/categories/routes'
import { brandRoutes } from '@/modules/brands/routes'
import { cartRoutes } from '@/modules/cart/routes'
import { orderRoutes } from '@/modules/orders/routes'
import { authRoutes } from '@/modules/auth/routes'

const app = Fastify({ logger: true })

await app.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
})

await app.register(rateLimitPlugin)

await app.register(productRoutes, { prefix: '/api/products' })
await app.register(categoryRoutes, { prefix: '/api/categories' })
await app.register(brandRoutes, { prefix: '/api/brands' })
await app.register(cartRoutes, { prefix: '/api/cart' })
await app.register(orderRoutes, { prefix: '/api/orders' })
await app.register(authRoutes, { prefix: '/api/auth' })

app.get('/api/health', async () => ({ status: 'ok' }))

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || 'localhost'

try {
  await app.listen({ port, host })
  app.log.info(`Server running on http://${host}:${port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
