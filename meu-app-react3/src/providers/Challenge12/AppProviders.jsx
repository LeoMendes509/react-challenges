import React from "react";
import { AuthProvider } from "../../contexts/Challenge12/AuthContext";
import { ThemeProvider } from "../../contexts/Challenge12/ThemeContext";
import { NotificationProvider } from "../../contexts/Challenge12/NotificationContext";

// Esse componente recebe a aplicação (children) e envolve com TODOS os providers
export const AppProviders = ({ children }) => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};
