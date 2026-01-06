import React from "react";
import CardVariant from "../../components/Challenges/Nivel_Iniciante/Desafio2/CardVariant";
import "./Styles/InicianteDesafio2.css";

const InicianteDesafio2 = () => {
  return (
    <div className="iniciante-desafio2-container">
      <h1 className="page-title">Galeria de Variantes</h1>

      {/* Seção 1: Variação de CORES */}
      <div className="gallery-section">
        <CardVariant
          variant="primary"
          title="Primary"
          description="Este card usa a cor Coral (#EC625F) definida como padrão."
        />
        <CardVariant
          variant="secondary"
          title="Secondary"
          description="Este card usa os tons de cinza escuro da sua paleta."
        />
        <CardVariant
          variant="danger"
          title="Danger"
          description="Usado para erros ou alertas críticos."
        />
      </div>

      {/* Seção 2: Variação de TAMANHOS */}
      <div className="gallery-section" style={{ marginTop: "20px" }}>
        <CardVariant variant="primary" size="small" title="Small" />
        <CardVariant variant="secondary" size="medium" title="Medium" />
        <CardVariant variant="danger" size="large" title="Large" />
      </div>
    </div>
  );
};

export default InicianteDesafio2;
