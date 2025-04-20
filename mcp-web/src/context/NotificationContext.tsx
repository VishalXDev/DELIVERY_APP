import { createContext } from "react";
import { MessagePayload } from "firebase/messaging";

export interface NotificationContextType {
  token: string | null;
  requestPermissionAndToken: () => void;
  onFirebaseMessage: (callback: (payload: MessagePayload) => void) => void;
  error: string | null;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
