import { useEffect } from "react";

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    // A função que será chamada a cada clique
    const listener = (event) => {
      // Se a ref ainda não existe ou
      // Se o elemento clicado (event.target) está dentro da ref
      // Então não faz nada (retorna)
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Se chegou aqui , é porque clicou FORA. Chama a função do usuário
      handler(event);
    };

    // Adiciona os ouvintes de evento (Mouse e toque para mobile)
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // CLEANUP (limpeza):
    // Quando o componente sumir, removemos os ouvintes
    // para não causar de memória ou erros
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // recria o efeito se a ref ou o handler mudarem
};
