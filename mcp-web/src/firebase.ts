import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken, onMessage, MessagePayload } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCaCr76OPg7UxS2tcS4DQv-w9uod-MNTs",
  authDomain: "mcp-system-2025.firebaseapp.com",
  projectId: "mcp-system-2025",
  storageBucket: "mcp-system-2025.firebasestorage.app",
  messagingSenderId: "1076380944351",
  appId: "1:1076380944351:web:bee4f6432d5e6d185de66a",
  measurementId: "G-2D116W52WB",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Database and Messaging
export const db = getDatabase(app);
export const messaging = getMessaging(app);

// Request FCM permission and get token
export const requestPermissionAndToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY", // Replace with your actual VAPID key
    });
    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("FCM permission denied", err);
    return null;
  }
};

// Define payload type for notifications
export const onFirebaseMessage = (callback: (payload: MessagePayload) => void): void => {
  onMessage(messaging, callback);
};
