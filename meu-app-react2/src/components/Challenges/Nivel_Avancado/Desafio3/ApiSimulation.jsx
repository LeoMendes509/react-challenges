import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  RiRefreshLine,
  RiUserLine,
  RiErrorWarningLine,
  RiWifiOffLine,
} from "react-icons/ri";

// --- 1. SIMULAÇÃO DA API (Fake API) ---
const fakeApi = {
  getUsers: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.3; // 30% de chance de erro
        if (shouldFail) {
          reject(new Error("Falha na conexão com o servidor."));
        } else {
          resolve([
            {
              id: 1,
              name: "Lucas Silva",
              email: "lucas.dev@email.com",
              role: "Frontend",
            },
            {
              id: 2,
              name: "Maria Souza",
              email: "maria.ui@email.com",
              role: "Designer",
            },
            {
              id: 3,
              name: "João Santos",
              email: "joao.back@email.com",
              role: "Backend",
            },
            {
              id: 4,
              name: "Ana Pereira",
              email: "ana.qa@email.com",
              role: "QA Engineer",
            },
          ]);
        }
      }, 1500); // 1.5s de delay
    }),
};

// --- 2. SUB-COMPONENTES REUTILIZÁVEIS ---

// Componente de Carregamento
const LoadingState = () => (
  <Box sx={styles.centerBox}>
    <CircularProgress size={50} sx={{ color: "#D4C9BE" }} />
    <Typography sx={{ mt: 2, color: "#D4C9BE", opacity: 0.7 }}>
      Buscando dados no servidor...
    </Typography>
  </Box>
);

// Componente de Erro
const ErrorState = ({ message, onRetry }) => (
  <Box sx={styles.centerBox}>
    <RiWifiOffLine size={60} color="#D4C9BE" />
    <Typography
      variant="h6"
      sx={{ color: "#F1EFEC", mt: 2, textAlign: "center" }}
    >
      Ops! Algo deu errado.
    </Typography>
    <Typography variant="body2" sx={{ color: "#D4C9BE", opacity: 0.6, mb: 3 }}>
      {message}
    </Typography>
    <Button
      variant="outlined"
      onClick={onRetry}
      startIcon={<RiRefreshLine />}
      sx={styles.btnRetry}
    >
      Tentar Novamente
    </Button>
  </Box>
);

// --- 3. COMPONENTE PRINCIPAL ---
const ApiSimulation = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função que faz a chamada
  const fetchUsers = async () => {
    setLoading(true);
    setError(null); // Limpa erros anteriores

    try {
      const data = await fakeApi.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Sempre roda, dando erro ou sucesso
    }
  };

  // useEffect com array vazio = Roda apenas na montagem (mount)
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Paper elevation={12} sx={styles.paper}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography variant="h6" sx={{ color: "#F1EFEC", fontWeight: "bold" }}>
          Equipe de Projetos
        </Typography>
        <Typography variant="caption" sx={{ color: "#D4C9BE" }}>
          Status: {loading ? "Sincronizando..." : error ? "Offline" : "Online"}
        </Typography>
      </Box>

      {/* Renderização Condicional */}
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchUsers} />
        ) : (
          <List sx={{ width: "100%" }}>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <ListItem sx={styles.listItem}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#F1EFEC", color: "#123458" }}>
                      <RiUserLine />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: "#F1EFEC", fontWeight: "bold" }}>
                        {user.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ color: "#D4C9BE" }}>
                        {user.role} • {user.email}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < users.length - 1 && (
                  <Divider sx={{ bgcolor: "rgba(212, 201, 190, 0.1)" }} />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default ApiSimulation;

// --- 4. ESTILOS (PALETA DEEP NAVY) ---
// #030303 (Fundo Global - Usado no CSS)
// #123458 (Azul Profundo - Card)
// #D4C9BE (Bege/Platinum - Detalhes)
// #F1EFEC (Branco Sujo - Texto Principal)

const styles = {
  paper: {
    maxWidth: 500,
    width: "100%",
    bgcolor: "#123458", // Azul Profundo
    borderRadius: 4,
    overflow: "hidden", // Para o header não vazar borda
    border: "1px solid #1c4b78",
  },
  header: {
    bgcolor: "rgba(0, 0, 0, 0.3)",
    p: 3,
    borderBottom: "1px solid rgba(212, 201, 190, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
    animation: "fadeIn 0.5s",
  },
  listItem: {
    py: 2,
    "&:hover": {
      bgcolor: "rgba(212, 201, 190, 0.05)",
      cursor: "default",
    },
  },
  btnRetry: {
    color: "#D4C9BE",
    borderColor: "#D4C9BE",
    borderRadius: 20,
    px: 4,
    "&:hover": {
      borderColor: "#F1EFEC",
      color: "#F1EFEC",
      bgcolor: "rgba(212, 201, 190, 0.1)",
    },
  },
};
