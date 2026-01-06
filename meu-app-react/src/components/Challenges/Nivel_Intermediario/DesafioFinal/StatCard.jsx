import React from "react";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArrowOutward } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#18181b", // Zinc-900
  border: "1px solid #27272a", // CORREÇÃO: Borda escura sutil
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: "#52525b", // Zinc-600 no hover
  },
}));

// Ícone quadrado estilo "App Icon"
const IconWrapper = styled(Box)({
  width: 44,
  height: 44,
  borderRadius: 14,
  backgroundColor: "rgba(39, 39, 42, 0.5)", // Zinc-800 com transparência
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 12,
  color: "#fff",
  border: "1px solid #27272a",
});

// Gráfico de linha ondulada (Sparkline)
const Sparkline = ({ color }) => (
  <svg
    viewBox="0 0 100 30"
    width="100%"
    height="50"
    style={{ marginTop: 15, overflow: "visible" }}
  >
    <defs>
      <linearGradient id={`grad-${color}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Linha Neon */}
    <path
      d="M0,25 C20,25 20,5 40,15 C60,25 70,5 100,0"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      filter="drop-shadow(0 0 4px rgba(0,0,0,0.5))"
    />
    {/* Preenchimento abaixo da linha */}
    <path
      d="M0,25 C20,25 20,5 40,15 C60,25 70,5 100,0 V40 H0 Z"
      fill={`url(#grad-${color})`}
      stroke="none"
    />
  </svg>
);

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change.includes("+");
  const color = isPositive ? "#10b981" : "#ef4444"; // Emerald-500 ou Red-500

  return (
    <StyledPaper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconWrapper>{icon}</IconWrapper>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#71717a",
                fontWeight: 600,
                display: "block",
                mb: 0.5,
              }}
            >
              Proof of Stake
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#e4e4e7" }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <IconButton
          size="small"
          sx={{
            color: "#52525b",
            border: "1px solid #27272a",
            borderRadius: "10px",
          }}
        >
          <ArrowOutward fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ mt: 3, position: "relative", zIndex: 2 }}>
        <Typography variant="caption" sx={{ color: "#52525b" }}>
          Reward Rate
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 1, color: "#fff" }}
        >
          {value}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
          <Typography variant="body2" sx={{ color: color, fontWeight: 600 }}>
            {change}
          </Typography>
        </Box>
      </Box>

      {/* Gráfico no fundo */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          opacity: 0.6,
          zIndex: 1,
        }}
      >
        <Sparkline color={color} />
      </Box>
    </StyledPaper>
  );
};

export default StatCard;
