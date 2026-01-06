import { useState } from "react";
import StarRating from "../../components/Challenges/Treinamento_Inicial/Desafio7/StarRating";

function Desafio7() {
  // Criamos um estado na página para "capturar" a nota vinda do componente filho
  const [ratingValue, setRatingValue] = useState(0);

  // Função que será disparada quando a nota mudar
  const handleRatingChange = (newNote) => {
    setRatingValue(newNote);
    console.log("The user rated it with:", newNote);
  };

  return (
    <div className="desafio7-container">
      <h1>How was your experience?</h1>

      {/* Passamos a função handleRatingChange para a prop onChange.
        Isso é o que chamamos de "Elevação de Estado" (Lifting State Up).
      */}
      <StarRating initialValue={0} onChange={handleRatingChange} />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {ratingValue === 0 ? (
          <p>Please select a note above.</p>
        ) : (
          <p>
            You gave a rating <strong>{ratingValue}</strong>!
            {ratingValue >= 4 ? " We were happy! 😍" : " Let's improve! 🛠️"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Desafio7;
