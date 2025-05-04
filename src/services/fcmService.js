// src/services/fcmService.js
const admin = require('firebase-admin');

// This assumes you already initialized Firebase Admin in another file like firebase-admin.js
// If not, you can initialize it here directly (but better to keep it separate and import it)

async function sendNotification(message) {
  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

module.exports = {
  sendNotification,
};
