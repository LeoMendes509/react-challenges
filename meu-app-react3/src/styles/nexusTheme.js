// --- CORES COMUNS (NEON & STATUS) ---
const commonColors = {
  neonBlue: "#4318FF",
  neonPink: "#FF0080",
  neonYellow: "#FFB547",
  neonPurple: "#7551FF",
  success: "#05CD99",
  error: "#EE5D50",
};

// --- MODO ESCURO (Navy Blue) ---
export const nexusDark = {
  ...commonColors,
  bgGlobal: "#0B1437", // Fundo Azul Profundo
  bgPaper: "#111C44", // Card Azul
  bgLight: "#1B254B", // Inputs
  textPrimary: "#FFFFFF",
  textSecondary: "#A3AED0",
};

// --- MODO CLARO (Clean White) ---
export const nexusLight = {
  ...commonColors,
  bgGlobal: "#F4F7FE", // <--- Fundo Cinza/Azul muito claro (Quase branco, suave aos olhos)
  bgPaper: "#FFFFFF", // <--- Cards 100% Brancos
  bgLight: "#F7F9FB", // Inputs levemente cinzas
  textPrimary: "#2B3674", // Texto Azul Marinho (Legibilidade perfeita)
  textSecondary: "#A3AED0",
};

export const priorityColorsMap = {
  high: commonColors.neonPink,
  medium: commonColors.neonYellow,
  low: commonColors.neonBlue,
};
