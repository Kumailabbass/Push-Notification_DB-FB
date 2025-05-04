// const admin = require("firebase-admin");
// const serviceAccount = require("./firebase.service.account.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const token = "e3NicZwMTxsdt7N8rq6Q4:APA91bGEKA5FWDBS0SsM9oCaWmBphoGmpyLTsnDHlGAM6EE3PZozBDOuh9qNPWFUyLkO4df_552ft-R2EIgfGMmrMKEGPOKnAkfjLv_ycNdCaC76uNUyAqs";

// const message = {
//   token,
//   notification: {
//     title: "🔥 Direct FCM Test",
//     body: "This is a direct test to see if the token is valid.",
//   },
// };

// admin
//   .messaging()
//   .send(message)
//   .then((response) => {
//     console.log("✅ Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.error("❌ Error sending message:", error);
//   });
