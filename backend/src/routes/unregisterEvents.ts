import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

export const unregisteredEventRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

unregisteredEventRouter.use('/*', cors())

unregisteredEventRouter.use('/*', async (c, next) => {
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

unregisteredEventRouter.delete('/:eventId', async (c) => {
  const userId = parseInt(c.get('userId'));
  const eventId = parseInt(c.req.param('eventId'));
  const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL });

  try {
    const unregisteredEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        attendees: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return c.json(unregisteredEvent);
  } catch (error) {
    console.error('Error unregistering from event:', error);
    c.status(500);
    return c.json({ message: 'Error unregistering from event' });
  }
});