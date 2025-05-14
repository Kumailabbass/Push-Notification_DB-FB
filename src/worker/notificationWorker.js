// const { consumeQueue } = require('../services/rabbitmqService');
// const { sendNotification } = require('../services/fcmService');

// async function processNotification(data) {
//   const { fcmToken, title, body, location } = data;

//   const message = {
//     token: fcmToken,
//     notification: { title, body },
//     data: {
//       latitude: String(location.latitude),
//       longitude: String(location.longitude),
//     },
//   };

//   try {
//     const response = await sendNotification(message);
//     console.log('Notification sent:', response);
//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// }

// consumeQueue(processNotification);
