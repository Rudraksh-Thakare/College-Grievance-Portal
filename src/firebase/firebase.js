import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCTFUI2dsGkEEiIYJkgd329s9f6FG9iPSw",
  authDomain: "college-grievance-portal-9c614.firebaseapp.com",
  projectId: "college-grievance-portal-9c614",
  storageBucket: "college-grievance-portal-9c614.firebasestorage.app",
  messagingSenderId: "142693494338",
  appId: "1:142693494338:web:fada122069e2af200c87db",
  measurementId: "G-8BT42XJ22W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db   = getFirestore(app);

// Analytics — only load if supported (avoids dev/SSR crashes)
export let analytics = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

export default app;
