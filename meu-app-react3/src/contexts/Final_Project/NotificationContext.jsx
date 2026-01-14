import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Adiciona notificação e mantém na lista (sem sumir sozinho)
  const addNotification = useCallback((message, type = "info") => {
    const newNote = {
      id: Date.now() + Math.random(), // ID único
      message,
      type,
      timestamp: new Date(),
    };
    // Adiciona no começo da lista (mais recente primeiro)
    setNotifications((prev) => [newNote, ...prev]);
  }, []);

  // Limpa uma notificação específica (opcional)
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Limpa todas (para o botão "Marcar como lidas")
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification deve ser usado dentro de NotificationProvider"
    );
  return context;
};
