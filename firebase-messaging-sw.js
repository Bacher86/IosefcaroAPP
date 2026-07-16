importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD4pg_8j_CbgeqA1x8IOqn3CxpXepVWQtI",
  projectId: "app-iosefcaro",
  messagingSenderId: "651320124248",
  appId: "1:651320124248:web:97c8ca00e29114e1983b2d"
});

const messaging = firebase.messaging();
const db = firebase.firestore();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification?.title || 'Iosef Caro';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: 'logo.png.png',
    data: payload.data || {} // acá viaja el pushId para poder medir aperturas
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ── Métrica de apertura: cuando la familia toca la notificación ──
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const pushId = event.notification.data?.pushId;
  if (pushId) {
    // Solo incrementa el contador de aperturas; las reglas de Firestore
    // restringen esta escritura anónima a tocar únicamente ese campo.
    db.collection('push_pendientes').doc(pushId).update({
      aperturas: firebase.firestore.FieldValue.increment(1)
    }).catch(() => {});
  }
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si ya hay una pestaña/ventana abierta EN familia.html, la enfocamos
      for (const client of clientList) {
        if (client.url.includes('familia.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Si hay alguna ventana de la app abierta pero en otra página, la navegamos
      for (const client of clientList) {
        if ('navigate' in client && 'focus' in client) {
          return client.navigate('./familia.html').then(c => c.focus());
        }
      }
      // Si no hay ninguna abierta, abrimos una nueva directo en familia.html
      if (clients.openWindow) return clients.openWindow('./familia.html');
    })
  );
});
