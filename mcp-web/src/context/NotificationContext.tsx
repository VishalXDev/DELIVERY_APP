import { createContext } from "react";
import { MessagePayload } from "firebase/messaging";

export interface NotificationContextType {
  token: string | null;
  requestPermissionAndToken: () => Promise<void>;
  onFirebaseMessage: (callback: (payload: MessagePayload) => void) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
