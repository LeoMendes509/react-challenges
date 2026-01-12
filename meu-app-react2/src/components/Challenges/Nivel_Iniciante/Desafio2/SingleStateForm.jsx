import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
const SingleStateForm = () => {
  // --- Objeto (Estado Único) ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // --- HandleChange ("gerente geral")
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData, // Copia o que ja estava antes
      [name]: value, // Atualiza só o campo que mudou
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados enviados !", formData);

    setFormData({ email: "", password: "" }); // limpa tudo
    alert("Dados enviados! Veja o console (F12) .");
  };

  // Visual

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        maxWidth: 400,
        width: "100%",
        // COR: Cinza Escuro para o fundo do cartão
        backgroundColor: "#2B2A2A",
        // COR: Off-White para o texto base
        color: "#F5F2F2",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#FEB05D", fontWeight: "bold" }}
      >
        Login Unificado
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* EMAIL */}
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            // Estilização dos Inputs com a paleta
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#F5F2F2" }, // Borda normal (Branco suave)
                "&:hover fieldset": { borderColor: "#5A7ACD" }, // Hover (Azul)
                "&.Mui-focused fieldset": { borderColor: "#5A7ACD" }, // Foco (Azul)
                color: "#F5F2F2", // Texto digitado (Branco suave)
              },
              "& .MuiInputLabel-root": { color: "#999" }, // Label cinza claro
              "& .MuiInputLabel-root.Mui-focused": { color: "#5A7ACD" }, // Label focado (Azul)
            }}
          />

          {/* SENHA */}
          <TextField
            name="password"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#F5F2F2" },
                "&:hover fieldset": { borderColor: "#5A7ACD" },
                "&.Mui-focused fieldset": { borderColor: "#5A7ACD" },
                color: "#F5F2F2",
              },
              "& .MuiInputLabel-root": { color: "#999" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#5A7ACD" },
            }}
          />

          {/* BOTÃO */}
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={!formData.email || !formData.password}
            sx={{
              marginTop: 2,
              // COR: Laranja para destaque
              backgroundColor: "#FEB05D",
              color: "#2B2A2A", // Texto do botão escuro para contraste
              fontWeight: "bold",

              "&:hover": { backgroundColor: "#e59b4c" }, // Laranja um pouco mais escuro
              "&:disabled": { backgroundColor: "#555", color: "#888" },
            }}
          >
            ENTRAR
          </Button>
        </Box>
      </form>

      {/* ÁREA DE DEBUG */}
      <Box
        sx={{
          marginTop: 3,
          padding: 2,
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" display="block" sx={{ color: "#aaa" }}>
          Monitorando o Objeto:
        </Typography>

        <pre style={{ color: "#5A7ACD", fontSize: "0.85rem" }}>
          {JSON.stringify(
            {
              ...formData,
              password: formData.password ? "******" : "",
            },
            null,
            2
          )}
        </pre>
      </Box>
    </Paper>
  );
};

export default SingleStateForm;
