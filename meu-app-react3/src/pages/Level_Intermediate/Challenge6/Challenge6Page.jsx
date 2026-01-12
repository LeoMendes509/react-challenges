import React from "react";
// Importamos o componente visual que criamos agora pouco
import AuthView from "../../../components/Challenges/Level_Intermediate/Challenge6/AuthView";

const Challenge6Page = () => {
  // A página apenas renderiza a visualização.
  // Toda a lógica de login, logout e estados está dentro do AuthView e do Context.
  return <AuthView />;
};

export default Challenge6Page;
