// "use client";
// import { useEffect } from "react";
// import { getAnalytics, logEvent } from "@firebase/analytics";
// import { initializeApp } from "@firebase/app";
// import { useRouter } from "next/navigation";
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDERID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const usePageViewTracking = () => {
//   // const location = useRouter();
//   // useEffect(() => {
//   //   const analytics = getAnalytics(app);
//   //   logEvent(analytics, "screenName", {
//   //     screenName: location.pathname,
//   //   });
//   // }, [location]);
// };

// export default usePageViewTracking;
