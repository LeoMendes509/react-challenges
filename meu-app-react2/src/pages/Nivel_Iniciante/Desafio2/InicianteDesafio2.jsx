import React from "react";
import SingleStateForm from "../../../components/Challenges/Nivel_Iniciante/Desafio2/SingleStateForm";
import "../Styles/InicianteDesafio2.css";

const InicianteDesafio2 = () => {
  return (
    <div className="desafio2-page">
      <SingleStateForm />

      <div className="desafio2-footer">
        <p>Desafio 2: Estado Único com Objeto.</p>
        <p>Um useState para todos governar! 💍</p>
      </div>
    </div>
  );
};

export default InicianteDesafio2;
