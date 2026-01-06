import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";

// Configura as cores do tema (Dark Mode) e força a borda dos inputs
// a ficar clara para aparecer no fundo escuro.
const theme = createTheme({
  palette: {
    primary: { main: "#C84B31", contrastText: "#ECDBBA" },
    secondary: { main: "#ECDBBA" },
    background: { default: "#191919", paper: "#2D4263" },
    text: { primary: "#ECDBBA", secondary: "#ECDBBA" },
  },
  typography: { fontFamily: "Inter, sans-serif" },
  shape: { borderRadius: 12 },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ECDBBA",
            opacity: 0.5,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ECDBBA",
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { color: "#ECDBBA", opacity: 0.7 } },
    },
  },
});

const ContactFormMui = () => {
  // Hooks de estado: um guarda os textos digitados (valores)
  // e o outro controla se o alerta de sucesso aparece (true/false).
  const [valores, setValores] = useState({ nome: "", email: "", mensagem: "" });
  const [avisoAberto, setAvisoAberto] = useState(false);

  // Atualiza o estado "valores" em tempo real enquanto o usuário digita,
  // pegando o nome do campo (name) e o texto novo (value).
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValores({ ...valores, [name]: value });
  };

  // Zera o estado "valores", limpando todos os campos do formulário visualmente.
  const handleLimpar = () => {
    setValores({ nome: "", email: "", mensagem: "" });
  };

  // Simula o envio: valida se tem texto, mostra o alerta de sucesso
  // e depois limpa o formulário automaticamente.
  const handleEnviar = () => {
    if (valores.nome !== "" && valores.email !== "") {
      setAvisoAberto(true);
      handleLimpar();
    }
  };

  // Função simples para fechar o alerta quando o tempo acaba ou clicam fora.
  const handleFecharAviso = () => {
    setAvisoAberto(false);
  };

  return (
    // Aplica o tema de cores em tudo e o CssBaseline limpa o estilo do navegador.
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Container principal (Cartão): define largura, padding e 
          organiza os filhos em coluna com espaço entre eles (gap). */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="800"
            color="primary"
          >
            Fale Conosco
          </Typography>
          <Typography variant="body1" mt={1}>
            Envie sua mensagem abaixo.
          </Typography>
        </Box>

        {/* Inputs Controlados: O 'value' lê do estado e o 'onChange' atualiza o estado.
            O 'name' serve para sabermos qual campo está sendo alterado. */}
        <TextField
          label="Nome Completo"
          variant="outlined"
          fullWidth
          name="nome"
          value={valores.nome}
          onChange={handleChange}
        />

        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          name="email"
          value={valores.email}
          onChange={handleChange}
        />

        <TextField
          label="Mensagem"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          name="mensagem"
          value={valores.mensagem}
          onChange={handleChange}
        />

        {/* Botões de Ação: No celular ficam em coluna, no PC em linha.
            Chamam as funções handleEnviar e handleLimpar no clique. */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ fontWeight: "bold" }}
            onClick={handleEnviar}
          >
            Enviar
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            fullWidth
            sx={{ fontWeight: "bold" }}
            onClick={handleLimpar}
          >
            Limpar
          </Button>
        </Box>
      </Paper>

      {/* Componente de Notificação: Só aparece se avisoAberto for true.
          Some sozinho depois de 4 segundos (autoHideDuration). */}
      <Snackbar
        open={avisoAberto}
        autoHideDuration={4000}
        onClose={handleFecharAviso}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleFecharAviso}
          severity="success"
          sx={{ width: "100%" }}
        >
          Mensagem enviada com sucesso!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ContactFormMui;
