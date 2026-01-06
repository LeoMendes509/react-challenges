import React from "react";
import ProfileCard from "../../components/Challenges/Treinamento_Inicial/Desafio1/ProfileCard";
import "../../components/Challenges/Treinamento_Inicial/Desafio1/Desafio1.css";

function Desafio1() {
  return (
    <div className="desafio1-container">
      <div className="desafio1-content">
        <h1>Desafio 1 - Profile Card</h1>

        <ProfileCard
          name="Leonardo Mendes"
          email="leonardomendes@email.com"
          role="Full Stack Developer"
        />
      </div>
    </div>
  );
}

export default Desafio1;
