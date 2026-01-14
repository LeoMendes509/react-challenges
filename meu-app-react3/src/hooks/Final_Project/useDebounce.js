import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Efeito de Agendamento: Sempre que o valor muda, agendamos uma atualização futura. Se mudar de novo antes do tempo, cancelamos a anterior.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Cancela o timer se o usuário digitar novamente antes do tempo acabar
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
