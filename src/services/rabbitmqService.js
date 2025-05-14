// const amqp = require('amqplib');

// let channel, connection;

// const QUEUE_NAME = 'notificationQueue';

// async function connectQueue() {
//   connection = await amqp.connect('amqp://localhost'); // replace with your RabbitMQ URL if needed
//   channel = await connection.createChannel();
//   await channel.assertQueue(QUEUE_NAME);
// }

// async function sendToQueue(data) {
//   if (!channel) {
//     await connectQueue();
//   }
//   channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), {
//     persistent: true,
//   });
// }

// async function consumeQueue(callback) {
//   if (!channel) {
//     await connectQueue();
//   }
//   channel.consume(QUEUE_NAME, async (msg) => {
//     if (msg !== null) {
//       const content = JSON.parse(msg.content.toString());
//       await callback(content);
//       channel.ack(msg);
//     }
//   });
// }

// module.exports = {
//   sendToQueue,
//   consumeQueue,
//   connectQueue,
// };
