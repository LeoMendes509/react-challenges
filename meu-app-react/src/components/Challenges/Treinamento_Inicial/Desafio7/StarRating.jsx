import { useState } from "react";
import "./StarRating.css";

function StarRating({ initialValue = 0, onChange }) {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  const handleRating = (value) => {
    const newValue = value === rating ? 0 : value;
    setRating(newValue);
    if (onChange) onChange(newValue);
  };

  // Determina qual valor exibir (o do mouse ou o fixo)
  const activeValue = hover || rating;

  return (
    <div className="star-rating-wrapper">
      {/* Elementos da Face Animada */}
      <figure className={`face rating-${activeValue}`}>
        <i></i><i></i> {/* Olhos */}
        <u><div className="cover"></div></u> {/* Boca */}
      </figure>

      {/* Estrelas */}
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star-icon ${star <= activeValue ? "active" : ""}`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      {rating > 0 && (
        <button className="reset-btn" onClick={() => handleRating(0)}>
          Reset
        </button>
      )}
    </div>
  );
}

export default StarRating;