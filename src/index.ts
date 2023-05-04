import mongoose from 'mongoose';
import { ENVIRONMENT, MONGODB_NAME, MONGODB_URI, PORT } from './env';
import { app } from './app';

async function bootstrap() {
  /** connect to mongodb */
  mongoose
    .connect(`${MONGODB_URI}/${MONGODB_NAME}`, {
      connectTimeoutMS: 1000
    })
    .then(() =>
      console.log(`[Mongoose]: Connected to ${MONGODB_NAME} database!`)
    )
    .catch(() => console.log(`[Mongoose]: Connection failed`));

  /** listen server */
  app.listen(PORT, () => {
    console.log(`[Server]: Listening on port ${PORT} in ${ENVIRONMENT} mode.`);
  });
}
bootstrap();
