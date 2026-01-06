import React, { useRef } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const SearchForm = () => {
  // useRef (o gancho)
  // Cria uma referência vazia
  // Diferente do useState , mudar isso não faz a tela carregar
  const searchInputRef = useRef(null);

  // Função de buscar
  const handleSearch = () => {
    // Acessa direto o HTML (.current) e pega o texto (.value) na força bruta
    const termo = searchInputRef.current.value;

    // Verifica se tem texto e mostra o alerta
    if (termo) {
      console.log("Buscando : " + termo);
      alert(`Você buscou por : ${termo}`);
    } else {
      alert("O campo está vazio");
    }
  };

  // Função de limpar
  const handleClear = () => {
    // Apaga o texto direto no HTML sem passar pelo React
    searchInputRef.current.value = "";

    // Coloca o cursor de volta pra dentro do campo para digitar de novo
    searchInputRef.current.focus();
  };

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        maxWidth: 500,
        width: "100%",
        backgroundColor: "#2B2A2A",
        color: "#F5F2F2",
      }}
    >
      {/* Título Laranja e subtítulo explicativo */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#FEB05D", fontWeight: "bold" }}
      >
        Busca Não Controlada
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "#aaa", marginBottom: 3 }}
      >
        UseRef: O React só vê o valor quando você clica no botão.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        {/* CAMPO DE INPUT */}
        <TextField
          // AQUI É O SEGREDO: Conecta nosso "anzol" (ref) neste input.
          inputRef={searchInputRef}
          label="Digite sua busca..."
          variant="outlined"
          fullWidth
          // defaultValue: Define o valor inicial apenas uma vez.
          // Note que NÃO usamos 'value' nem 'onChange' aqui.
          defaultValue=""
          // Estilização das bordas e cores (Azul e Off-White)
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#F5F2F2" },
              "&.Mui-focused fieldset": { borderColor: "#5A7ACD" }, // Foco Azul
              color: "#F5F2F2",
            },
            "& .MuiInputLabel-root": { color: "#999" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#5A7ACD" },
          }}
        />

        {/* BOTÕES LADO A LADO */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* BOTÃO BUSCAR (Laranja) */}
          <Button
            variant="contained"
            onClick={handleSearch}
            fullWidth
            sx={{
              backgroundColor: "#FEB05D",
              color: "#2B2A2A",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e59b4c" },
            }}
          >
            BUSCAR
          </Button>

          {/* BOTÃO LIMPAR (Contorno Azul) */}
          <Button
            variant="outlined"
            onClick={handleClear}
            fullWidth
            sx={{
              borderColor: "#5A7ACD",
              color: "#5A7ACD",
              fontWeight: "bold",
              "&:hover": { borderColor: "#fff", color: "#fff" },
            }}
          >
            LIMPAR
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchForm;
