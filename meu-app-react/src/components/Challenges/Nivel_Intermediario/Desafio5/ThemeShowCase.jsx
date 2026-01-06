import React from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

// --- A. CRIAÇÃO DO TEMA PERSONALIZADO ---
const customTheme = createTheme({
  // 1. PALETA: Definimos as cores exatas do requisito
  palette: {
    primary: { main: "#2563eb" }, // Azul
    secondary: { main: "#7c3aed" }, // Roxo
    error: { main: "#dc2626" }, // Vermelho
    success: { main: "#16a34a" }, // Verde
    warning: { main: "#f59e0b" }, // Laranja
    background: { default: "#f8fafc", paper: "#ffffff" },
  },

  // 2. SHAPE: Define o arredondamento padrão para tudo (Cards, Dialogs)
  shape: { borderRadius: 16 },

  // 3. TYPOGRAPHY: Configura a fonte e tamanhos dos títulos
  typography: {
    fontFamily: "'Poppins', sans-serif", // Fonte moderna (precisa importar no index.html ou ter instalada)
    h4: { fontWeight: 700, letterSpacing: "-0.5px" },
    button: { fontWeight: 600 },
  },

  // 4. COMPONENTS: Aqui mudamos o comportamento padrão dos componentes
  components: {
    // MuiButton: Alteramos TODOS os botões do site
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Tira o LEITRA MAIÚSCULA padrão do Android
          borderRadius: 8, // Botões um pouco menos redondos que os Cards
          padding: "10px 20px", // Botões mais gordinhos
        },
      },
    },
    // MuiTextField: Forçamos todos a serem 'outlined' (com borda) por padrão
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: { backgroundColor: "white" }, // Fundo branco nos inputs
      },
    },
  },
});

const ThemeShowcase = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        {/* Título demonstrando a tipografia customizada */}
        <Typography variant="h4" color="primary" gutterBottom>
          Tema Customizado
        </Typography>
        <Typography paragraph color="textSecondary">
          Veja como o tema afeta todos os componentes automaticamente.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* --- DEMONSTRAÇÃO DE INPUTS (MuiTextField) --- */}
        <Typography variant="h6" gutterBottom>
          Inputs (Padrão Outlined)
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <TextField label="Texto Padrão" />
          <TextField label="Com Erro" error helperText="Algo deu errado" />
          <TextField label="Desabilitado" disabled />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* --- DEMONSTRAÇÃO DE BOTÕES (MuiButton) --- */}
        <Typography variant="h6" gutterBottom>
          Botões (Sem Caps Lock)
        </Typography>

        <Grid container spacing={2}>
          {/* Mapeando cores para criar vários botões sem repetir código */}
          {["primary", "secondary", "error", "success", "warning"].map(
            (cor) => (
              <Grid item key={cor}>
                <Button variant="contained" color={cor}>
                  Botão {cor}
                </Button>
              </Grid>
            )
          )}
        </Grid>

        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button variant="outlined" color="primary">
            Outlined
          </Button>
          <Button color="secondary">Text Button</Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ThemeShowcase;
