import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  // Estado para guardar o valor com atraso
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Agenda uma atualização para daqui a N milissegundos
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup
    // Se o valor mudar (o usuário digitar outra letra) antes do tempo acabar
    // o React roda essa função de limpeza e cancela o agendamento anterior
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Roda sempre que o valor ou o delay mudam

  return debouncedValue;
};
