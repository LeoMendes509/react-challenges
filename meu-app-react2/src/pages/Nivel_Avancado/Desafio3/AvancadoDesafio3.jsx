import React from "react";
import ApiSimulation from "../../../components/Challenges/Nivel_Avancado/Desafio3/ApiSimulation";
import "../Styles/AvancadoDesafio3.css";

const AvancadoDesafio3 = () => {
  return (
    <div className="avancado-page-3">
      <div className="header-navy">
        <h1>Gestão de Equipe</h1>
        <p>Desafio 10: Requisições Assíncronas</p>
      </div>

      <div className="content-navy">
        <ApiSimulation />
      </div>
    </div>
  );
};

export default AvancadoDesafio3;
