import { useState } from "react";
import "./SecretMessage.css";

function SecretMessage() {
  // Estado que controla se a mensagem aparece ou não
  const [isVisible, setIsInvisible] = useState(false);

  function toogleMessage() {
    setIsInvisible(prev => !prev);
  }

  return (
    <div className="secret-container">
        <button onClick={toogleMessage}>
            {isVisible ? "Ocultar" : "Mostrar"}
        </button>

        {isVisible && (
            <p className="secret-text">
                🤫 Esta é uma mensagem secreta!
            </p>
        )}
    </div>
  );
}

export default SecretMessage;