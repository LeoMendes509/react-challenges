import { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // useCallback evita que a função seja recriada toda hora
  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now(); //ID único baseado no tempo

    // Adiciona na lista
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Agenda a remoção automática (3 segundos)
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
