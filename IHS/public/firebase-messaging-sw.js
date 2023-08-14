importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCNEotgv3QLKoLPG7Fszd7_XJdBR4pvooc",
  authDomain: "store-stock-fbc0d.firebaseapp.com",
  databaseURL: "https://store-stock-fbc0d-default-rtdb.firebaseio.com",
  projectId: "store-stock-fbc0d",
  storageBucket: "store-stock-fbc0d.appspot.com",
  messagingSenderId: "681166334206",
  appId: "1:681166334206:web:e738e3dffc27eb34331daf"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  alert('Received background message1: ', payload.notification.title);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
