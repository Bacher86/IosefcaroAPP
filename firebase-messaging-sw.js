importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "hqO1x0iKbdZsxkXK_bQWWH_JEV_eoL4E78UDrD3Yyq4", // <- Ya te puse tu API Key real aquí
  projectId: "app-iosefcaro",
  messagingSenderId: "651320124248",
  appId: "1:651320124248:web:97c8ca00e29114e1983b2d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'logo.png.png' // Asegurate de que el nombre del archivo sea correcto
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
