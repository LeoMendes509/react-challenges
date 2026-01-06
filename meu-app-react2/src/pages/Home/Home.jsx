import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1>Meus Desafios React</h1>
        <p>
          <b>Bem-vindo(a)!</b> <br />
          Escolha um desafio abaixo para visualizar.
        </p>

        {/* --- NÍVEL INICIANTE (3 Desafios) --- */}
        <h3 className="section-title">Nível Iniciante</h3>
        <div className="buttons-grid">
          <Link to="/iniciante/1" className="desafio-btn">
            Desafio 1
          </Link>
          <Link to="/iniciante/2" className="desafio-btn">
            Desafio 2
          </Link>
          <Link to="/iniciante/3" className="desafio-btn">
            Desafio 3
          </Link>
        </div>

        {/* --- NÍVEL INTERMEDIÁRIO (4 Desafios) --- */}
        <h3 className="section-title">Nível Intermediário</h3>
        <div className="buttons-grid">
          <Link to="/intermediario/1" className="desafio-btn">
            Desafio 1
          </Link>
          <Link to="/intermediario/2" className="desafio-btn">
            Desafio 2
          </Link>
          <Link to="/intermediario/3" className="desafio-btn">
            Desafio 3
          </Link>
          <Link to="/intermediario/4" className="desafio-btn">
            Desafio 4
          </Link>
        </div>

        {/* --- NÍVEL AVANÇADO (5 Desafios) --- */}
        <h3 className="section-title">Nível Avançado</h3>
        <div className="buttons-grid">
          <Link to="/avancado/1" className="desafio-btn">
            Desafio 1
          </Link>
          <Link to="/avancado/2" className="desafio-btn">
            Desafio 2
          </Link>
          <Link to="/avancado/3" className="desafio-btn">
            Desafio 3
          </Link>
          <Link to="/avancado/4" className="desafio-btn">
            Desafio 4
          </Link>
          <Link to="/avancado/5" className="desafio-btn">
            Desafio 5
          </Link>
        </div>

        {/* --- FINAL BOSS --- */}
        <div className="final-boss-section">
          <span className="final-boss-label">FINAL BOSS</span>
          <Link to="/final-boss" className="final-btn">
            🏆 DESAFIO FINAL
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
