import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
// Mantendo sua importação
import AvatarLeo from "../../../../assets/avatar-leo.png";

const AdvancedCard = ({ name, role, email }) => {
  return (
    <Paper
      elevation={10} // Aumentei a elevação para destacar no escuro
      sx={{
        // --- LAYOUT (Mantido) ---
        width: { xs: 300, md: 380 },
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        transition: "all 0.3s ease",
        cursor: "default",

        // --- NOVAS CORES (Dark Theme) ---
        bgcolor: "#252525", // Fundo Cinza Escuro
        color: "#ffffff", // Texto base Branco
        border: "1px solid #414141", // Borda sutil para separar do fundo preto

        // Efeito Hover com Brilho Vermelho
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 0px 20px #AF0404", // Sombra Vermelha (Glow)
          borderColor: "#FF0000", // Borda acende
        },
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          src={AvatarLeo}
          alt={name}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: "4px solid #FF0000", // Borda Vermelho Neon
            boxShadow: "0 0 15px #AF0404", // Brilho no Avatar
          }}
        />

        <Typography variant="h5" fontWeight="bold" sx={{ color: "#ffffff" }}>
          {name || "Leonardo Mendes"}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", mb: 1, color: "#aaaaaa" }} // Cinza claro
        >
          {role || "Software Engineer"}
        </Typography>

        {/* Status Badge (Vermelho Transparente) */}
        <Box
          sx={{
            bgcolor: "rgba(255, 0, 0, 0.1)", // Fundo vermelho bem suave
            color: "#FF0000", // Texto Vermelho Vivo
            border: "1px solid #AF0404", // Borda Vermelho Escuro
            px: 2,
            py: 0.5,
            borderRadius: 10,
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Open to Work
        </Box>
      </Box>

      {/* Divisor Cinza Médio */}
      <Divider sx={{ my: 2, bgcolor: "#414141" }} />

      {/* Informações de Contato */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
          Contact us via e-mail:
        </Typography>
        <Typography variant="body1" fontWeight="500" sx={{ color: "#FF0000" }}>
          {email || "leonardo.software-engineer@email.com"}
        </Typography>
      </Box>

      {/* Botões de Ação */}
      <Stack direction="row" spacing={2}>
        {/* Botão Hire (Preenchido Vermelho) */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#FF0000",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: 8,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#AF0404", // Vermelho mais escuro no hover
              boxShadow: "0 0 10px #AF0404",
            },
          }}
        >
          Hire
        </Button>

        {/* Botão Portfolio (Contorno) */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "#414141",
            color: "#ffffff",
            borderRadius: 8,
            textTransform: "none",
            borderWidth: 1,
            "&:hover": {
              borderWidth: 1,
              borderColor: "#FF0000", // Borda fica vermelha
              color: "#FF0000", // Texto fica vermelho
              bgcolor: "rgba(255,0,0,0.05)",
            },
          }}
        >
          Portfolio
        </Button>
      </Stack>
    </Paper>
  );
};

export default AdvancedCard;
