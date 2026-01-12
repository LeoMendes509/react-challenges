import React, { useState, useEffect } from "react";
import ClockView from "../../../components/Challenges/Level_Beginner/Challenge2/ClockView";

// --- SUB-COMPONENTE: O Relógio Vivo ---
// Criamos isso separado para que ele possa ser "Desmontado" completamente
const ActiveClockLogic = ({ onTick }) => {
  useEffect(() => {
    console.log("🟢 RELÓGIO: Montado! O intervalo começou.");

    const intervalId = setInterval(() => {
      console.log("⏱️ Tick...");
      onTick(new Date().toLocaleTimeString()); // Atualiza a hora
    }, 1000);

    // CLEANUP FUNCTION (A Faxineira 🧹)
    // Isso roda AUTOMATICAMENTE quando o componente sai da tela
    return () => {
      console.log("🔴 RELÓGIO: Desmontado! O intervalo foi limpo.");
      clearInterval(intervalId); // <--- IMPORTANTE: Mata o timer
    };
  });

  return null; // Este componente não renderiza nada visual, só lógica
};

// --- PÁGINA PRINCIPAL ---
const Challenge2Page = () => {
  const [showClock, setShowClock] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  return (
    <>
      {/* Se showClock for TRUE, o componente de lógica "Nasce". 
          Se for FALSE, ele "Morre" e executa o cleanup. */}
      {showClock && <ActiveClockLogic onTick={setCurrentTime} />}

      <ClockView
        time={currentTime}
        isVisible={showClock}
        onToggle={() => setShowClock(!showClock)}
      />
    </>
  );
};

export default Challenge2Page;
