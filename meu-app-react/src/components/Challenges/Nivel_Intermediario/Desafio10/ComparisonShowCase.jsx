import React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { Notifications, Close } from "@mui/icons-material";

// --- IMPORTAÇÕES ESPECÍFICAS DE CADA MÉTODO ---
import { makeStyles } from "@mui/styles"; // V4 (Legado)
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"; // V5 (Styled)

// =====================================================================
// 1. ABORDAGEM LEGADO (makeStyles - MUI v4)
// =====================================================================
// Definimos o Hook de estilos
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#252525",
    borderLeft: "6px solid #FF0000", // A borda vermelha
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    marginBottom: "10px",
  },
  content: {
    flexGrow: 1,
    marginLeft: "16px",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
  },
  message: {
    color: "#aaa",
    fontSize: "0.875rem",
  },
}));

// Tema de emergência para o makeStyles não quebrar (igual Desafio 9)
const defaultTheme = createTheme();

const NotificationV4 = () => {
  const classes = useStyles(); // Chamamos o hook

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper className={classes.root}>
        <Notifications sx={{ color: "#FF0000" }} />
        <div className={classes.content}>
          <Typography className={classes.title}>Notificação v4</Typography>
          <Typography className={classes.message}>
            Estilizado via makeStyles (Hook).
          </Typography>
        </div>
        <IconButton size="small" sx={{ color: "#aaa" }}>
          <Close />
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
};

// =====================================================================
// 2. ABORDAGEM MODERNA RÁPIDA (sx prop - MUI v5)
// =====================================================================
const NotificationSX = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2, // padding: 16px
        bgcolor: "#252525",
        borderLeft: "6px solid #FF0000",
        mb: 1,
      }}
    >
      <Notifications sx={{ color: "#FF0000" }} />

      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          Notificação SX
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          Estilizado inline com a prop sx.
        </Typography>
      </Box>

      <IconButton size="small" sx={{ color: "#aaa" }}>
        <Close />
      </IconButton>
    </Paper>
  );
};

// =====================================================================
// 3. ABORDAGEM ARQUITETURA (styled() - MUI v5)
// =====================================================================
// Criamos um componente "falso" que já nasce estilizado
const StyledNotification = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: "#252525",
  borderLeft: "6px solid #FF0000",
  marginBottom: theme.spacing(1),

  // Aninhamento (Nesting) nativo do styled
  "& .MuiSvgIcon-root": {
    color: "#FF0000",
  },
  "& .content": {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));

const NotificationStyled = () => {
  return (
    <StyledNotification elevation={4}>
      <Notifications /> {/* A cor vem do pai StyledNotification */}
      <div className="content">
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          Notificação Styled
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          Estilizado via styled-components API.
        </Typography>
      </div>
      <IconButton size="small" sx={{ color: "#aaa" }}>
        <Close />
      </IconButton>
    </StyledNotification>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL QUE MOSTRA OS 3
// =====================================================================
const ComparisonShowcase = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="overline" color="textSecondary">
        MÉTODO 1: LEGADO (MAKESYLES)
      </Typography>
      <NotificationV4 />

      <Divider sx={{ my: 4, borderColor: "#444" }} />

      <Typography variant="overline" color="textSecondary">
        MÉTODO 2: RÁPIDO (SX PROP)
      </Typography>
      <NotificationSX />

      <Divider sx={{ my: 4, borderColor: "#444" }} />

      <Typography variant="overline" color="textSecondary">
        MÉTODO 3: ARQUITETURA (STYLED)
      </Typography>
      <NotificationStyled />
    </Box>
  );
};

export default ComparisonShowcase;
