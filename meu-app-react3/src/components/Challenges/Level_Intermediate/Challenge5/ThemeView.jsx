import React from "react";
import { Box, Typography, Paper, Switch, Button, Fade } from "@mui/material";
import { ArrowBack, LightMode, DarkMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ThemeView = ({ theme, toggleTheme, colors }) => {
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    // 1. O Fundo da Página reage à cor do Contexto
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg, // <--- Dinâmico!
        color: colors.text, // <--- Dinâmico!
        transition: "all 0.3s ease", // Animação suave na troca
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          color: colors.text, // Botão muda de cor com o tema
          fontWeight: "bold",
        }}
      >
        VOLTAR
      </Button>

      {/* Cartão Central */}
      <Fade in={true}>
        <Paper
          elevation={isDark ? 4 : 1}
          sx={{
            bgcolor: colors.cardBg, // <--- Dinâmico!
            color: colors.text,
            p: 5,
            borderRadius: 4,
            maxWidth: 500,
            width: "100%",
            textAlign: "center",
            border: `1px solid ${colors.border}`,
            boxShadow: isDark
              ? "0 0 40px rgba(0,0,0,0.5)"
              : "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: colors.primary, fontWeight: "bold" }}
          >
            NÍVEL INTERMEDIÁRIO • CONTEXT API
          </Typography>

          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, mt: 2 }}>
            {isDark ? "Modo Escuro" : "Modo Claro"}
          </Typography>

          <Typography sx={{ mb: 4, opacity: 0.8 }}>
            Este componente está "ouvindo" o estado global. <br />
            Se você recarregar a página, ele lembrará sua escolha.
          </Typography>

          {/* Área do Switch */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              p: 3,
              borderRadius: 3,
              mb: 4,
            }}
          >
            <LightMode
              sx={{ color: isDark ? "#555" : "#FDB813", fontSize: 30 }}
            />

            <Switch
              checked={isDark}
              onChange={toggleTheme}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: colors.primary,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  bgcolor: colors.primary,
                },
              }}
            />

            <DarkMode sx={{ color: isDark ? "#fff" : "#ccc", fontSize: 30 }} />
          </Box>

          {/* Debug Visual para entender o state */}
          <Box
            sx={{
              p: 2,
              border: "1px dashed",
              borderColor: colors.border,
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" fontFamily="monospace">
              Current Theme: <strong>{theme}</strong>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default ThemeView;
