importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAemNwKerXt-hvtikIIACR4oBTb72VjL_U",
  authDomain: "usv-staw-app.firebaseapp.com",
  projectId: "usv-staw-app",
  storageBucket: "usv-staw-app.appspot.com",
  messagingSenderId: "983106867178",
  appId: "1:983106867178:web:90234121a5833e7e396c93"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification?.title || 'USV StAW',
    {
      body: payload.notification?.body || 'Neue Nachricht',
      icon: '/logo192.png',
      badge: '/logo192.png'
    }
  );
});
