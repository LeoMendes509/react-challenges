// Componente de cada item individual
function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
}) {
  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      {/* Cabeçalho clicável */}
      <div className="accordion-header" onClick={onToggle}>
        <span>{title}</span>

        {/* Ícone que gira quando abre */}
        <span className={`accordion-icon ${isOpen ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {/* Conteúdo que abre e fecha */}
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default AccordionItem;