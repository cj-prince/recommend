import { configDotenv } from 'dotenv';
configDotenv();

const production = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.TEST_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUND: process.env.TEST_SALT_ROUND,
};

export default production;
