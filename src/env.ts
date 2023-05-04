import path from 'path';
import dotenv from 'dotenv';

export const ENVIRONMENT = process.env.NODE_ENV || 'development';

const PATH = path.resolve(__dirname, '../.env.' + ENVIRONMENT);
dotenv.config({ path: PATH });

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URL || 'mongodb://localhost:27017';
export const MONGODB_NAME = process.env.MONGODB_NAME || 'activity';
export const SESSION_KEY1 = process.env.SESSION_KEY1 || 'key1';
export const SESSION_KEY2 = process.env.SESSION_KEY2 || 'key2';
