import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx'
import { userRouter } from './routes/user'
import { createEventRouter } from './routes/createEvent'
import { eventsRouter } from './routes/events'





const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()



app.route('/api/v1/user', userRouter);
app.route('/api/v1/createEvent', createEventRouter);
app.route('/api/v1/events', eventsRouter);


// app.route('/api/v1/registration', registrationRouter);
// app.route('/api/v1/event', userRouter);
// app.route('/api/v1/user', userRouter);





export default app
