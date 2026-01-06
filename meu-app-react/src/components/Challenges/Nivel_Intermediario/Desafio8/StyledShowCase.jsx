import React from "react";
import { Typography, Stack, Divider } from "@mui/material";
// Importamos nossos componentes customizados do arquivo vizinho
import { StyledCard, GradientButton, StatusBadge } from "./styles";

const StyledShowcase = () => {
  return (
    <Stack spacing={3}>
      {/* CASO 1: Sucesso */}
      <StyledCard>
        <StatusBadge status="success">Pagamento Aprovado</StatusBadge>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Plano Premium
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa", mb: 3 }}>
          Sua assinatura está ativa e você tem acesso a todos os recursos do
          sistema Red Zone.
        </Typography>
        <GradientButton fullWidth>Acessar Painel</GradientButton>
      </StyledCard>

      {/* CASO 2: Pendente */}
      <StyledCard>
        <StatusBadge status="warning">Aguardando Confirmação</StatusBadge>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Transferência
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa", mb: 3 }}>
          Estamos processando seus dados. Isso pode levar alguns minutos.
        </Typography>
        {/* Botão desabilitado visualmente apenas para exemplo */}
        <GradientButton style={{ opacity: 0.6, cursor: "not-allowed" }}>
          Aguarde...
        </GradientButton>
      </StyledCard>

      {/* CASO 3: Erro */}
      <StyledCard>
        <StatusBadge status="error">Falha na Conexão</StatusBadge>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Servidor Offline
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa", mb: 3 }}>
          Não foi possível conectar ao banco de dados. Tente novamente.
        </Typography>
        <GradientButton>Tentar Novamente</GradientButton>
      </StyledCard>
    </Stack>
  );
};

export default StyledShowcase;
