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

// Set für bereits verarbeitete Nachrichten-IDs
const processedMessageIds = new Set();

// Alle 30 Sekunden aufräumen
setInterval(() => {
  processedMessageIds.clear();
  console.log("🧹 Service Worker: processedMessageIds geleert");
}, 30000);

messaging.onBackgroundMessage((payload) => {
  console.log("📨 Push erhalten:", payload);
  
  const messageId = payload.data?.message_id || 
                    payload.messageId || 
                    `${payload.notification?.title}-${payload.notification?.body}`;
  
  if (processedMessageIds.has(messageId)) {
    console.log("⛔ Doppelter Push blockiert");
    return;
  }
  
  processedMessageIds.add(messageId);
  
  const title = payload.notification?.title || payload.data?.title || "USV StAW";
  const body = payload.notification?.body || payload.data?.body || "Neue Nachricht";

  self.registration.showNotification(title, {
    body: body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: messageId,
    renotify: false,
    silent: false,
    data: {
      messageId: messageId
    }
  });
});
