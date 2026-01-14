import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Switch,
  Avatar,
  IconButton,
  Stack,
  Alert,
  Slide,
} from "@mui/material";
import {
  ArrowBack,
  DarkMode,
  LightMode,
  Login,
  Logout,
  NotificationsActive,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Imports dos 3 Hooks
import { useAuth } from "../../../../hooks/Challenge12/useAuth";
import { useTheme } from "../../../../hooks/Challenge12/useTheme";
import { useNotification } from "../../../../hooks/Challenge12/useNotification";

// --- COMPONENTE DE NOTIFICAÇÕES FLUTUANTES ---
const ToastContainer = () => {
  const { notifications } = useNotification();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {notifications.map((note) => (
        <Slide
          direction="left"
          in={true}
          mountOnEnter
          unmountOnExit
          key={note.id}
        >
          <Alert
            severity={note.type}
            variant="filled"
            sx={{ width: 300, boxShadow: 3 }}
          >
            {note.message}
          </Alert>
        </Slide>
      ))}
    </Box>
  );
};

// --- COMPONENTE PRINCIPAL ---
const MultiContextView = () => {
  const navigate = useNavigate();

  // Consumindo os 3 Contextos
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotification();

  // Estado local apenas para o input de nome
  const [inputName, setInputName] = useState("");

  // CORES DINÂMICAS (Baseado no ThemeContext)
  const isDark = theme === "dark";
  const styles = {
    bg: isDark ? "#000000" : "#F2E9D0",
    text: isDark ? "#F2E9D0" : "#2C1A1D",
    card: isDark ? "#1A1A1D" : "#FFFFFF",
    primary: "#BB5A5A",
  };

  // --- AÇÕES QUE ENVOLVEM MÚLTIPLOS CONTEXTOS ---

  const handleLogin = () => {
    if (!inputName) return addNotification("Digite um nome!", "error");

    login(inputName); // 1. AuthContext
    addNotification(`Bem-vindo, ${inputName}!`, "success"); // 2. NotificationContext
  };

  const handleLogout = () => {
    logout(); // 1. AuthContext
    addNotification("Você saiu do sistema.", "info"); // 2. NotificationContext
  };

  const handleToggleTheme = () => {
    toggleTheme(); // 1. ThemeContext
    // Aviso visual usando o NotificationContext
    addNotification(
      `Tema alterado para ${isDark ? "Light" : "Dark"}`,
      "warning"
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: styles.bg,
        color: styles.text,
        transition: "0.3s",
        p: 4,
      }}
    >
      <ToastContainer />

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ color: styles.primary }}
        >
          VOLTAR
        </Button>
        <Typography variant="h5" fontWeight="bold">
          SISTEMA MULTI-CONTEXT
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>{isDark ? "Modo Escuro" : "Modo Claro"}</Typography>
          <Switch
            checked={!isDark}
            onChange={handleToggleTheme}
            color="warning"
          />
        </Box>
      </Box>

      {/* CONTEÚDO */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        {!user ? (
          /* --- TELA DE LOGIN --- */
          <Paper
            elevation={4}
            sx={{
              p: 4,
              bgcolor: styles.card,
              borderRadius: 4,
              width: 400,
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: styles.primary,
                mx: "auto",
                mb: 2,
                width: 60,
                height: 60,
              }}
            >
              <Login />
            </Avatar>
            <Typography
              variant="h5"
              color={styles.text}
              fontWeight="bold"
              mb={3}
            >
              Acesso Restrito
            </Typography>

            <TextField
              fullWidth
              label="Seu Nome"
              variant="outlined"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              sx={{
                mb: 3,
                "& input": { color: styles.text },
                "& label": { color: styles.text },
                "& fieldset": { borderColor: styles.primary },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{ bgcolor: styles.primary, py: 1.5, fontWeight: "bold" }}
            >
              ENTRAR NO SISTEMA
            </Button>
          </Paper>
        ) : (
          /* --- TELA DE DASHBOARD (LOGADO) --- */
          <Paper
            elevation={4}
            sx={{ p: 4, bgcolor: styles.card, borderRadius: 4, width: 500 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Avatar sx={{ bgcolor: styles.primary, width: 70, height: 70 }}>
                {user.name[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" color={styles.text} fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  Administrador
                </Typography>
              </Box>
            </Box>

            <Alert
              severity="info"
              sx={{
                mb: 4,
                bgcolor: "rgba(187, 90, 90, 0.1)",
                color: styles.text,
              }}
            >
              Você tem acesso total aos contextos da aplicação. Teste mudar o
              tema ou sair.
            </Alert>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<NotificationsActive />}
                onClick={() => addNotification("Isso é um teste!", "info")}
                sx={{
                  flex: 1,
                  borderColor: styles.primary,
                  color: styles.primary,
                }}
              >
                TESTAR ALERTA
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ flex: 1 }}
              >
                SAIR
              </Button>
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default MultiContextView;
