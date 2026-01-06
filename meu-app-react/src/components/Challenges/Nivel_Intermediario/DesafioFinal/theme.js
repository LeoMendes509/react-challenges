import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6', // Roxo Neon (Violet-500)
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#fff',
    },
    secondary: {
      main: '#10b981', // Verde Esmeralda
      contrastText: '#fff',
    },
    background: {
      default: '#09090b', // Fundo Preto Profundo (Zinc-950)
      paper: '#18181b',   // Fundo Cards (Zinc-900)
    },
    text: {
      primary: '#f4f4f5', // Branco quase puro
      secondary: '#71717a', // Cinza escuro para textos secundários (Zinc-500)
    },
    divider: '#27272a', // Divisores muito sutis
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    body2: { color: '#a1a1aa' } // Texto padrão mais cinza
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          // CORREÇÃO: Borda muito sutil, quase invisível (Dark Gray)
          border: '1px solid #27272a', 
          boxShadow: 'none', 
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)' } // Glow roxo
        },
        outlined: {
          borderColor: '#27272a',
          color: '#e4e4e7',
          '&:hover': { borderColor: '#52525b', backgroundColor: 'rgba(255,255,255,0.02)' }
        }
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { 
          fontWeight: 600, 
          border: '1px solid #27272a', // Borda sutil no chip
          backgroundColor: 'rgba(255,255,255,0.03)'
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        }
      }
    }
  },
});

export default theme;