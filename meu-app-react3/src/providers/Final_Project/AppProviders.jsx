import React from "react";
import { ThemeProvider } from "../../contexts/Final_Project/ThemeContext";
import { NotificationProvider } from "../../contexts/Final_Project/NotificationContext";
import { TaskProvider } from "../../contexts/Final_Project/TaskContext";

// Esse componente é a "Mãe" de todos. Ele abraça a aplicação inteira.
export const AppProviders = ({ children }) => {
  return (
    // 1. Camada de Notificações (Pode ser acessada por todos abaixo)
    <NotificationProvider>
      {/* 2. Camada de Tema (Define as cores para todos abaixo) */}
      <ThemeProvider>
        {/* 3. Camada de Tarefas (Onde vivem os dados) */}
        <TaskProvider>
          {/* AQUI ENTRA O APP (As telas, botões, formulários) */}
          {children}
        </TaskProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};
