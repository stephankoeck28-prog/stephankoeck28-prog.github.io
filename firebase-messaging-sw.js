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

// 🔥 ROBUSTE SPERRE GEGEN DOPPELTE PUSHES
const processedMessages = new Set();

// Alte Einträge regelmäßig aufräumen (alle 10 Sekunden)
setInterval(() => {
  processedMessages.clear();
  console.log("🧹 Service Worker: processedMessages geleert");
}, 10000);

messaging.onBackgroundMessage((payload) => {
  console.log("📨 Push erhalten:", payload);

  const title = payload.notification?.title || payload.data?.title || "USV StAW";
  const body = payload.notification?.body || payload.data?.body || "Neue Nachricht";
  
  // 🔥 BESSERER SCHLÜSSEL: Kombination aus Titel und Body
  const messageKey = `${title}-${body}`;
  
  // Prüfen ob diese Kombination schon verarbeitet wurde
  if (processedMessages.has(messageKey)) {
    console.log("⛔ Doppelter Push blockiert (10-Sekunden-Sperre):", messageKey);
    return;
  }
  
  // Als verarbeitet markieren
  processedMessages.add(messageKey);
  console.log("✅ Push wird angezeigt:", messageKey);

  self.registration.showNotification(title, {
    body: body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: messageKey,
    renotify: false,
    silent: false
  });
});
