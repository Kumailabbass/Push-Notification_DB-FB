// const admin = require('firebase-admin');
// const { env } = require('./environment');

// const initializeFirebase = () => {
//   const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
  
//   return admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: env.FIREBASE_PROJECT_ID,
//       clientEmail: env.FIREBASE_CLIENT_EMAIL,
//       privateKey,
//     }),
//   });
// };

// const firebaseApp = initializeFirebase();
// const messaging = firebaseApp.messaging();

// module.exports = { firebaseApp, messaging };


const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.join(__dirname, 'firebase-service-account.json'));

const initializeFirebase = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
};

const firebaseApp = initializeFirebase();
const messaging = firebaseApp.messaging();

module.exports = { firebaseApp, messaging };