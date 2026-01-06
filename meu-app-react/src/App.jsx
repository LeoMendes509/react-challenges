import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

// --- MÓDULO 1: TREINAMENTO INICIAL ---
import Desafio1 from "./pages/Treinamento_Inicial/Desafio1";
import Desafio2 from "./pages/Treinamento_Inicial/Desafio2";
import Desafio3 from "./pages/Treinamento_Inicial/Desafio3";
import Desafio4 from "./pages/Treinamento_Inicial/Desafio4";
import Desafio5 from "./pages/Treinamento_Inicial/Desafio5";
import Desafio6 from "./pages/Treinamento_Inicial/Desafio6";
import Desafio7 from "./pages/Treinamento_Inicial/Desafio7";
import Desafio8 from "./pages/Treinamento_Inicial/Desafio8";
import Desafio9 from "./pages/Treinamento_Inicial/Desafio9";
import Desafio10 from "./pages/Treinamento_Inicial/Desafio10";

// --- MÓDULO 2: NÍVEL INICIANTE ---
import InicianteDesafio1 from "./pages/Nivel_Iniciante/InicianteDesafio1";
import InicianteDesafio2 from "./pages/Nivel_Iniciante/InicianteDesafio2";
import InicianteDesafio3 from "./pages/Nivel_Iniciante/InicianteDesafio3";
import InicianteDesafio4 from "./pages/Nivel_Iniciante/InicianteDesafio4";

// --- MÓDULO 3: NÍVEL INTERMEDIÁRIO ---
import IntermediarioDesafio5 from "./pages/Nivel_Intermediario/Intermediario5";
import IntermediarioDesafio6 from "./pages/Nivel_Intermediario/Intermediario6";
import IntermediarioDesafio7 from "./pages/Nivel_Intermediario/Intermediario7";
import IntermediarioDesafio8 from "./pages/Nivel_Intermediario/Intermediario8";
import IntermediarioDesafio9 from "./pages/Nivel_Intermediario/Intermediario9";
import IntermediarioDesafio10 from "./pages/Nivel_Intermediario/Intermediario10";
import IntermediarioDesafio12 from "./pages/Nivel_Intermediario/Intermediario12";
import IntermediarioDesafio13 from "./pages/Nivel_Intermediario/Intermediario13";

// --- MÓDULO 4: DESAFIO FINAL ---
import IntermediarioFinal from "./pages/Nivel_Intermediario/IntermediarioFinal";

function App() {
  return (
    <Routes>
      {/* Home / Página Principal */}
      <Route path="/" element={<Home />} />

      {/* Treinamento Inicial */}
      <Route path="/desafio/1" element={<Desafio1 />} />
      <Route path="/desafio/2" element={<Desafio2 />} />
      <Route path="/desafio/3" element={<Desafio3 />} />
      <Route path="/desafio/4" element={<Desafio4 />} />
      <Route path="/desafio/5" element={<Desafio5 />} />
      <Route path="/desafio/6" element={<Desafio6 />} />
      <Route path="/desafio/7" element={<Desafio7 />} />
      <Route path="/desafio/8" element={<Desafio8 />} />
      <Route path="/desafio/9" element={<Desafio9 />} />
      <Route path="/desafio/10" element={<Desafio10 />} />

      {/* Nível Iniciante */}
      <Route path="/iniciante/1" element={<InicianteDesafio1 />} />
      <Route path="/iniciante/2" element={<InicianteDesafio2 />} />
      <Route path="/iniciante/3" element={<InicianteDesafio3 />} />
      <Route path="/iniciante/4" element={<InicianteDesafio4 />} />

      {/* Nível Intermediário */}
      <Route path="/intermediario/5" element={<IntermediarioDesafio5 />} />
      <Route path="/intermediario/6" element={<IntermediarioDesafio6 />} />
      <Route path="/intermediario/7" element={<IntermediarioDesafio7 />} />
      <Route path="/intermediario/8" element={<IntermediarioDesafio8 />} />
      <Route path="/intermediario/9" element={<IntermediarioDesafio9 />} />
      <Route path="/intermediario/10" element={<IntermediarioDesafio10 />} />
      <Route path="/intermediario/12" element={<IntermediarioDesafio12 />} />
      <Route path="/intermediario/13" element={<IntermediarioDesafio13 />} />

      {/* ROTA DO DESAFIO FINAL */}
      <Route path="/intermediario/final" element={<IntermediarioFinal />} />
    </Routes>
  );
}

export default App;
