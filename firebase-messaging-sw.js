let lastMessageId = null;

messaging.onBackgroundMessage((payload) => {

  // Wenn Firebase schon eine Notification sendet -> nichts anzeigen
  if (payload.notification) {
    console.log("Firebase zeigt Notification automatisch");
    return;
  }

  const msgId = payload.messageId || payload.data?.body;

  if (msgId === lastMessageId) return;
  lastMessageId = msgId;

  self.registration.showNotification(
    payload.data?.title || 'USV StAW',
    {
      body: payload.data?.body || 'Neue Nachricht',
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: msgId
    }
  );
});
