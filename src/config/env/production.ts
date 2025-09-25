import { configDotenv } from 'dotenv';
configDotenv();

const production = {
  NODE_ENV: process.env.TEST_PROD_NODE_ENV,
  PORT: process.env.TEST_PORT,
  DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUND: process.env.TEST_SALT_ROUND,
};

export default production;
