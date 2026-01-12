import React, { useState, useMemo } from "react";
import { useEmployeeSystem } from "../../../hooks/useEmployeeSystem";
import EmployeeWizard from "../../../components/Challenges/Desafio_Final/Final_Boss/EmployeeWizard";
import "../Styles/DesafioFinal.css";

import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  Paper,
  Grid,
  IconButton,
  Chip,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  RiAddLine,
  RiSearchLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiUserStarLine,
  RiGroupLine,
  RiBuildingLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

const FinalBoss = () => {
  // Lógica do Hook
  const { employees, loading, addEmployee, editEmployee, deleteEmployee } =
    useEmployeeSystem();

  // Estados de Interface
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("Todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  // --- CÁLCULOS EM TEMPO REAL (DASHBOARD) ---
  const totalEmployees = employees.length;

  // Cria um Set para contar departamentos únicos
  const uniqueDepartments = [...new Set(employees.map((emp) => emp.department))]
    .length;

  // Calcula média salarial
  const totalSalary = employees.reduce(
    (acc, emp) => acc + Number(emp.salary),
    0
  );
  const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;

  // Filtro Inteligente
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchName = emp.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchDept = deptFilter === "Todos" || emp.department === deptFilter;
      return matchName && matchDept;
    });
  }, [employees, searchTerm, deptFilter]);

  // Ações do Modal
  const openAdd = () => {
    setEditingEmp(null);
    setModalOpen(true);
  };
  const openEdit = (emp) => {
    setEditingEmp(emp);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    if (editingEmp) {
      await editEmployee(editingEmp.id, data);
    } else {
      await addEmployee(data);
    }
    setModalOpen(false);
  };

  return (
    <div className="boss-container">
      {/* --- SIDEBAR LATERAL ESQUERDA --- */}
      <aside
        className="boss-sidebar"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div className="boss-logo" style={{ marginBottom: "10px" }}>
          DPOnet System
        </div>

        {/* NOVA SEÇÃO: ESTATÍSTICAS NO SIDEBAR */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="caption"
            sx={{ color: "#808191", fontWeight: "bold", letterSpacing: "1px" }}
          >
            VISÃO GERAL
          </Typography>

          {/* Barra 1: Funcionários */}
          <Box sx={styles.sidebarStatCard}>
            <Box
              sx={{
                ...styles.iconBox,
                bgcolor: "rgba(108, 93, 211, 0.2)",
                color: "#6C5DD3",
              }}
            >
              <RiGroupLine size={20} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold", lineHeight: 1 }}
              >
                {totalEmployees}
              </Typography>
              <Typography variant="caption" sx={{ color: "#808191" }}>
                Funcionários
              </Typography>
            </Box>
          </Box>

          {/* Barra 2: Departamentos */}
          <Box sx={styles.sidebarStatCard}>
            <Box
              sx={{
                ...styles.iconBox,
                bgcolor: "rgba(61, 217, 179, 0.2)",
                color: "#3DD9B3",
              }}
            >
              <RiBuildingLine size={20} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold", lineHeight: 1 }}
              >
                {uniqueDepartments}
              </Typography>
              <Typography variant="caption" sx={{ color: "#808191" }}>
                Departamentos
              </Typography>
            </Box>
          </Box>

          {/* Barra 3: Média Salarial */}
          <Box sx={styles.sidebarStatCard}>
            <Box
              sx={{
                ...styles.iconBox,
                bgcolor: "rgba(255, 211, 105, 0.2)",
                color: "#FFD369",
              }}
            >
              <RiMoneyDollarCircleLine size={20} />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: "bold", lineHeight: 1 }}
              >
                {avgSalary.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                })}
              </Typography>
              <Typography variant="caption" sx={{ color: "#808191" }}>
                Média Salarial
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 1 }} />

        <div className="boss-menu-item active">
          <RiUserStarLine /> Gestão de Pessoas
        </div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="boss-content">
        <header className="boss-header">
          <div>
            <h1>Gestão de Talentos</h1>
            <p>Admin Dashboard</p>
          </div>
          <Button
            variant="contained"
            startIcon={<RiAddLine />}
            onClick={openAdd}
            sx={{
              bgcolor: "#6C5DD3",
              "&:hover": { bgcolor: "#5a4cb5" },
              py: 1.5,
              px: 3,
              borderRadius: 3,
            }}
          >
            Novo Cadastro
          </Button>
        </header>

        {/* Barra de Filtros */}
        <section className="boss-filters">
          <TextField
            placeholder="Buscar por nome..."
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={styles.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiSearchLine color="#808191" />
                </InputAdornment>
              ),
            }}
          />
          <div className="boss-chips">
            {["Todos", "TI", "RH", "FIN"].map((dept) => (
              <Chip
                key={dept}
                label={dept}
                clickable
                onClick={() => setDeptFilter(dept)}
                sx={{
                  bgcolor: deptFilter === dept ? "#6C5DD3" : "#1F2128",
                  color: "#fff",
                  fontWeight: deptFilter === dept ? "bold" : "normal",
                  border: deptFilter === dept ? "none" : "1px solid #2F3349",
                }}
              />
            ))}
          </div>
        </section>

        {/* Grid de Cards */}
        <Grid container spacing={3}>
          {loading && !modalOpen ? (
            <Typography
              sx={{ color: "#fff", p: 3, width: "100%", textAlign: "center" }}
            >
              Sincronizando dados...
            </Typography>
          ) : filteredEmployees.length === 0 ? (
            <Typography
              sx={{
                color: "#808191",
                p: 3,
                width: "100%",
                textAlign: "center",
              }}
            >
              Nenhum registro encontrado.
            </Typography>
          ) : (
            filteredEmployees.map((emp) => (
              <Grid item xs={12} md={6} lg={4} key={emp.id}>
                <Paper className="boss-card" elevation={0}>
                  <div className="card-top">
                    <div className="card-avatar">{emp.name.charAt(0)}</div>
                    <div>
                      <h3>{emp.name}</h3>
                      <span>{emp.position}</span>
                    </div>
                  </div>
                  <div className="card-info">
                    <p>
                      Dept:{" "}
                      <strong style={{ color: "#3DD9B3" }}>
                        {emp.department}
                      </strong>
                    </p>
                    <p>
                      Salário: R$ {Number(emp.salary).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="card-actions">
                    <Button
                      startIcon={<RiPencilLine />}
                      onClick={() => openEdit(emp)}
                      sx={{ color: "#808191" }}
                    >
                      Editar
                    </Button>
                    <IconButton
                      onClick={() => deleteEmployee(emp.id)}
                      sx={{ color: "#E95D5D" }}
                    >
                      <RiDeleteBinLine />
                    </IconButton>
                  </div>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </main>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={styles.modalBox}>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              mb: 3,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {editingEmp ? "Editar Dados" : "Novo Funcionário"}
          </Typography>

          <EmployeeWizard
            initialData={editingEmp}
            onFinish={handleSave}
            onCancel={() => setModalOpen(false)}
            loading={loading}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default FinalBoss;

// --- ESTILOS DO DASHBOARD E COMPONENTES ---
const styles = {
  searchField: {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#1F2128",
      color: "#fff",
      borderRadius: 3,
      "& fieldset": { border: "1px solid #2F3349" },
      "&:hover fieldset": { borderColor: "#6C5DD3" },
      "&.Mui-focused fieldset": { borderColor: "#6C5DD3" },
    },
    minWidth: "300px",
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "#1F2128",
    border: "1px solid #2F3349",
    borderRadius: 4,
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    p: 4,
    outline: "none",
  },
  // Estilo das Barras da Sidebar
  sidebarStatCard: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: 2,
    bgcolor: "#272B34", // Um tom ligeiramente mais claro que o fundo da sidebar
    borderRadius: 3,
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      bgcolor: "#2D323E",
    },
  },
  // Estilo do quadrado do ícone
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
