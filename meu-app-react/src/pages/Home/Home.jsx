import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  // Gera os números de 1 a 10 para os desafios ANTIGOS
  const desafiosIniciais = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1>Meus Desafios React</h1>
        <p>
          <b>Bem-vindo (a) !</b> <br />
          Escolha um desafio abaixo para visualizar.
        </p>

        {/* ==================================================
            SEÇÃO 1: Treinamento Inicial (Antigos 1-10) 
           ================================================== */}
        <h3 className="section-title">Treinamento Inicial</h3>

        <div className="buttons-grid">
          {desafiosIniciais.map((d) => (
            <Link key={d} to={`/desafio/${d}`} className="desafio-btn">
              Desafio {d}
            </Link>
          ))}
        </div>

        {/* ==================================================
            SEÇÃO 2: Nível Iniciante (MUI Básico) 
           ================================================== */}
        <h3 className="section-title">Nível Iniciante</h3>

        <div className="buttons-grid">
          <Link to="/iniciante/1" className="desafio-btn">
            Desafio 1.1
          </Link>
          <Link to="/iniciante/2" className="desafio-btn">
            Desafio 2.1
          </Link>
          <Link to="/iniciante/3" className="desafio-btn">
            Desafio 3.1
          </Link>
          <Link to="/iniciante/4" className="desafio-btn">
            Desafio 4.1
          </Link>
        </div>

        {/* ==================================================
            SEÇÃO 3: Nível Intermediário (Temas e Grids) 
           ================================================== */}
        <h3 className="section-title">Nível Intermediário</h3>

        <div className="buttons-grid">
          <Link to="/intermediario/5" className="desafio-btn">
            Desafio 5.1
          </Link>
          <Link to="/intermediario/6" className="desafio-btn">
            Desafio 6.1
          </Link>
          <Link to="/intermediario/7" className="desafio-btn">
            Desafio 7.1
          </Link>
          <Link to="/intermediario/8" className="desafio-btn">
            Desafio 8.1
          </Link>
          <Link to="/intermediario/9" className="desafio-btn">
            Desafio 9.1
          </Link>
          <Link to="/intermediario/10" className="desafio-btn">
            Desafio 10.1
          </Link>
          <Link to="/intermediario/12" className="desafio-btn">
            Desafio 12.1
          </Link>
          <Link to="/intermediario/13" className="desafio-btn">
            Desafio 13.1
          </Link>
        </div>

        {/* ==================================================
            SEÇÃO 4: FINAL BOSS (Destacado)
           ================================================== */}
        <div className="final-boss-section">
          <span className="final-boss-label">FINAL BOSS</span>
          <Link to="/intermediario/final" className="final-btn">
            🏆 DESAFIO FINAL
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
