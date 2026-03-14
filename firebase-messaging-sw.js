let lastMessageId = null;

messaging.onBackgroundMessage((payload) => {

  const msgId = payload.messageId || payload.notification?.body;

  // verhindert doppelte Push
  if (msgId === lastMessageId) {
    console.log("⛔ Doppelter Push blockiert");
    return;
  }

  lastMessageId = msgId;

  self.registration.showNotification(
    payload.notification?.title || 'USV StAW',
    {
      body: payload.notification?.body || 'Neue Nachricht',
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: msgId
    }
  );

});
