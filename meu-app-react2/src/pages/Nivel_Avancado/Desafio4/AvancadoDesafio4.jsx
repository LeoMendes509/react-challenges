import React from "react";
import CustomHookDemo from "../../../components/Challenges/Nivel_Avancado/Desafio4/CustomHookDemo";
import "../Styles/AvancadoDesafio4.css";

const AvancadoDesafio4 = () => {
  return (
    <div className="avancado-page-4">
      <div className="header-navy">
        <h1>Arquitetura de Hooks</h1>
        <p>Desafio 11: O Hook useFetch</p>
      </div>

      <div className="content-navy">
        <CustomHookDemo />
      </div>
    </div>
  );
};

export default AvancadoDesafio4;
