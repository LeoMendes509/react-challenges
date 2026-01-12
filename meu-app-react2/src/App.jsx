import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
// --- MÓDULO 1: NÍVEL INICIANTE ---
import InicianteDesafio1 from "./pages/Nivel_Iniciante/Desafio1/InicianteDesafio1";
import InicianteDesafio2 from "./pages/Nivel_Iniciante/Desafio2/InicianteDesafio2";
import InicianteDesafio3 from "./pages/Nivel_Iniciante/Desafio3/InicianteDesafio3";
// --- MÓDULO 2: NÍVEL INTERMEDIÁRIO ---
import IntermediarioDesafio1 from "./pages/Nivel_Intermediario/Desafio1/IntermediarioDesafio1";
import IntermediarioDesafio2 from "./pages/Nivel_Intermediario/Desafio2/IntermediarioDesafio2";
import IntermediarioDesafio3 from "./pages/Nivel_Intermediario/Desafio3/IntermediarioDesafio3";
import IntermediarioDesafio4 from "./pages/Nivel_Intermediario/Desafio4/IntermediarioDesafio4";
// --- MÓDULO 3: NÍVEL AVANÇADO ---
import AvancadoDesafio1 from "./pages/Nivel_Avancado/Desafio1/AvancadoDesafio1";
import AvancadoDesafio2 from "./pages/Nivel_Avancado/Desafio2/AvancadoDesafio2";
import AvancadoDesafio3 from "./pages/Nivel_Avancado/Desafio3/AvancadoDesafio3";
import AvancadoDesafio4 from "./pages/Nivel_Avancado/Desafio4/AvancadoDesafio4";
import AvancadoDesafio5 from "./pages/Nivel_Avancado/Desafio5/AvancadoDesafio5";
// --- DESAFIO FINAL: FINAL BOSS ---
import DesafioFinal from "./pages/Desafio_Final/Final_Boss/FinalBoss";

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
      <Route path="/intermediario/2" element={<IntermediarioDesafio2 />} />
      <Route path="/intermediario/3" element={<IntermediarioDesafio3 />} />
      <Route path="/intermediario/4" element={<IntermediarioDesafio4 />} />
      {/* Rota para os desafios avançados */}
      <Route path="/avancado/1" element={<AvancadoDesafio1 />} />
      <Route path="/avancado/2" element={<AvancadoDesafio2 />} />
      <Route path="/avancado/3" element={<AvancadoDesafio3 />} />
      <Route path="/avancado/4" element={<AvancadoDesafio4 />} />
      <Route path="/avancado/5" element={<AvancadoDesafio5 />} />
      {/* Rota para o desafio final */}
      <Route path="/final-boss" element={<DesafioFinal />} />
    </Routes>
  );
}

export default App;
