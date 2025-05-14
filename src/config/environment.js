

const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  HOST: z.string().default('localhost'),
  DB_HOST: z.string().default(''),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string().default(''),
  DB_PASSWORD: z.string().default(''),
  DB_DATABASE: z.string().default(''),
  FIREBASE_PROJECT_ID: z.string().default(''),
  FIREBASE_PRIVATE_KEY: z.string().default(''),
  FIREBASE_CLIENT_EMAIL: z.string().default(''),
});

const parseEnv = () => {
  try {
    const parsed = envSchema.parse(process.env);
    return {
      ...parsed,
      FIREBASE_PRIVATE_KEY: parsed.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  } catch (error) {
    console.error('Invalid environment variables:', error);
    process.exit(1);
  }
};

const env = parseEnv();

module.exports = { env };
