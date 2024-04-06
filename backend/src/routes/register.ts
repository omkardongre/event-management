import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

export const registerRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

registerRouter.use('/*', cors())

registerRouter.use('/*', async (c, next) => {


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


registerRouter.post('/:eventId', async (c) => {
  const eventId = parseInt(c.req.param('eventId'));
  const userId = parseInt(c.get('userId'));

  const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL });

  try {
    // Check if the user is already registered for the event
    const isRegistered = await prisma.user.findFirst({
      where: {
        id: userId,
        events: {
          some: {
            id: eventId,
          },
        },
      },
    });

    if (isRegistered) {
      c.status(409);
      return c.json({ message: 'You are already registered for this event' });
    }

    // Register the user for the event
    const registration = await prisma.event.update({
      where: { id: eventId },
      data: {
        attendees: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return c.json(registration);
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: 'An error occurred' });
  }
});
  