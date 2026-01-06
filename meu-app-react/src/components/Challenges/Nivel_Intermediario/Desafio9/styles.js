import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

// 1. Criamos um tema de emergência aqui mesmo
const defaultTheme = createTheme();

export const useStyles = makeStyles((theme) => {
  // 2. O TRUQUE: Verificamos se o 'theme' veio vazio. 
  // Se veio vazio (o bug), usamos o 'defaultTheme'.
  const t = (theme && theme.palette) ? theme : defaultTheme;

  return {
    root: {
      maxWidth: 345,
      borderRadius: '16px',
      // Agora usamos 't' em vez de 'theme'
      backgroundColor: t.palette.background.paper,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease-in-out',
      margin: 'auto',
      
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
      },

      // Breakpoints do tema
      [t.breakpoints.up('sm')]: {
        maxWidth: 400,
      },
    },

    media: {
      height: 200,
      backgroundColor: t.palette.grey[200],
      objectFit: 'cover',
    },

    price: {
      color: t.palette.primary.main,
      fontWeight: 'bold',
      fontSize: '1.5rem',
      marginTop: t.spacing(1),
    },

    button: {
      marginTop: t.spacing(2),
      width: '100%',
      borderRadius: '8px',
      padding: t.spacing(1.5),
      textTransform: 'none',
      fontSize: '1rem',
    }
  };
});