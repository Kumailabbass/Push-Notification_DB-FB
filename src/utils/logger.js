const pino = require('pino');
const { env } = require('../config/environment');

const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      }
    : undefined,
});

module.exports = { logger };