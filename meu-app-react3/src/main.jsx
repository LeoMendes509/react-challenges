import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Importando os Provedores (As "Usinas")
import { ThemeProvider } from "./providers/Challenge5/ThemeProvider";
import { UserProvider } from "./providers/Challenge6/UserProvider";

// Importando CSS Global
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 1. Primeiro o Tema (Ar Condicionado) */}
      <ThemeProvider>
        {/* 2. Depois o Usuário (Crachá) */}
        <UserProvider>
          {/* 3. Por fim, o App (O Bar) */}
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
