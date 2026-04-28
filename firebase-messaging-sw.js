importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "TU_API_KEY",
  projectId: "app-iosefcaro",
  messagingSenderId: "651320124248",
  appId: "1:651320124248:web:97c8ca00e29114e1983b2d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'logo.png.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
