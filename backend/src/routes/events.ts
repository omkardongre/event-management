import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

export const eventsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

eventsRouter.use('/*', cors())

eventsRouter.use('/*', async (c, next) => {
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

eventsRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const events = await prisma.event.findMany({
      select: {
        title: true,
        Date: true,
        Time: true,
        location: true,
        description: true,
      },
    });
  
    console.log(events);
    return c.json(events); 
  });