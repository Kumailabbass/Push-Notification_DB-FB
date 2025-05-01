// // firebase-messaging-sw.js
// // console.log('[SW] Service worker file loaded');
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');


// firebase.initializeApp({
//   apiKey: "AIzaSyC7NN_stvKr9Y34CNhAx5i7Umpi3HmF85A",
//   authDomain: "office-backend-eea40.firebaseapp.com",
//   projectId: "office-backend-eea40",
//   storageBucket: "office-backend-eea40.firebasestorage.app",
//   messagingSenderId: "380869412947",
//   appId: "1:380869412947:web:d05b2c1e3a49f4ba385ea6",
//   measurementId: "G-W4MES8BVRT"
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[SW] Received background message:', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });




// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// firebase.initializeApp({
//   apiKey: "YOUR_API_KEY",
//   authDomain: "attendance-8f8b4.firebaseapp.com",
//   projectId: "attendance-8f8b4",
//   storageBucket: "attendance-8f8b4.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// });

// const messaging = firebase.messaging();