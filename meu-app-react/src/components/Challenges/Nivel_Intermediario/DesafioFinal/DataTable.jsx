import React from "react";
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
  Box,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MoreHoriz, CheckCircle, AccessTime, Block } from "@mui/icons-material";

// --- SEUS DADOS ORIGINAIS ---
const tableData = [
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
    role: "Editor",
    status: "active",
  },
  {
    id: 3,
    name: "Carla Lima",
    email: "carla@email.com",
    role: "User",
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

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": { border: 0 },
  transition: "0.2s",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.02)" },
}));

const DataTable = () => {
  // Helper para cores de status no estilo Neon
  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return {
          color: "#10b981",
          bg: "rgba(16, 185, 129, 0.1)",
          label: "Ativo",
        };
      case "pending":
        return {
          color: "#f59e0b",
          bg: "rgba(245, 158, 11, 0.1)",
          label: "Pendente",
        };
      case "inactive":
        return {
          color: "#ef4444",
          bg: "rgba(239, 68, 68, 0.1)",
          label: "Inativo",
        };
      default:
        return { color: "#71717a", bg: "#27272a", label: status };
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "#151519",
        border: "1px solid #27272a",
        borderRadius: 4,
        p: 2,
      }}
    >
      {/* Header da Tabela */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="caption" color="textSecondary">
            Última atualização: Hoje, 14:30
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              Usuários Recentes
            </Typography>
            <Chip
              label={tableData.length}
              size="small"
              sx={{ bgcolor: "#27272a", color: "#fff", fontWeight: "bold" }}
            />
          </Box>
        </Box>
        <Box>
          <IconButton size="small" sx={{ color: "#9ca3af" }}>
            <MoreHoriz />
          </IconButton>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "#9ca3af", borderBottom: "1px solid #27272a" }}
            >
              Usuário
            </TableCell>
            <TableCell
              sx={{ color: "#9ca3af", borderBottom: "1px solid #27272a" }}
            >
              Cargo
            </TableCell>
            <TableCell
              sx={{ color: "#9ca3af", borderBottom: "1px solid #27272a" }}
            >
              Status
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "#9ca3af", borderBottom: "1px solid #27272a" }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => {
            const statusStyle = getStatusStyle(row.status);
            return (
              <StyledTableRow key={row.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#27272a",
                        color: "#fff",
                        fontSize: 12,
                      }}
                    >
                      {row.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold" fontSize={14}>
                        {row.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {row.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Chip
                    label={row.role}
                    size="small"
                    sx={{
                      bgcolor: "transparent",
                      border: "1px solid #3f3f46",
                      color: "#e4e4e7",
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={statusStyle.label}
                    size="small"
                    sx={{
                      bgcolor: statusStyle.bg,
                      color: statusStyle.color,
                      fontWeight: "bold",
                      border: "none",
                      height: 24,
                    }}
                  />
                </TableCell>

                <TableCell align="right">
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: "#a1a1aa", "&:hover": { color: "#fff" } }}
                  >
                    Editar
                  </Button>
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
