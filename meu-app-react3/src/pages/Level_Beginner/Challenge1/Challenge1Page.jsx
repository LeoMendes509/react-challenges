import React, { useState, useEffect } from "react";

// CAMINHO CORRIGIDO (3 "../" em vez de 4)
import CounterView from "../../../components/Challenges/Level_Beginner/Challenge1/CounterView";

const Challenge1Page = () => {
  const [count, setCount] = useState(0);

  // Efeito para mudar o título
  useEffect(() => {
    document.title = `Estoque: ${count} un.`;

    return () => {
      document.title = "React Training";
    };
  }, [count]);

  return (
    <CounterView
      count={count}
      onIncrement={() => setCount((prev) => prev + 1)}
      onDecrement={() => setCount((prev) => prev - 1)}
    />
  );
};

export default Challenge1Page;
