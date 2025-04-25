const notificationService = require('../services/notificationService');
const deviceTokenRepo = require('../repositories/deviceTokenRepository');

// Register a new device token
const registerToken = async (request, reply) => {
  const { token, platform, userId } = request.body;
  
  try {
    const deviceToken = await deviceTokenRepo.saveToken({
      token,
      platform,
      userId,
    });
    
    return reply.code(200).send({
      success: true,
      token: deviceToken.token,
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({
      success: false,
      error: 'Failed to register token',
    });
  }
};

// Delete a specific token
const deleteToken = async (request, reply) => {
  const { token } = request.params;
  
  try {
    const success = await deviceTokenRepo.removeToken(token);
    
    return reply.code(200).send({
      success,
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({
      success: false,
      error: 'Failed to delete token',
    });
  }
};

// Delete all tokens for a user
const deleteUserTokens = async (request, reply) => {
  const { userId } = request.params;
  
  try {
    const userTokens = await deviceTokenRepo.getTokens(userId);
    const tokenCount = userTokens.length;
    const success = await deviceTokenRepo.removeUserTokens(userId);
    
    return reply.code(200).send({
      success,
      tokensRemoved: tokenCount,
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({
      success: false,
      error: 'Failed to delete user tokens',
    });
  }
};

// Send a notification
const sendNotification = async (request, reply) => {
  const { title, body, data, imageUrl, targetType, targetId } = request.body;
  
  const payload = {
    title,
    body,
    data,
    imageUrl,
  };
  
  try {
    let result;
    
    switch (targetType) {
      case 'token':
        if (!targetId) {
          return reply.code(400).send({
            success: false,
            error: 'Target ID is required when target type is token',
          });
        }
        result = await notificationService.sendToDevice(targetId, payload);
        return reply.code(200).send({
          success: result.success,
          successCount: result.success ? 1 : 0,
          failureCount: result.success ? 0 : 1,
        });
      
      case 'user':
        if (!targetId) {
          return reply.code(400).send({
            success: false,
            error: 'Target ID is required when target type is user',
          });
        }
        result = await notificationService.sendToUser(targetId, payload);
        return reply.code(200).send(result);
      
      case 'all':
        result = await notificationService.sendToAll(payload);
        return reply.code(200).send(result);
      
      default:
        return reply.code(400).send({
          success: false,
          error: 'Invalid target type',
        });
    }
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({
      success: false,
      error: 'Failed to send notification',
    });
  }
};

module.exports = {
  registerToken,
  deleteToken,
  deleteUserTokens,
  sendNotification,
};