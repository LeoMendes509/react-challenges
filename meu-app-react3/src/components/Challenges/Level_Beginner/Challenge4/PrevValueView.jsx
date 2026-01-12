import React from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { ArrowBack, History, Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Paleta Vulcânica 🌋
const colors = {
  bg: "#0C0C0C", // Preto Profundo
  cardBg: "#150505", // Um tom levemente avermelhado escuro para diferenciar
  border: "#481E14", // Marrom Escuro
  accent: "#9B3922", // Vermelho Ferrugem
  highlight: "#F2613F", // Laranja Magma (Brilhante)
  textLight: "#EAEAEA", // Branco Gelo (Para leitura)
};

const PrevValueView = ({ text, prevText, onChangeText }) => {
  const navigate = useNavigate();

  return (
    // Fundo Principal
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      {/* Botão Voltar */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{
          color: colors.accent,
          position: "absolute",
          top: 24,
          left: 24,
          "&:hover": { color: colors.highlight },
        }}
      >
        VOLTAR
      </Button>

      {/* Cartão Central */}
      <Paper
        elevation={10}
        sx={{
          bgcolor: colors.cardBg,
          border: `2px solid ${colors.border}`,
          borderRadius: 4,
          p: 4,
          width: "100%",
          maxWidth: 500,
          boxShadow: `0 0 50px ${colors.accent}20`, // Glow vermelho suave
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: colors.highlight,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            HISTÓRICO COM USE_REF
          </Typography>
          <Typography variant="caption" sx={{ color: colors.accent }}>
            Entenda como persistir valores sem renderizar
          </Typography>
        </Box>

        {/* Campo de Entrada */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{ color: colors.textLight, mb: 1, fontSize: "0.9rem" }}
          >
            DIGITE O VALOR NOVO (STATE)
          </Typography>
          <TextField
            fullWidth
            value={text}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Digite algo para gerar histórico..."
            variant="filled"
            sx={{
              // Estilização do Input Magma
              "& .MuiFilledInput-root": {
                bgcolor: "#1E0A0A", // Fundo do input bem escuro
                color: colors.textLight, // Texto claro
                borderBottom: `2px solid ${colors.accent}`,
                "&:hover": { bgcolor: "#2A0E0E" },
                "&.Mui-focused": { bgcolor: "#2A0E0E" },
                "&:before": { borderBottom: "none" },
                "&:after": { borderBottom: `2px solid ${colors.highlight}` }, // Linha laranja ao focar
              },
              "& input::placeholder": { color: colors.accent, opacity: 0.6 },
            }}
          />
        </Box>

        <Divider sx={{ borderColor: colors.border, mb: 4, opacity: 0.5 }} />

        {/* Área de Comparação */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          {/* Caixa: Valor Anterior (O Passado) */}
          <Box
            sx={{
              border: `1px dashed ${colors.accent}`,
              borderRadius: 2,
              p: 2,
              bgcolor: "rgba(155, 57, 34, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <History sx={{ color: colors.accent }} fontSize="small" />
              <Typography
                variant="caption"
                sx={{
                  color: colors.accent,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Valor Anterior (Ref)
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: colors.accent, fontFamily: "monospace" }}
            >
              {prevText || "..."}
            </Typography>
          </Box>

          {/* Caixa: Valor Atual (O Presente) */}
          <Box
            sx={{
              border: `1px solid ${colors.highlight}`,
              borderRadius: 2,
              p: 2,
              bgcolor: "rgba(242, 97, 63, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Update sx={{ color: colors.highlight }} fontSize="small" />
              <Typography
                variant="caption"
                sx={{
                  color: colors.highlight,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Valor Atual (State)
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ color: colors.highlight, fontFamily: "monospace" }}
            >
              {text || "..."}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrevValueView;
