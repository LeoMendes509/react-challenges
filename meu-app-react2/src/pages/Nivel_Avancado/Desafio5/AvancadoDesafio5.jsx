import React from "react";
import DebounceSearch from "../../../components/Challenges/Nivel_Avancado/Desafio5/DebounceSearch";
import "../Styles/AvancadoDesafio5.css";

const AvancadoDesafio5 = () => {
  return (
    <div className="avancado-page-5">
      <div className="header-navy">
        <h1>Otimização de Performance</h1>
        <p>Desafio 12: useEffect com Cleanup (Debounce)</p>
      </div>

      <div className="content-area">
        <DebounceSearch />
      </div>
    </div>
  );
};

export default AvancadoDesafio5;
