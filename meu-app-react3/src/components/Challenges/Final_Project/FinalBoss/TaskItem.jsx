import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Chip,
  Checkbox,
  useTheme,
} from "@mui/material";
import { Delete, CalendarToday, Edit } from "@mui/icons-material";

// Imports da arquitetura
import { useTasks } from "../../../../contexts/Final_Project/useTasks";
import { useNotification } from "../../../../contexts/Final_Project/NotificationContext";
import {
  formatDate,
  isOverdue,
} from "../../../../helpers/Final_Project/dateHelpers";
import { priorityColorsMap } from "../../../../styles/nexusTheme";

// Recebemos a prop 'onEdit' da página principal
const TaskItem = ({ task, onEdit }) => {
  const theme = useTheme();
  const { toggleComplete, deleteTask } = useTasks();
  const { addNotification } = useNotification();

  const neonColor = priorityColorsMap[task.priority];

  const handleDelete = () => {
    deleteTask(task.id);
    addNotification("Tarefa deletada com sucesso.", "error"); // Notificação de Delete
  };

  const handleToggle = () => {
    toggleComplete(task.id);
    if (!task.completed) addNotification("Tarefa concluída! 🎉", "success");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2.5,
        mb: 2.5,
        position: "relative",
        overflow: "hidden",
        transition: "0.3s",
        opacity: task.completed ? 0.6 : 1,
        borderLeft: `4px solid ${neonColor}`, // Detalhe visual extra
        "&:hover": {
          boxShadow: `0px 8px 25px -5px ${neonColor}40`,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={task.completed}
            onChange={handleToggle}
            sx={{
              color: theme.palette.text.secondary,
              "&.Mui-checked": { color: neonColor },
              p: 0,
              mr: 1.5,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1.05rem",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </Typography>
        </Box>

        {/* BOTÃO DE EDITAR (LÁPIS) */}
        <IconButton
          size="small"
          onClick={() => onEdit(task)} // Chama a função passando a tarefa
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Box>

      {/* Tags e Datas */}
      <Box
        sx={{
          pl: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          label={task.priority}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.65rem",
            fontWeight: 700,
            bgcolor: `${neonColor}20`,
            color: neonColor,
            border: `1px solid ${neonColor}40`,
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {task.dueDate && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <CalendarToday sx={{ fontSize: 12 }} /> {formatDate(task.dueDate)}
            </Typography>
          )}
          <IconButton onClick={handleDelete} size="small" color="error">
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskItem;
