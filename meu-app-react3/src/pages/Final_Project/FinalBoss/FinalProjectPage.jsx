import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Add,
  Dashboard,
  Notifications,
  LightMode,
  DarkMode,
  Edit,
  CheckCircle,
  Delete,
  Info,
  Warning,
} from "@mui/icons-material";

import { useTaskForm } from "../../../hooks/Final_Project/useTaskForm";
import { useTasks } from "../../../contexts/Final_Project/useTasks";
import { useTheme as useNexusTheme } from "../../../contexts/Final_Project/ThemeContext";
import { useNotification } from "../../../contexts/Final_Project/NotificationContext";

// Seus componentes
import TasksFilters from "../../../components/Challenges/Final_Project/FinalBoss/TaskFilters";
import TaskItem from "../../../components/Challenges/Final_Project/FinalBoss/TaskItem";
import SearchBar from "../../../components/Challenges/Final_Project/FinalBoss/SearchBar";
import RightDashboard from "../../../components/Challenges/Final_Project/FinalBoss/RightDashboard";

const FinalProjectPage = () => {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Estado para o Menu de Notificações
  const [anchorEl, setAnchorEl] = useState(null);
  const openNotifications = Boolean(anchorEl);

  const muiTheme = useTheme();
  const { toggleTheme, mode } = useNexusTheme();
  const { addTask, updateTask, tasks, sortBy, setSortBy } = useTasks(search);
  const { addNotification, notifications, clearNotifications } =
    useNotification();

  // --- HANDLERS DE NOTIFICAÇÃO --
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };
  const handleClearNotifications = () => {
    clearNotifications();
    handleNotificationClose();
  };

  // --- LÓGICA DO FORMULÁRIO ---
  const handleFormSubmit = (data) => {
    if (editingId) {
      updateTask(editingId, data);
      addNotification(`Tarefa "${data.title}" atualizada`, "info");
      setEditingId(null);
    } else {
      addTask(data);
      addNotification(`Nova tarefa criada: ${data.title}`, "success");
    }
  };

  const { values, errors, handleChange, handleSubmit, setValues, reset } =
    useTaskForm(handleFormSubmit);

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setValues({
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate || "",
    });
    // Rola suave para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset();
  };

  // Ícone dinâmico para a notificação
  const getIconByType = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle fontSize="small" color="success" />;
      case "error":
        return <Delete fontSize="small" color="error" />;
      default:
        return <Info fontSize="small" color="info" />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 5,
        bgcolor: "background.default",
        transition: "0.3s",
      }}
    >
      {/* Container "fluid" para ocupar bem a tela */}
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              sx={{ letterSpacing: 1.5, textTransform: "uppercase" }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: muiTheme.palette.text.primary, letterSpacing: -1 }}
            >
              Nexus Manager
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* BOTÃO DE NOTIFICAÇÕES (SINO) */}
            <IconButton onClick={handleNotificationClick} color="inherit">
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* MENU DE NOTIFICAÇÕES (DROPDOWN) */}
            <Menu
              anchorEl={anchorEl}
              open={openNotifications}
              onClose={handleNotificationClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  width: 320,
                  maxHeight: 400,
                  overflowY: "auto",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight={700}>Notificações</Typography>
                {notifications.length > 0 && (
                  <Button size="small" onClick={handleClearNotifications}>
                    Limpar
                  </Button>
                )}
              </Box>
              <Divider />

              {notifications.length === 0 ? (
                <MenuItem disabled>
                  <ListItemText primary="Nenhuma notificação recente" />
                </MenuItem>
              ) : (
                notifications.map((note) => (
                  <MenuItem key={note.id} onClick={handleNotificationClose}>
                    <ListItemIcon>{getIconByType(note.type)}</ListItemIcon>
                    <ListItemText
                      primary={note.message}
                      secondary={
                        note.type === "success" ? "Sucesso" : "Atualização"
                      }
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{ variant: "caption" }}
                    />
                  </MenuItem>
                ))
              )}
            </Menu>

            {/* BOTÃO DE TEMA */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: muiTheme.palette.background.paper,
                color: mode === "dark" ? "#FFD700" : "#FF8C00",
                boxShadow: 2,
                "&:hover": { bgcolor: muiTheme.palette.background.default },
              }}
            >
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Box>

        {/* LAYOUT GRID RESPONSIVO */}
        {/* xs=12 (Mobile), md=8 (Tablet), lg=9 (Desktop) -> Deixa a lista larga */}
        <Grid container spacing={4}>
          {/* === COLUNA ESQUERDA: LISTA === */}
          <Grid item xs={12} md={8} lg={9}>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <SearchBar value={search} onChange={setSearch} />
              </Box>
              <TasksFilters />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Dashboard fontSize="small" />{" "}
                {editingId ? "Modo Edição" : "Suas Tarefas"}
              </Typography>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: muiTheme.palette.background.paper,
                  color: muiTheme.palette.text.primary,
                  cursor: "pointer",
                  outline: "none",
                  fontWeight: 600,
                  boxShadow: muiTheme.shadows[1],
                }}
              >
                <option value="createdAt">Recentes</option>
                <option value="priority">Prioridade</option>
                <option value="dueDate">Prazo</option>
              </select>
            </Box>

            {tasks.length === 0 ? (
              <Paper
                sx={{
                  p: 5,
                  textAlign: "center",
                  bgcolor: "transparent",
                  boxShadow: "none",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Nenhuma tarefa pendente.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {tasks.map((task) => (
                  <Grid item xs={12} sm={6} key={task.id}>
                    <TaskItem task={task} onEdit={handleEditClick} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          {/* === COLUNA DIREITA: SIDEBAR === */}
          {/* xs=12 (Mobile: vai pra baixo), md=4, lg=3 (Desktop: Lateral) */}
          <Grid item xs={12} md={4} lg={3}>
            {/* WRAPPER FIXO (STICKY) */}
            {/* A Box garante que o conteúdo fique fixo enquanto rola a lista da esquerda */}
            <Box sx={{ position: "sticky", top: 24, zIndex: 10 }}>
              {/* FORMULÁRIO */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  border: editingId
                    ? `2px solid ${muiTheme.palette.primary.main}`
                    : "none",
                  boxShadow: muiTheme.shadows[3],
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: editingId
                      ? muiTheme.palette.primary.main
                      : "text.primary",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {editingId ? (
                    <>
                      <Edit /> EDITAR
                    </>
                  ) : (
                    <>
                      <Add /> NOVA TAREFA
                    </>
                  )}
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight={700} ml={1}>
                        Título
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Título da tarefa..."
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        error={!!errors.title}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight={700} ml={1}>
                        Prioridade
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        name="priority"
                        value={values.priority}
                        onChange={handleChange}
                        SelectProps={{ native: true }}
                      >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" fontWeight={700} ml={1}>
                        Data
                      </Typography>
                      <TextField
                        type="date"
                        name="dueDate"
                        fullWidth
                        value={values.dueDate}
                        onChange={handleChange}
                        sx={{
                          "& input": { color: muiTheme.palette.text.primary },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", gap: 1, mt: 1 }}>
                      {editingId && (
                        <Button
                          variant="text"
                          fullWidth
                          onClick={handleCancelEdit}
                          color="inherit"
                        >
                          Cancelar
                        </Button>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          bgcolor: editingId
                            ? muiTheme.palette.nexus.neonBlue
                            : muiTheme.palette.primary.main,
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {editingId ? "SALVAR" : "CRIAR"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>

              {/* DASHBOARD (Também fica fixo pois está dentro do Box Sticky) */}
              <RightDashboard />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FinalProjectPage;
