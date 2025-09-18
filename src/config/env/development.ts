import { configDotenv } from 'dotenv';
configDotenv();

const development = {
  NODE_ENV: process.env.TEST_NODE_ENV,
  PORT: process.env.TEST_PORT,
  DATABASE_URL: process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  CRYPTO_SECRET: process.env.TEST_CRYPTO_SECRET,
  CRYPTO_TIME_STEP: process.env.TEST_CRYPTO_TIME_STEP,
  CRYPTO_HASH_ALGO: process.env.TEST_CRYPTO_HASH_ALGO,
  SALT_ROUND: process.env.TEST_SALT_ROUND,

};

export default development;
