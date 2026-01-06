import { useState } from "react";
import RegistrationForm from "../../components/Challenges/Treinamento_Inicial/Desafio5/RegistrationForm";
import ConfirmationCard from "../../components/Challenges/Treinamento_Inicial/Desafio5/ConfirmationCard";
import "../../components/Challenges/Treinamento_Inicial/Desafio5/Desafio5.css";

function Desafio5() {
  // Guarda os dados finais do cadastro
  // null → mostra formulário
  const [data, setData] = useState(null);

  return (
    <div className={`card-container ${data ? "flip" : ""}`}>
      {/* card-inner contém frente (form) e verso (confirmação) */}
      <div className="card-inner">
        {/* Frente */}
        <RegistrationForm onSubmit={setData} />
        {/* Verso */}
        <ConfirmationCard data={data} />
      </div>
    </div>
  );
}

export default Desafio5;
