import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Inicialização do Estado (Lazy): Tenta ler do navegador na primeira vez. Se existir, usa; se não, usa o valor inicial.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Função de Atualização: Atualiza o React (tela) e o LocalStorage (navegador) ao mesmo tempo para manter a sincronia
  const setValue = (value) => {
    try {
      // Permite passar uma função como update (ex: prev => prev + 1)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
