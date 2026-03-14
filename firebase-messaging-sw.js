let lastPush = null;

messaging.onBackgroundMessage((payload) => {

  const title = payload.data?.title || "USV StAW";
  const body = payload.data?.body || "Neue Nachricht";
  const msgId = payload.messageId || body;

  // verhindert doppelte Push
  if (msgId === lastPush) {
    console.log("⛔ Doppelter Push blockiert");
    return;
  }

  lastPush = msgId;

  self.registration.showNotification(title, {
    body: body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: msgId
  });

});
