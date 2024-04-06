import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

export const registeredEventRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

registeredEventRouter.use('/*', cors())

registeredEventRouter.use('/*', async (c, next) => {


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


registeredEventRouter.get('/', async (c) => {
  const userId = parseInt(c.get('userId'));
  const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL });

  try {
    const registeredEvents = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        events: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return c.json(registeredEvents.events);
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: 'An error occurred' });
  }
});
  