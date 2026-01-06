import React from "react";
import StyledTable from "../../components/Challenges/Nivel_Intermediario/Desafio12/StyledTable";
import "./Styles/IntermediarioDesafio12.css";

const IntermediarioDesafio12 = () => {
  return (
    <div className="desafio12-page">
      <h1 className="desafio12-title">Gerenciamento de Usuários</h1>

      {/* Container para limitar a largura em telas muito grandes */}
      <div style={{ width: "100%", maxWidth: "1000px" }}>
        <StyledTable />
      </div>
    </div>
  );
};

export default IntermediarioDesafio12;
