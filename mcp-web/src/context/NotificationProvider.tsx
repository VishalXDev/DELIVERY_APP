import { ReactNode, useEffect, useState } from "react";
import { getToken, onMessage, Messaging } from "firebase/messaging";  // Remove getMessaging import
import { MessagePayload } from "firebase/messaging";
import { toast } from "react-toastify";
import { NotificationContext } from "./NotificationContext";
import getFirebaseMessaging from "./firebase"; // Default import

interface Props {
  children: ReactNode;
}

export default function NotificationProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermissionAndToken = async () => {
    const messaging: Messaging | null = await getFirebaseMessaging();
    if (!messaging) return;

    try {
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        setToken(currentToken);
        setError(null); // Clear error if token is successfully retrieved
      } else {
        console.warn("No registration token available.");
        setError("No registration token available.");
      }
    } catch (error) {
      console.error("Error getting FCM token", error);
      setError("Error getting FCM token. Please try again.");
    }
  };

  const onFirebaseMessage = (callback: (payload: MessagePayload) => void) => {
    getFirebaseMessaging().then((messaging: Messaging | null) => {
      if (messaging) {
        onMessage(messaging, callback);
      }
    });
  };

  useEffect(() => {
    requestPermissionAndToken();
    onFirebaseMessage((payload: MessagePayload) => {
      toast.info(payload.notification?.title ?? "🔔 New Notification");
    });

    return () => {
      // Optional cleanup here, if needed
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ token, requestPermissionAndToken, onFirebaseMessage, error }}
    >
      {error && <div className="error-toast">{error}</div>}
      {children}
    </NotificationContext.Provider>
  );
}
