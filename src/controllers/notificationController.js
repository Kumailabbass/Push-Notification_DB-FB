const notificationService = require('../services/notificationService');
const deviceTokenRepo = require('../repositories/deviceTokenRepository');
const { sendNotification } = require('../services/fcmService');
const { AppDataSource } = require('../config/database');
const { Location } = require('../entities/Location');

const getAllLocations = async (request, reply) => {
  try {
    const locationRepo = AppDataSource.getRepository(Location);
    const locations = await locationRepo.find({
      order: { createdAt: 'DESC' } // optional: latest first
    });

    return reply.code(200).send({
      success: true,
      data: locations,
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({
      success: false,
      error: 'Failed to fetch locations',
    });
  }
};

async function sendNotificationWithLocation(req, reply) {
  const { fcmToken, location, title, body, userId } = req.body;

  if (!fcmToken || !location || !location.latitude || !location.longitude) {
    return reply.code(400).send({ success: false, message: 'Missing required fields' });
  }

  console.log('Received location:', location);

  // Save to database
  try {
    const locationRepo = AppDataSource.getRepository(Location);
    const newLocation = locationRepo.create({
      latitude: location.latitude,
      longitude: location.longitude,
      userId,
      fcmToken,
    });
    await locationRepo.save(newLocation);
  } catch (dbErr) {
    console.error('Error saving location to DB:', dbErr);
    return reply.code(500).send({ success: false, error: 'Database error' });
  }

  // Send FCM notification
  const message = {
    token: fcmToken,
    notification: {
      title,
      body
    },
    data: {
      latitude: String(location.latitude),
      longitude: String(location.longitude)
    }
  };

  try {
    const response = await sendNotification(message);
    return reply.send({ success: true, firebaseResponse: response });
  } catch (err) {
    console.error('Error sending notification:', err);
    return reply.code(500).send({ success: false, error: err.message });
  }
}




// Register a new device token
const registerToken = async (request, reply) => {
  const { token, platform, userId } = request.body;
  
  try {
    //     const user = await userRepo.findById(userId);
    // if (!user) {
    //   return reply.code(401).send({
    //     success: false,
    //     error: 'Invalid user',
    //   });
    // }

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
const sendNotificationToTarget = async (request, reply) => {
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

        if (result.success) {
          return reply.code(200).send({
            success: true,
            messageId: result.messageId || null,
          });
        } else {
          return reply.code(500).send({
            success: false,
            error: result.error?.message || 'Failed to send notification',
          });
        }

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
  getAllLocations,
  registerToken,
  sendNotificationWithLocation,
  deleteToken,
  deleteUserTokens,
  sendNotification,
  sendNotification: sendNotificationToTarget, // avoid name conflict7
};