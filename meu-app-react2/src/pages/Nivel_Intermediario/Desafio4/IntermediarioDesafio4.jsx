import React from "react";
import SurveyForm from "../../../components/Challenges/Nivel_Intermediario/Desafio4/SurveyForm";
import "../Styles/IntermediarioDesafio4.css"; // Importa o CSS de layout

const IntermediarioDesafio4 = () => {
  return (
    <div className="survey-page">
      <SurveyForm />

      <div className="survey-footer">
        Desafio 7 •{" "}
        <span className="survey-highlight">Select, Checkbox e Radio</span>
      </div>
    </div>
  );
};

export default IntermediarioDesafio4;
