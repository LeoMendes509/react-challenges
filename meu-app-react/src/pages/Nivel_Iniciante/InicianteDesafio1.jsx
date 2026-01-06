import React from "react";
import Card from "../../components/Challenges/Nivel_Iniciante/Desafio1/Card";
import "./Styles/InicianteDesafio1.css";

const InicianteDesafio1 = () => {
  return (
    // Usamos a classe definida no arquivo CSS externo
    <div className="iniciante-desafio1-container">
      <Card
        title="Aprendendo CSS Modules"
        description="Este card tem seus estilos isolados. Agora a página também tem seu CSS separado em arquivo próprio!"
      />
    </div>
  );
};

export default InicianteDesafio1;
