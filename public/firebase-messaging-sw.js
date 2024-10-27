import { initializeApp } from "firebase/app";

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCP7pEasv8gNu082QhTFoh263ewgFZGjDs",
  authDomain: "sarallagani-81475.firebaseapp.com",
  projectId: "sarallagani-81475",
  storageBucket: "sarallagani-81475.appspot.com",
  messagingSenderId: "1659154711",
  appId: "1:1659154711:web:9475bb4fac8b6f800c0752",
};

initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
