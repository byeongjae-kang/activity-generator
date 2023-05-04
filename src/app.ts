import cors from 'cors';
import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { userRouter } from './routes/user/user.router';
import { errorHandler } from './middleware/error-handler';
import { activityRouter } from './routes/activity/activity.router';
import { SESSION_KEY1, SESSION_KEY2 } from './env';

export const app = express();

/** parse json */
app.use(express.json());

/** enable cors */
app.use(cors());

/** setup session */
app.use(
  cookieSession({
    name: 'session',
    keys: [SESSION_KEY1, SESSION_KEY2]
  })
);

/** routes */
app.use('/activity', activityRouter);
app.use('/user', userRouter);

/** throw error for none existing endpoints */
app.all('*', async (req, res) => {
  throw new Error('Invalid endpoint');
});

/** middleware that handle errors and send out error messages  */
app.use(errorHandler);
