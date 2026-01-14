import { createContext, useContext, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocalStorage } from "../../hooks/Final_Project/useLocalStorage";
import { nexusDark, nexusLight } from "../../styles/nexusTheme";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage("nexus_theme_mode", "dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    const currentColors = mode === "dark" ? nexusDark : nexusLight;

    return createTheme({
      palette: {
        mode: mode,
        background: {
          default: currentColors.bgGlobal, // Define cor de fundo padrão
          paper: currentColors.bgPaper, // Define cor dos cards
        },
        primary: { main: currentColors.neonPurple },
        secondary: { main: currentColors.neonBlue },
        text: {
          primary: currentColors.textPrimary,
          secondary: currentColors.textSecondary,
        },
        nexus: currentColors, // Nossas cores personalizadas
      },
      typography: {
        fontFamily: '"DM Sans", "Inter", sans-serif',
        h4: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        allVariants: { color: currentColors.textPrimary },
      },
      components: {
        // FORÇA O BACKGROUND DO BODY A MUDAR
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: currentColors.bgGlobal,
              transition: "background-color 0.4s ease", // Animação suave
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              backgroundImage: "none", // Remove overlay padrão do Material UI
              boxShadow:
                mode === "light"
                  ? "0px 10px 30px rgba(112, 144, 176, 0.15)"
                  : "none",
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              backgroundColor: currentColors.bgLight,
              "& fieldset": { border: "none" }, // Input limpo sem borda preta
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
