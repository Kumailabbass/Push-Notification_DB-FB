require('dotenv').config();
const Fastify = require('fastify');
const fastifyCors = require('@fastify/cors');
const fastifyHelmet = require('@fastify/helmet');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const { env } = require('./config/environment');
const { logger } = require('./utils/logger');
const { initializeDatabase } = require('./config/database');
const { registerNotificationRoutes } = require('./routes/notificationRoutes');
const fastifyStatic = require('@fastify/static');
const path = require('path');

const buildServer = () => {
  const fastify = Fastify({
    loggerInstance: logger,
    trustProxy: true,
    ajv: {
      customOptions: {
        strict: false,
      },
    },
  });
  console.log('Fastify __dirname:', __dirname);
  // Serve static files from the 'public' directory
  // fastify.register(fastifyStatic, {
  //   root: path.join(__dirname, 'public'),
  //   prefix: '/public/', // Optional: default is '/'
  // });
  // Change this in server.js:
// fastify.register(fastifyStatic, {
//   root: path.join(__dirname, 'public'),
//   prefix: '/', // Keep this as is
// });
  // Register plugins
  fastify.register(fastifyCors);
  fastify.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.gstatic.com",
          "https://www.googleapis.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://fcm.googleapis.com"]
      }
    }
  });


  // Register Swagger
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Push Notification API',
        description: 'API for managing device tokens and sending push notifications',
        version: '1.0.0',
        contact: {
          name: 'API Support',
          email: 'support@example.com',
        },
      },
      servers: [
        {
          url: `http://${env.HOST}:${env.PORT}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'api_key',
            in: 'header',
          },
        },
      },
      tags: [
        { name: 'notifications', description: 'Notification related endpoints' },
        { name: 'tokens', description: 'Device token management endpoints' },
        { name: 'health', description: 'Health check endpoints' },
      ],
    },
  });

  // Register Swagger UI
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
      displayRequestDuration: true,
      filter: true,
    },
    staticCSP: false,
    transformSpecificationClone: true,
  });

  // Register routes
  fastify.register(registerNotificationRoutes);

  fastify.get('/', async (request, reply) => {
    return { message: 'Push notification server is running' };
  });
  
  // Health check route
  fastify.get(
    '/health',
    {
      schema: {
        tags: ['health'],
        description: 'Health check endpoint',
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              status: { type: 'string', example: 'ok' },
            },
          },
        },
      },
    },
    async (_, reply) => {
      return reply.code(200).send({ status: 'ok' });
    }
  );

  fastify.ready(() => {
    console.log('Swagger documentation initialized');
  });

  return fastify;
};

const startServer = async () => {
  try {
    await initializeDatabase();
    const server = buildServer();
    await server.listen({ port: env.PORT, host: env.HOST });
    console.log(`Server is running at http://${env.HOST}:${env.PORT}`);
    console.log(`Swagger documentation available at http://${env.HOST}:${env.PORT}/documentation`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { buildServer };
