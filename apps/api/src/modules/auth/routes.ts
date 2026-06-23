import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import jwt from '@fastify/jwt'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

const users = new Map<string, { id: string; email: string; password: string; name: string; role: string }>()

users.set('admin@shopcart.local', {
  id: '1',
  email: 'admin@shopcart.local',
  password: 'password',
  name: 'Admin',
  role: 'admin',
})

export async function authRoutes(app: FastifyInstance) {
  // Register JWT plugin inside the route plugin
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    sign: {
      expiresIn: '7d',
    },
  })

  app.post('/login', async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid body', details: parsed.error.issues })
    }

    const { email, password } = parsed.data
    const user = users.get(email)

    if (!user || user.password !== password) {
      return reply.status(401).send({ error: 'Invalid credentials' })
    }

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  })

  app.post('/register', async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid body', details: parsed.error.issues })
    }

    const { email, password, name } = parsed.data

    if (users.has(email)) {
      return reply.status(409).send({ error: 'User already exists' })
    }

    const user = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: 'customer',
    }

    users.set(email, user)

    const token = app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return reply.status(201).send({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  })

  app.get('/me', async (request, reply) => {
    try {
      const decoded = await request.jwtVerify<{ id: string; email: string; role: string }>()
      return decoded
    } catch (err) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }
  })
}