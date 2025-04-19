import { ReactNode, useEffect, useState } from "react";
import { getMessaging, getToken, onMessage, MessagePayload } from "firebase/messaging";
import { NotificationContext } from "./NotificationContext";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCaCr76OPg7UxS2tcS4DQv-w9uod-MNTs",
  authDomain: "mcp-system-2025.firebaseapp.com",
  projectId: "mcp-system-2025",
  storageBucket: "mcp-system-2025.appspot.com",
  messagingSenderId: "1076380944351",
  appId: "1:1076380944351:web:bee4f6432d5e6d185de66a",
  measurementId: "G-2D116W52WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Props type
interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  const requestPermissionAndToken = async (): Promise<string | null> => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY" // Replace this with your real key
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        setToken(currentToken);
        return currentToken;
      } else {
        console.warn("No registration token available.");
        return null;
      }
    } catch (error) {
      console.error("Error getting FCM token", error);
      return null;
    }
  };

  const onFirebaseMessage = (callback: (payload: MessagePayload) => void) => {
    onMessage(messaging, callback);
  };

  useEffect(() => {
    requestPermissionAndToken();

    onFirebaseMessage((payload: MessagePayload) => {
      toast.info(payload.notification?.title ?? "🔔 New notification");
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ token, requestPermissionAndToken, onFirebaseMessage }}>
      {children}
    </NotificationContext.Provider>
  );
}
