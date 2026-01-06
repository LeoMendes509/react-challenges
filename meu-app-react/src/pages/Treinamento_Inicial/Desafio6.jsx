import Card from "../../components/Challenges/Treinamento_Inicial/Desafio6/Card";

function Desafio6() {
  const handleClick = () => alert("Ação executada!");

  return (
    <div className="desafio6-container">
      <h1>Desafio 6 - Cards</h1>

      <Card title="Card Default" variant="default">
        <p>Este é o estilo padrão.</p>
        <button onClick={handleClick}>Ação</button>
      </Card>

      <Card title="Card Primary" variant="primary">
        <p>Este é o estilo primário.</p>
        <button onClick={handleClick}>Ação</button>
      </Card>

      <Card title="Aviso" variant="danger" id="card-urgente">
        <p>Atenção! Este é o card de perigo.</p>
        <button onClick={handleClick}>Ação</button>
      </Card>
    </div>
  );
}

export default Desafio6;
