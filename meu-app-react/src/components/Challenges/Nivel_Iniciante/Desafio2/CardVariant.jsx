import React from "react";
import clsx from "clsx"; // Biblioteca para combinar classes
import styles from "./CardVariant.module.css";

const CardVariant = ({
  title,
  description,
  variant = "primary", // Padrão: Primary
  size = "medium", // Padrão: Medium
}) => {
  return (
    <div
      className={clsx(
        styles.card, // Classe fixa
        styles[variant], // Classe dinâmica de cor
        styles[size] // Classe dinâmica de tamanho
      )}
    >
      <h2 className={styles.title}>{title || variant}</h2>

      <p className={styles.description}>
        {description ||
          `Exemplo de card variante ${variant} com tamanho ${size}.`}
      </p>

      <button className={styles.button}>Ação</button>
    </div>
  );
};

export default CardVariant;
