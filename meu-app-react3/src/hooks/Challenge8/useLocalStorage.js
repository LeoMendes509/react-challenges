import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // 1. O Robô acorda e tenta ler o caderno
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Se achou, traduz do "idioma robô" (JSON) para o nosso. Se não, usa o inicial.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("Erro ao ler localStorage:", error);
      return initialValue;
    }
  });

  // 2. O Robô fica vigiando: mudou o valor? Ele escreve no caderno.
  useEffect(() => {
    try {
      // Traduz para "idioma robô" (String) antes de salvar
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Erro ao salvar localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};
