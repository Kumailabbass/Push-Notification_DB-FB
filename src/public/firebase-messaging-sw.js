// firebase-messaging-sw.js
// console.log('[SW] Service worker file loaded');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// firebase.initializeApp({
//   apiKey: "AIzaSyCexysGi-AZI1Txjh5KpDDlomtJdJpxDio",
//   authDomain: "attendance-360.firebaseapp.com",
//   projectId: "attendance-360",
//   storageBucket: "attendance-360.firebasestorage.app",
//   messagingSenderId: "135240545640",
//   appId: "1:135240545640:web:f5832149ee110d8ca612dd",
//   measurementId: "G-W2EXD3KHMT"
// });

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Received background message:', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});