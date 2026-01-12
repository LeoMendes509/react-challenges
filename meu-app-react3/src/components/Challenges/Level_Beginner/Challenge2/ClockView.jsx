import React from "react";
import { Button, Box } from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Clock.module.css";

const ClockView = ({ time, isVisible, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Botão Voltar */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ color: "#E2DDB4", position: "absolute", top: 20, left: 20 }}
      >
        Voltar
      </Button>

      {/* Renderização Condicional Visual */}
      {isVisible ? (
        <div className={styles.clockCard}>
          <span className={styles.digitalText}>{time}</span>
          <span className={styles.label}>Horário de Brasília</span>
        </div>
      ) : (
        <div className={styles.hiddenMessage}>
          O Relógio está desmontado (Verifique o Console)
        </div>
      )}

      {/* Botão de Ligar/Desligar */}
      <Button
        variant="contained"
        startIcon={isVisible ? <VisibilityOff /> : <Visibility />}
        onClick={onToggle}
        sx={{
          bgcolor: isVisible ? "#333" : "#E43636",
          color: "#F6EFD2",
          marginTop: "20px",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: isVisible ? "#555" : "#c02727",
          },
        }}
      >
        {isVisible ? "Ocultar Relógio" : "Mostrar Relógio"}
      </Button>
    </div>
  );
};

export default ClockView;
