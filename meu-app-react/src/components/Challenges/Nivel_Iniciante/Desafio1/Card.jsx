import React from "react";
// A importação do CSS Modules é feita como um Objeto
import styles from "./Card.module.css";

// O componente aceita props para ser reutilizável (título e descrição)
const Card = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title || "Título do Card"}</h2>

      <p className={styles.description}>
        {description ||
          "Esta é uma descrição padrão para testar o componente estilizado com CSS Modules."}
      </p>

      <button className={styles.button}>Ver mais</button>
    </div>
  );
};

export default Card;
