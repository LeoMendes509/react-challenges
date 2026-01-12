import React, { useState, useEffect, useRef } from "react";
import PrevValueView from "../../../components/Challenges/Level_Beginner/Challenge4/PrevValueView";

const Challenge4Page = () => {
  // 1. O PRESENTE (State): O que está na tela agora.
  // Se mudar, a tela pinta de novo.
  const [text, setText] = useState("");

  // 2. O PASSADO (Ref): O "Baú" onde guardamos coisas sem pintar a tela.
  // useRef pode guardar qualquer valor (número, texto, objeto).
  const prevTextRef = useRef("");

  // 3. A MÁQUINA DO TEMPO (Effect)
  // Roda TODA vez que o [text] muda, mas SÓ DEPOIS que a tela já pintou.
  useEffect(() => {
    // Guardamos o valor atual no baú para ser usado no futuro como "passado".
    prevTextRef.current = text;

    // Console log para você ver a ordem das coisas (aperte F12)
    console.log(
      `Pintou a tela: ${text} | Guardou no ref: ${prevTextRef.current}`
    );
  }, [text]);

  return (
    <PrevValueView
      text={text} // Passamos o Presente
      prevText={prevTextRef.current} // Passamos o Passado (que estava guardado no baú)
      onChangeText={setText} // Função para mudar o presente
    />
  );
};

export default Challenge4Page;
