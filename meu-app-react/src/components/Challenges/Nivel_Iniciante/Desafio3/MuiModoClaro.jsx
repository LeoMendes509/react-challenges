import React from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";

// --- CONFIGURAÇÃO DA PALETA ---
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722", // Laranja: Botões e Destaques (Ação)
      contrastText: "#fff", // Texto branco dentro do botão laranja
    },
    secondary: {
      main: "#2D4059", // Azul Petróleo: Elementos secundários
    },
    background: {
      default: "#EEEEEE", // Fundo geral da página (60% da tela)
      paper: "#FFFFFF", // Fundo dos Cards (para dar contraste com o cinza)
    },
    text: {
      primary: "#222831", // Cor do texto principal (Chumbo)
      secondary: "#2D4059", // Cor de texto de apoio (Azul Petróleo)
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h4: { fontWeight: 700, color: "#222831" }, // Títulos fortes
  },
  // Opcional: Arredondar um pouco os botões para ficar moderno
  shape: {
    borderRadius: 8,
  },
});

const ExemploPaleta = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 1. NAVBAR (Cor Escura para estrutura - 30%) */}
      {/* Usamos bgcolor: 'text.primary' para pegar o #222831 */}
      <AppBar position="static" sx={{ bgcolor: "#222831", boxShadow: "none" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#FF5722", fontWeight: "bold" }}
          >
            MINHA MARCA
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* 2. HERO SECTION (Fundo Claro - 60%) */}
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Container maxWidth="md">
          {/* 3. CARD PRINCIPAL (Papel Branco sobre fundo Cinza) */}
          <Paper
            elevation={0} // Flat design (sem sombra excessiva)
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              border: "1px solid #e0e0e0", // Borda sutil
            }}
          >
            <Typography
              variant="overline"
              color="secondary"
              sx={{ fontWeight: "bold", letterSpacing: 2 }}
            >
              Novidade no mercado
            </Typography>

            <Typography variant="h4" gutterBottom>
              Gerencie seus projetos com estilo
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "600px" }}
            >
              Utilizando a paleta de cores moderna com alto contraste. O fundo
              descansa os olhos, enquanto o laranja guia a atenção do usuário.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* 4. BOTÃO DE AÇÃO (Laranja - 10%) */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4 }}
              >
                Começar Agora
              </Button>

              {/* Botão Secundário (Azul Petróleo) */}
              <Button variant="outlined" color="secondary" size="large">
                Saiba Mais
              </Button>
            </Box>
          </Paper>

          {/* Exemplo de Rodapé simples */}
          <Box mt={5} textAlign="center">
            <Typography variant="caption" sx={{ color: "#2D4059" }}>
              © 2024 Design System • Cores: #222831, #2D4059, #FF5722, #EEEEEE
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ExemploPaleta;
