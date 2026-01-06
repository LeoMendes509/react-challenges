import React from "react";
// Importação limpa graças ao index.js
import ProductCard from "../../components/Challenges/Nivel_Intermediario/Desafio9";
import "./Styles/IntermediarioDesafio9.css";

const IntermediarioDesafio9 = () => {
  return (
    <div className="desafio9-page">
      <h1 className="desafio9-title">Padrão Legacy (makeStyles)</h1>

      <ProductCard
        title="Headphone Pro"
        description="Experiência sonora imersiva com cancelamento de ruído ativo e bateria de longa duração."
        price="599,00"
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
      />
    </div>
  );
};

export default IntermediarioDesafio9;
