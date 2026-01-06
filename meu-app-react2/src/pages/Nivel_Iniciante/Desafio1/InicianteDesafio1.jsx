import React from "react";
// Importamos o componente funcional (o cérebro)
import LoginForm from "../../../components/Challenges/Nivel_Iniciante/Desafio1/LoginForm";
// Importamos o estilo do layout da página (o cenário)
import "../Styles/InicianteDesafio1.css";

const InicianteDesafio1 = () => {
  return (
    // .desafio1-page vem do CSS importado acima e define o background
    <div className="desafio1-page">
      {/* Aqui entra o componente puro em MUI */}
      <LoginForm />

      <div className="desafio1-footer">
        <p>Desafio 1: Componentes Controlados e useState.</p>
        <p>Observe como o texto verde responde instantaneamente à digitação.</p>
      </div>
    </div>
  );
};

export default InicianteDesafio1;
