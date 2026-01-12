import React from "react";
// Importa o componente lógico que criamos acima
import MultiStepForm from "../../../components/Challenges/Nivel_Avancado/Desafio1/MultiStepForm";
// Importa o CSS de layout desta página
import "../Styles/AvancadoDesafio1.css";

const AvancadoDesafio1 = () => {
  return (
    <div className="avancado-page">
      <div className="avancado-content-wrapper">
        <MultiStepForm />
      </div>

      <div className="avancado-footer">
        <p>Nível Avançado - Desafio 8: Wizard Multi-Step</p>
      </div>
    </div>
  );
};

export default AvancadoDesafio1;
