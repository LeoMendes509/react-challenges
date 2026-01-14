import React from "react";
import { AppProviders } from "./providers/Final_Project/AppProviders";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.css";

function App() {
  return (
    <AppProviders>
      <div>
        <AppRoutes />
      </div>
    </AppProviders>
  );
}

export default App;
