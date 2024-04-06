import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

export const createEventRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

createEventRouter.use('/*', cors())

createEventRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') || ''
  const token = authHeader.split(' ')[1]

  try {
    const user = await verify(token, c.env.JWT_SECRET)
    if (user) {
      c.set('userId', user.id)
      await next()
    } else {
      c.status(403)
      return c.json({ message: 'You are not logged in' })
    }
  } catch (e) {
    c.status(403)
    return c.json({ message: 'You are not logged in' })
  }
})

createEventRouter.post('/', async (c) => {

  console.log("omkar dongre")

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const userId = parseInt(c.get('userId'))
  console.log(body);
  console.log(userId);

  try {
    const event = await prisma.event.create({
      data: {
        title: body.title,
        date: new Date(body.date),
        time: body.time,
        location: body.location,
        description: body.description,
        organizerId : userId,
      },
    })

    return c.json(event)
  } catch (e) {
    console.error('Error creating event:', e)
    c.status(500)
    return c.json({ message: 'Error creating event' })
  } finally {
    await prisma.$disconnect()
  }
})