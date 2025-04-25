const { messaging } = require('../config/firebase');
const deviceTokenRepo = require('../repositories/deviceTokenRepository');

// Send notification to a specific device
const sendToDevice = async (token, payload) => {
  try {
    const message = {
      token,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: payload.data || {},
      android: {
        priority: 'high',
        notification: {
          imageUrl: payload.imageUrl,
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
        fcmOptions: {
          imageUrl: payload.imageUrl,
        },
      },
    };

    const response = await messaging.send(message);
    return { success: true, messageId: response };
  } catch (error) {
    return { success: false, error };
  }
};

// Send notification to multiple devices
const sendToDevices = async (tokens, payload) => {
  if (tokens.length === 0) {
    return { success: false, successCount: 0, failureCount: 0, results: [] };
  }

  try {
    const message = {
      tokens,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: payload.data || {},
      android: {
        priority: 'high',
        notification: {
          imageUrl: payload.imageUrl,
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
        fcmOptions: {
          imageUrl: payload.imageUrl,
        },
      },
    };

    const response = await messaging.sendMulticast(message);
    return {
      success: response.failureCount < tokens.length,
      successCount: response.successCount,
      failureCount: response.failureCount,
      results: response.responses,
    };
  } catch (error) {
    return { success: false, successCount: 0, failureCount: tokens.length, results: [error] };
  }
};

// Send notification to a specific user (all of their devices)
const sendToUser = async (userId, payload) => {
  const userDevices = await deviceTokenRepo.getTokens(userId);
  const tokens = userDevices.map(device => device.token);
  return sendToDevices(tokens, payload);
};

// Send notification to all registered devices
const sendToAll = async (payload) => {
  const allDevices = await deviceTokenRepo.getTokens();
  const tokens = allDevices.map(device => device.token);
  return sendToDevices(tokens, payload);
};

module.exports = {
  sendToDevice,
  sendToDevices,
  sendToUser,
  sendToAll,
};