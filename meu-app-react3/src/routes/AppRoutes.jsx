import React from "react";
import { Routes, Route } from "react-router-dom";

// 1. Importa a Home
import HomePage from "../pages/Home/HomePage";

// --- MÓDULO 1: NÍVEL INICIANTE ---
import Challenge1Page from "../pages/Level_Beginner/Challenge1/Challenge1Page";
import Challenge2Page from "../pages/Level_Beginner/Challenge2/Challenge2Page";
import Challenge3Page from "../pages/Level_Beginner/Challenge3/Challenge3Page";
import Challenge4Page from "../pages/Level_Beginner/Challenge4/Challenge4Page";
// --- MÓDULO 2: NÍVEL INTERMEDIÁRIO ---
import Challenge5Page from "../pages/Level_Intermediate/Challenge5/Challenge5Page";
import Challenge6Page from "../pages/Level_Intermediate/Challenge6/Challenge6Page";
import Challenge7Page from "../pages/Level_Intermediate/Challenge7/Challenge7Page";
import Challenge8Page from "../pages/Level_Intermediate/Challenge8/Challenge8Page";
import Challenge9Page from "../pages/Level_Intermediate/Challenge9/Challenge9Page";
import Challenge10Page from "../pages/Level_Intermediate/Challenge10/Challenge10Page";
// --- MÓDULO 3: NÍVEL AVANÇADO ---
import Challenge11Page from "../pages/Level_Advanced/Challenge11/Challenge11Page";
import Challenge12Page from "../pages/Level_Advanced/Challenge12/Challenge12Page";
import Challenge13Page from "../pages/Level_Advanced/Challenge13/Challenge13Page";
import Challenge14Page from "../pages/Level_Advanced/Challenge14/Challenge14Page";
// --- MÓDULO 3: NÍVEL AVANÇADO ---
import FinalProjectPage from "../pages/Final_Project/FinalBoss/FinalProjectPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- MENU PRINCIPAL --- */}
      <Route path="/" element={<HomePage />} />
      {/* --- NÍVEL INICIANTE --- */}
      <Route path="/beginner/1" element={<Challenge1Page />} />
      <Route path="/beginner/2" element={<Challenge2Page />} />
      <Route path="/beginner/3" element={<Challenge3Page />} />
      <Route path="/beginner/4" element={<Challenge4Page />} />
      {/* --- NÍVEL INTERMEDIÁRIO --- */}
      <Route path="/intermediate/5" element={<Challenge5Page />} />
      <Route path="/intermediate/6" element={<Challenge6Page />} />
      <Route path="/intermediate/7" element={<Challenge7Page />} />
      <Route path="/intermediate/8" element={<Challenge8Page />} />
      <Route path="/intermediate/9" element={<Challenge9Page />} />
      <Route path="/intermediate/10" element={<Challenge10Page />} />
      {/* --- NÍVEL AVANÇADO --- */}
      <Route path="/advanced/11" element={<Challenge11Page />} />
      <Route path="/advanced/12" element={<Challenge12Page />} />
      <Route path="/advanced/13" element={<Challenge13Page />} />
      <Route path="/advanced/14" element={<Challenge14Page />} />
      {/* --- DESAFIO FINAL --- */}
      <Route path="/final-project" element={<FinalProjectPage />} />
      {/* Os Desafios 2, 3 e 4 não estão aqui.
         Então, quando clicar neles, vai cair na rota "*" abaixo.
      */}
      0/* --- ROTA CORINGA (404 / EM CONSTRUÇÃO) ---
      <Route
        path="*"
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#000",
              color: "#F0EDCF",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "#40A2D8" }}>🚧 Em Construção 🚧</h1>
            <p>Este desafio ainda não foi implementado.</p>
            <a href="/" style={{ marginTop: "20px", color: "#0B60B0" }}>
              Voltar para Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
