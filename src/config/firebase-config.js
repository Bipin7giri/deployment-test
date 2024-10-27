import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCP7pEasv8gNu082QhTFoh263ewgFZGjDs",
  authDomain: "sarallagani-81475.firebaseapp.com",
  projectId: "sarallagani-81475",
  storageBucket: "sarallagani-81475.appspot.com",
  messagingSenderId: "1659154711",
  appId: "1:1659154711:web:9475bb4fac8b6f800c0752",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
      });
      return token;
    } else {
      console.error("Notification permission was denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
