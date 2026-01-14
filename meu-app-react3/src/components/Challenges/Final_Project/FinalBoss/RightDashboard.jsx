import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useTasks } from "../../../../contexts/Final_Project/useTasks";
const RightDashboard = ({ userInitials = "LM", userName = "Admin" }) => {
  const theme = useTheme();
  // Pega as tarefas e estatísticas do Contexto
  const { tasks, stats } = useTasks();

  // 1. Lógica: Calcular Eficiência Real (% de Conclusão)
  const efficiency =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // 2. Lógica: Filtrar tarefas agendadas para HOJE
  const todayStr = new Date().toISOString().split("T")[0]; // "2023-10-27"
  const todaysTasks = tasks.filter((t) => t.dueDate === todayStr);

  // 3. Lógica: Dados para o Gráfico de Barras (Prioridades)
  const highPriorityCount = tasks.filter((t) => t.priority === "high").length;
  const mediumPriorityCount = tasks.filter(
    (t) => t.priority === "medium"
  ).length;
  const lowPriorityCount = tasks.filter((t) => t.priority === "low").length;

  // Calculo de altura da barra (normalizado para não estourar o gráfico)
  const getMax = () =>
    Math.max(highPriorityCount, mediumPriorityCount, lowPriorityCount, 1);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* --- PERFIL --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {userName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Nível 1 - Iniciante
          </Typography>
        </Box>
        <Avatar
          sx={{
            bgcolor: theme.palette.nexus.neonPurple,
            width: 50,
            height: 50,
          }}
        >
          {userInitials}
        </Avatar>
      </Box>

      {/* --- GRÁFICO DE BARRAS (DISTRIBUIÇÃO DE PRIORIDADE) --- */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: theme.palette.nexus.bgLight }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          DISTRIBUIÇÃO
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            height: 100,
          }}
        >
          {/* Barra Alta */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: `${(highPriorityCount / getMax()) * 100}%`,
                bgcolor: theme.palette.nexus.neonPink,
                borderRadius: 5,
                transition: "height 0.5s",
                minHeight: 4,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Alta
            </Typography>
          </Box>
          {/* Barra Média */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: `${(mediumPriorityCount / getMax()) * 100}%`,
                bgcolor: theme.palette.nexus.neonYellow,
                borderRadius: 5,
                transition: "height 0.5s",
                minHeight: 4,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Média
            </Typography>
          </Box>
          {/* Barra Baixa */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: `${(lowPriorityCount / getMax()) * 100}%`,
                bgcolor: theme.palette.nexus.neonBlue,
                borderRadius: 5,
                transition: "height 0.5s",
                minHeight: 4,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Baixa
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* --- EFICIÊNCIA (CIRCULAR) --- */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: theme.palette.nexus.bgLight }}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          EFICIÊNCIA GERAL
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={80}
              sx={{ color: theme.palette.grey[800], position: "absolute" }}
            />
            <CircularProgress
              variant="determinate"
              value={efficiency}
              size={80}
              sx={{ color: theme.palette.success.main }}
            />

            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" component="div" color="text.primary">
                {efficiency}%
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total: {stats.total}
            </Typography>
            <Typography variant="body2" color="success.main">
              Feitas: {stats.completed}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* --- AGENDA (TAREFAS PARA HOJE) --- */}
      <Paper
        elevation={3}
        sx={{ p: 3, bgcolor: theme.palette.nexus.bgLight, minHeight: 150 }}
      >
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          PARA HOJE 📅
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {todaysTasks.length === 0 ? (
            <Typography
              variant="caption"
              color="text.secondary"
              fontStyle="italic"
            >
              Nada agendado para hoje.
            </Typography>
          ) : (
            todaysTasks.map((task) => (
              <Box
                key={task.id}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color={theme.palette.nexus.neonPurple}
                >
                  HOJE
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    flexGrow: 1,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderLeft: `3px solid`,
                    borderColor: task.completed
                      ? theme.palette.success.main
                      : theme.palette.nexus.neonBlue,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default RightDashboard;
