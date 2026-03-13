// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyAemNwKerXt-hvtikIIACR4oBTb72VjL_U",
  authDomain: "usv-staw-app.firebaseapp.com",
  projectId: "usv-staw-app",
  storageBucket: "usv-staw-app.appspot.com",
  messagingSenderId: "983106867178",
  appId: "1:983106867178:web:90234121a5833e7e396c93"
});

const messaging = firebase.messaging();

// Background message handler - NUR HIER Benachrichtigungen!
messaging.onBackgroundMessage((payload) => {
  console.log('⚡ Background message:', payload);
  
  // Prüfen ob die App gerade im Vordergrund ist
  // Wenn ja, keine Benachrichtigung zeigen (Toast kommt von der App)
  if (self.clients && self.clients.matchAll) {
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Wenn mindestens ein Fenster sichtbar ist, keine Benachrichtigung
      const hasVisibleClient = clientList.some(client => client.visibilityState === 'visible');
      
      if (!hasVisibleClient) {
        // Nur Benachrichtigung zeigen wenn App NICHT sichtbar
        const title = payload.notification?.title || '⚽ USV StAW';
        const options = {
          body: payload.notification?.body || 'Neue Nachricht',
          icon: '/logo192.png',
          badge: '/logo192.png',
          vibrate: [200, 100, 200],
          data: payload.data
        };
        self.registration.showNotification(title, options);
      } else {
        console.log('📱 App ist sichtbar - keine extra Benachrichtigung');
      }
    });
  } else {
    // Fallback falls clients nicht verfügbar
    const title = payload.notification?.title || '⚽ USV StAW';
    const options = {
      body: payload.notification?.body || 'Neue Nachricht',
      icon: '/logo192.png',
      badge: '/logo192.png',
      vibrate: [200, 100, 200]
    };
    self.registration.showNotification(title, options);
  }
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
