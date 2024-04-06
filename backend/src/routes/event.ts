import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

export const eventRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

eventRouter.use('/*', cors())

eventRouter.use('/*', async (c, next) => {


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


eventRouter.get('/:eventId', async (c) => {
    const eventId = c.req.param('eventId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId),
      },
      select: {
        id: true,
        title: true,
        date: true,
        time: true,
        location: true,
        description: true,
      },
    });
  
    if (event) {
      return c.json(event);
    } else {
      c.status(404);
      return c.json({ message: 'Event not found' });
    }
  });