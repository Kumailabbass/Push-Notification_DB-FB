// const notificationController = require('../controllers/notificationController');
// const { registerTokenSchema, deleteTokenSchema, deleteUserTokensSchema, sendNotificationSchema } = require('../schemas/notificationSchemas');

// const registerNotificationRoutes = (fastify) => {
//   // Register a device token
//   fastify.post(
//     '/api/notifications/tokens',
//     { schema: registerTokenSchema },
//     notificationController.registerToken
//   );
  
//   // Delete a specific token
//   fastify.delete(
//     '/api/notifications/tokens/:token',
//     { schema: deleteTokenSchema },
//     notificationController.deleteToken
//   );
  
//   // Delete all tokens for a user
//   fastify.delete(
//     '/api/notifications/users/:userId/tokens',
//     { schema: deleteUserTokensSchema },
//     notificationController.deleteUserTokens
//   );
  
//   // Send a notification
//   fastify.post(
//     '/api/notifications/send',
//     { schema: sendNotificationSchema },
//     notificationController.sendNotification
//   );
  
//   // Get token count (additional example endpoint)
//   fastify.get('/api/notifications/tokens/count', {
//     schema: {
//       tags: ['tokens'],
//       description: 'Get the count of registered device tokens',
//       querystring: {
//         type: 'object',
//         properties: {
//           userId: { type: 'string', description: 'Filter tokens by user ID (optional)' }
//         }
//       },
//       response: {
//         200: {
//           description: 'Token count',
//           type: 'object',
//           properties: {
//             count: { type: 'number', description: 'Number of tokens' },
//             platform: {
//               type: 'object',
//               properties: {
//                 android: { type: 'number', description: 'Number of Android tokens' },
//                 ios: { type: 'number', description: 'Number of iOS tokens' }
//               }
//             }
//           }
//         }
//       }
//     }
//   }, async (request, reply) => {
//     const { userId } = request.query;
//     try {
//       const deviceTokenRepo = require('../repositories/deviceTokenRepository');
//       const tokens = await deviceTokenRepo.getTokens(userId);
      
//       // Count by platform
//       const platformCounts = tokens.reduce((counts, token) => {
//         counts[token.platform] = (counts[token.platform] || 0) + 1;
//         return counts;
//       }, {});
      
//       return reply.code(200).send({
//         count: tokens.length,
//         platform: {
//           android: platformCounts.android || 0,
//           ios: platformCounts.ios || 0
//         }
//       });
//     } catch (error) {
//       request.log.error(error);
//       return reply.code(500).send({
//         success: false,
//         error: 'Failed to get token count'
//       });
//     }
//   });
// };

// module.exports = { registerNotificationRoutes };
const notificationController = require('../controllers/notificationController');
const {
  registerTokenSchema,
  deleteTokenSchema,
  deleteUserTokensSchema,
  sendNotificationSchema,
  sendNotificationWithLocationSchema, // NEW schema
} = require('../schemas/notificationSchemas');

const registerNotificationRoutes = (fastify) => {
  // Register a device token
  fastify.post(
    '/api/notifications/tokens',
    { schema: registerTokenSchema },
    notificationController.registerToken
  );

  // Delete a specific token
  fastify.delete(
    '/api/notifications/tokens/:token',
    { schema: deleteTokenSchema },
    notificationController.deleteToken
  );

  // Delete all tokens for a user
  fastify.delete(
    '/api/notifications/users/:userId/tokens',
    { schema: deleteUserTokensSchema },
    notificationController.deleteUserTokens
  );

  // Send a notification
  fastify.post(
    '/api/notifications/send',
    { schema: sendNotificationSchema },
    notificationController.sendNotification
  );

  //  NEW: Send notification with location
  fastify.post(
    '/api/notifications/send-with-location',
    { schema: sendNotificationWithLocationSchema },
    notificationController.sendNotificationWithLocation
  );

  // Get token count (extra endpoint)
  fastify.get('/api/notifications/tokens/count', {
    schema: {
      tags: ['tokens'],
      description: 'Get the count of registered device tokens',
      querystring: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'Filter tokens by user ID (optional)' }
        }
      },
      response: {
        200: {
          description: 'Token count',
          type: 'object',
          properties: {
            count: { type: 'number', description: 'Number of tokens' },
            platform: {
              type: 'object',
              properties: {
                android: { type: 'number', description: 'Number of Android tokens' },
                ios: { type: 'number', description: 'Number of iOS tokens' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { userId } = request.query;
    try {
      const deviceTokenRepo = require('../repositories/deviceTokenRepository');
      const tokens = await deviceTokenRepo.getTokens(userId);

      const platformCounts = tokens.reduce((counts, token) => {
        counts[token.platform] = (counts[token.platform] || 0) + 1;
        return counts;
      }, {});

      return reply.code(200).send({
        count: tokens.length,
        platform: {
          android: platformCounts.android || 0,
          ios: platformCounts.ios || 0
        }
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        success: false,
        error: 'Failed to get token count'
      });
    }
  });
};

module.exports = { registerNotificationRoutes };
