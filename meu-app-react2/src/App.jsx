import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// --- MÓDULO 1: NÍVEL INICIANTE ---
import InicianteDesafio1 from "./pages/Nivel_Iniciante/Desafio1/InicianteDesafio1";
import InicianteDesafio2 from "./pages/Nivel_Iniciante/Desafio2/InicianteDesafio2";
import InicianteDesafio3 from "./pages/Nivel_Iniciante/Desafio3/InicianteDesafio3";
// --- MÓDULO 2: NÍVEL INTERMEDIÁRIO ---
import IntermediarioDesafio1 from "./pages/Nivel_Intermediario/Desafio1/IntermediarioDesafio4";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Rota para os desafios iniciantes */}
      <Route path="/iniciante/1" element={<InicianteDesafio1 />} />
      <Route path="/iniciante/2" element={<InicianteDesafio2 />} />
      <Route path="/iniciante/3" element={<InicianteDesafio3 />} />
      {/* Rota para os desafios intermediários */}
      <Route path="/intermediario/1" element={<IntermediarioDesafio1 />} />
    </Routes>
  );
}

export default App;
