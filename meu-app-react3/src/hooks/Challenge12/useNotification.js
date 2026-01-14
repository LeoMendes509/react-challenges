import { useContext } from "react";
import { NotificationContext } from "../../contexts/Challenge12/NotificationContext";
export const useNotification = () => useContext(NotificationContext);
