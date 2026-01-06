/* eslint-disable no-empty-pattern */
import { styled } from '@mui/material/styles';
import { Card, Button, Box } from '@mui/material';

// 1. StyledCard: Um Card que já nasce com sombra e animação
export const StyledCard = styled(Card)(({ theme }) => ({
  background: '#252525', // Fundo escuro
  color: '#fff',
  padding: theme.spacing(4),
  borderRadius: '16px',
  maxWidth: 400,
  width: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '1px solid #414141',

  // O '&' refere-se ao próprio componente
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(255, 0, 0, 0.3)', // Sombra vermelha suave
    border: '1px solid #FF0000',
  },
}));

// 2. GradientButton: Um botão com degradê complexo
export const GradientButton = styled(Button)(({ }) => ({
  // Gradiente do Vermelho (#FF0000) para um Laranja Escuro
  background: 'linear-gradient(45deg, #FF0000 30%, #AF0404 90%)',
  border: 0,
  borderRadius: 50, // Bem redondo
  boxShadow: '0 3px 5px 2px rgba(175, 4, 4, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s',

  '&:hover': {
    background: 'linear-gradient(45deg, #AF0404 30%, #FF0000 90%)', // Inverte no hover
    boxShadow: '0 6px 10px 4px rgba(175, 4, 4, .4)',
  },
}));

// 3. StatusBadge: A Etiqueta Inteligente
// shouldForwardProp: "Não passe a prop 'status' para a div do HTML, ela é só pra mim"
export const StatusBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})(({ theme, status }) => {
  
  // Lógica de Cores baseada na prop
  let color = '#999'; // Cinza (padrão)
  let bg = 'rgba(153, 153, 153, 0.2)';

  if (status === 'success') {
    color = '#00e676'; // Verde Matrix
    bg = 'rgba(0, 230, 118, 0.2)';
  } else if (status === 'warning') {
    color = '#ffea00'; // Amarelo
    bg = 'rgba(255, 234, 0, 0.2)';
  } else if (status === 'error') {
    color = '#ff1744'; // Vermelho Erro
    bg = 'rgba(255, 23, 68, 0.2)';
  }

  return {
    backgroundColor: bg,
    color: color,
    border: `1px solid ${color}`,
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: theme.spacing(2),
  };
});