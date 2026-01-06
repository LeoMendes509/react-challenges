import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import {
  People,
  ShoppingBag,
  AttachMoney,
  TrendingUp,
  AutoAwesome,
} from "@mui/icons-material";

import theme from "../../components/Challenges/Nivel_Intermediario/DesafioFinal/theme";
import MainLayout from "../../components/Challenges/Nivel_Intermediario/DesafioFinal/MainLayout";
import StatCard from "../../components/Challenges/Nivel_Intermediario/DesafioFinal/StatCard";
import DataTable from "../../components/Challenges/Nivel_Intermediario/DesafioFinal/DataTable";

// --- SEUS DADOS ORIGINAIS ADAPTADOS ---
const stats = [
  {
    id: 1,
    title: "Total Usuários",
    value: "1,234",
    change: "+12.5%",
    icon: <People />,
  },
  {
    id: 2,
    title: "Receita Total",
    value: "R$ 45k",
    change: "+8.2%",
    icon: <AttachMoney />,
  },
  {
    id: 3,
    title: "Novos Pedidos",
    value: "567",
    change: "-1.8%",
    icon: <ShoppingBag />,
  },
];

const IntermediarioFinal = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        {/* HEADER */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="caption" sx={{ color: "#71717a" }}>
                Visão Geral do Sistema
              </Typography>
              <Chip
                label="Ao vivo"
                size="small"
                sx={{
                  height: 20,
                  fontSize: 10,
                  bgcolor: "#10b981",
                  color: "#000",
                  fontWeight: "bold",
                }}
              />
            </Stack>
            <Typography variant="h4" color="white">
              Dashboard Administrativo
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {["Hoje", "Esta Semana", "Este Mês"].map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onClick={() => {}}
                sx={{
                  bgcolor: "#09090b",
                  color: "#a1a1aa",
                  border: "1px solid #27272a",
                  "&:hover": { bgcolor: "#18181b", color: "#fff" },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* GRID PRINCIPAL */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Esquerda: 3 Cards de Estatísticas (DADOS ANTIGOS) */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2}>
              {stats.map((stat) => (
                <Grid item xs={12} sm={4} key={stat.id}>
                  <Box sx={{ height: 240 }}>
                    <StatCard {...stat} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Direita: Card Roxo de Destaque (CONTEXTO NOVO) */}
          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                height: 240,
                p: 4,
                borderRadius: 4,
                // Gradiente Roxo Neon
                background:
                  "linear-gradient(160deg, #09090b 0%, #2e1065 50%, #4c1d95 100%)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Efeito de brilho fundo */}
              <Box
                sx={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  bgcolor: "#8b5cf6",
                  filter: "blur(100px)",
                  opacity: 0.4,
                }}
              />

              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AutoAwesome sx={{ color: "#fff" }} />
                    <Typography variant="h6" color="white">
                      Meta Mensal
                    </Typography>
                  </Box>
                  <Chip
                    label="85%"
                    size="small"
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                      fontWeight: "bold",
                      height: 22,
                    }}
                  />
                </Stack>

                <Typography
                  variant="h5"
                  color="white"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Excelente Trabalho!
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#c4b5fd",
                    display: "block",
                    mb: 3,
                    lineHeight: 1.5,
                    maxWidth: "90%",
                  }}
                >
                  Você já atingiu 85% da meta de vendas deste mês. Continue
                  assim para desbloquear o bônus.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    mb: 1.5,
                    borderRadius: 3,
                    "&:hover": { bgcolor: "#f4f4f5" },
                  }}
                >
                  Ver Relatório Detalhado
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* TABELA DE USUÁRIOS (DADOS ANTIGOS) */}
        <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
          Gerenciamento de Usuários
        </Typography>
        <DataTable />
      </MainLayout>
    </ThemeProvider>
  );
};

export default IntermediarioFinal;
