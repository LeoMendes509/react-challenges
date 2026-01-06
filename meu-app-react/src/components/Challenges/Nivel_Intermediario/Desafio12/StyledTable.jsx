import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit, Delete, CheckCircle, Warning, Block } from "@mui/icons-material";

// --- DADOS INICIAIS ---
const initialUsers = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana@email.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Bruno Costa",
    email: "bruno@email.com",
    role: "User",
    status: "active",
  },
  {
    id: 3,
    name: "Carla Lima",
    email: "carla@email.com",
    role: "Editor",
    status: "inactive",
  },
  {
    id: 4,
    name: "Diego Santos",
    email: "diego@email.com",
    role: "User",
    status: "pending",
  },
  {
    id: 5,
    name: "Elena Souza",
    email: "elena@email.com",
    role: "Admin",
    status: "active",
  },
];

// --- ESTILIZAÇÃO (Mantendo a sua paleta) ---
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${"MuiTableCell-head"}`]: {
    backgroundColor: "#854836", // Marrom
    color: "#F7F7F7",
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${"MuiTableCell-body"}`]: {
    fontSize: 14,
    color: "#000000",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": { backgroundColor: "#F7F7F7" },
  "&:hover": {
    backgroundColor: "rgba(255, 178, 44, 0.3) !important", // Amarelo Hover
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  "&:last-child td, &:last-child th": { border: 0 },
}));

const StyledTable = () => {
  // 1. ESTADO DOS DADOS (A lista que pode mudar)
  const [rows, setRows] = useState(initialUsers);

  // 2. ESTADOS DO MODAL DE EDIÇÃO
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // O utilizador que está a ser editado

  // --- LÓGICA DE ELIMINAR ---
  const handleDelete = (id) => {
    // Pergunta de segurança simples
    if (window.confirm("Tem a certeza que deseja eliminar este utilizador?")) {
      // Cria uma nova lista SEM o utilizador do ID clicado
      const newRows = rows.filter((user) => user.id !== id);
      setRows(newRows);
    }
  };

  // --- LÓGICA DE ABRIR EDIÇÃO ---
  const handleEditClick = (user) => {
    setCurrentUser(user); // Guarda quem vamos editar
    setOpen(true); // Abre a janela
  };

  // --- LÓGICA DE SALVAR EDIÇÃO ---
  const handleSave = () => {
    // Percorre a lista e substitui o antigo pelo novo (currentUser)
    const updatedRows = rows.map((item) =>
      item.id === currentUser.id ? currentUser : item
    );
    setRows(updatedRows);
    setOpen(false); // Fecha a janela
  };

  // --- FUNÇÃO AUXILIAR PARA INPUTS ---
  // Atualiza o estado currentUser conforme a pessoa digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Função de cores (igual anterior)
  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return {
          bg: "#e6fffa",
          color: "#1a7f37",
          icon: <CheckCircle fontSize="small" />,
        };
      case "pending":
        return {
          bg: "#fff7ed",
          color: "#c2410c",
          icon: <Warning fontSize="small" />,
        };
      case "inactive":
        return {
          bg: "#f1f5f9",
          color: "#64748b",
          icon: <Block fontSize="small" />,
        };
      default:
        return { bg: "#eee", color: "#000" };
    }
  };

  return (
    <>
      {/* --- A TABELA --- */}
      <TableContainer component={Paper} elevation={5} sx={{ borderRadius: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="center">Cargo</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const style = getStatusStyle(row.status);
              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>

                  <StyledTableCell align="center">{row.role}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Chip
                      icon={style.icon}
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: style.bg,
                        color: style.color,
                        fontWeight: "bold",
                        border: `1px solid ${style.color}`,
                        textTransform: "capitalize",
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {/* BOTÃO EDITAR: Agora chama handleEditClick */}
                    <Tooltip title="Editar">
                      <IconButton
                        onClick={() => handleEditClick(row)}
                        size="small"
                        sx={{
                          color: "#FFB22C",
                          "&:hover": { bgcolor: "#fff3cd" },
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    {/* BOTÃO ELIMINAR: Agora chama handleDelete */}
                    <Tooltip title="Eliminar">
                      <IconButton
                        onClick={() => handleDelete(row.id)}
                        size="small"
                        sx={{
                          color: "#854836",
                          "&:hover": { bgcolor: "#fcebe6" },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- O MODAL DE EDIÇÃO (Dialog) --- */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ color: "#854836", fontWeight: "bold" }}>
          Editar Utilizador
        </DialogTitle>

        <DialogContent sx={{ minWidth: 400, pt: 2 }}>
          {currentUser && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <TextField
                label="Nome"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Email"
                name="email"
                value={currentUser.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              {/* Select para Cargo */}
              <FormControl fullWidth>
                <InputLabel>Cargo</InputLabel>
                <Select
                  name="role"
                  value={currentUser.role}
                  label="Cargo"
                  onChange={handleChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                </Select>
              </FormControl>

              {/* Select para Status */}
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={currentUser.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#666" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: "#FFB22C",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#e09b1f" },
            }}
          >
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StyledTable;
