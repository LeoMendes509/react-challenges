import React from "react";
import DynamicOrderForm from "../../../components/Challenges/Nivel_Avancado/Desafio2/DynamicOrderForm";
import "../Styles/AvancadoDesafio2.css";

const AvancadoDesafio2 = () => {
  return (
    <div className="avancado-page-vintage">
      <div className="header-vintage">
        <h1>Gestão de Pedidos</h1>
        <p>Desafio 9: Arrays Dinâmicos</p>
      </div>

      <div className="form-container-vintage">
        <DynamicOrderForm />
      </div>
    </div>
  );
};

export default AvancadoDesafio2;
