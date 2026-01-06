import React from "react";
import SearchForm from "../../../components/Challenges/Nivel_Iniciante/Desafio3/SearchForm";
import "../Styles/InicianteDesafio3.css";

const InicianteDesafio3 = () => {
  return (
    <div className="desafio3-page">
      <SearchForm />

      <div className="desafio3-footer">
        <p>Desafio 3: useRef e Uncontrolled Components.</p>
        <p>Abra o Console (F12) para ver a busca acontecendo.</p>
      </div>
    </div>
  );
};

export default InicianteDesafio3;
