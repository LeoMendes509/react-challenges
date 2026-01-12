import React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import { Add, Remove, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Counter.module.css";

const CounterView = ({ count, onIncrement, onDecrement }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Botão Voltar */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{
          color: "#948979",
          position: "absolute",
          top: 20,
          left: 20,
          fontWeight: "bold",
          zIndex: 10, // Garante que fica por cima de tudo
          "&:hover": { color: "#DFD0B8" },
        }}
      >
        Voltar
      </Button>

      {/* MUDANÇA IMPORTANTE NO PAPER: 
         Adicionei sx={{ backgroundColor: '#393E46' }} para matar o branco padrão
      */}
      <Paper
        className={styles.card}
        elevation={6}
        sx={{ backgroundColor: "#393E46" }}
      >
        <h1 className={styles.title}>CONTADOR</h1>

        <Typography className={styles.description}>
          Olhe a aba do navegador mudar! ⬆️
        </Typography>

        <div className={styles.counterValue}>{count}</div>

        <Box className={styles.actions}>
          {/* Botão Menos */}
          <Button
            variant="outlined"
            startIcon={<Remove />}
            onClick={onDecrement}
            fullWidth={false} // Deixa responsivo pelo CSS
            className={styles.actionBtn}
            sx={{
              borderColor: "#948979",
              color: "#948979",
              borderWidth: "2px",
              fontWeight: "bold",
              minWidth: "120px",
              padding: "10px",
              "&:hover": {
                borderColor: "#DFD0B8",
                color: "#DFD0B8",
                backgroundColor: "rgba(223, 208, 184, 0.05)",
                borderWidth: "2px",
              },
            }}
          >
            Menos
          </Button>

          {/* Botão Mais */}
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={onIncrement}
            fullWidth={false}
            sx={{
              bgcolor: "#948979",
              color: "#222831",
              fontWeight: "bold",
              minWidth: "120px",
              padding: "10px",
              "&:hover": {
                bgcolor: "#DFD0B8",
                color: "#222831",
              },
            }}
          >
            Mais
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default CounterView;
