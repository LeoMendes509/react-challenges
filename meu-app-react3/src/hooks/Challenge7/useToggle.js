import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  // Essa função inverte: Se é true vira false, se é false vira true
  const toggle = () => {
    setValue((prevValue) => !prevValue);

    // Debug: Mostra no console se funcionou
    console.log("Toggle ativado! Novo estado será:", !value);
  };

  // Retorna o valor atual E a função para trocar
  return [value, toggle, setValue];
};
