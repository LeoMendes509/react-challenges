function ConfirmationCard({ data }) {
  return (
    <div className="card confirmation">
      <h1>Cadastro finalizado 🎉</h1>

      {data && (
        <>
          <p><strong>Nome:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Idade:</strong> {data.age}</p>
        </>
      )}
    </div>
  );
}

export default ConfirmationCard;
