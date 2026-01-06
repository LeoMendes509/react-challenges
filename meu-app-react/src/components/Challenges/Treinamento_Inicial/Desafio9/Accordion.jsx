import { useState } from "react";
import AccordionItem from "./AccordionItem";
import "./Accordion.css";

// Componente pai que controla qual item está aberto
function Accordion() {
  // Guarda o índice do item aberto
  const [openIndex, setOpenIndex] = useState(null);

  // Abre ou fecha o item clicado
  function handleToggle(index) {
    // Se clicar no mesmo, fecha
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="accordion">
      <AccordionItem
        title="O que é React?"
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
      >
        React é uma biblioteca para criar interfaces.
      </AccordionItem>

      <AccordionItem
        title="O que é um componente?"
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
      >
        Um componente é uma parte reutilizável da interface.
      </AccordionItem>

      <AccordionItem
        title="O que é useState?"
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
      >
        useState guarda informações que mudam na tela.
      </AccordionItem>
    </div>
  );
}

export default Accordion;