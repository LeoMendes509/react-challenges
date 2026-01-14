import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  ArrowBack,
  Search,
  Person,
  AttachMoney,
  Cake,
  Badge,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// 1. Importando o Hook
import { useUsers } from "../../../../hooks/Challenge10/useUsers";

// 2. Importando os Helpers
import {
  formatCPF,
  formatCurrency,
} from "../../../../helpers/Challenge10/formatHelpers";
import { capitalize } from "../../../../helpers/Challenge10/stringHelpers";
import { calculateAge } from "../../../../helpers/Challenge10/dateHelpers";

const colors = {
  bg: "#000000",
  gold: "#F4DFC8",
  cream: "#F4EAE0",
  white: "#FAF6F0",
  surface: "#0A0A0A",
};

const UserListView = () => {
  const navigate = useNavigate();

  // O componente só pede os dados pro Hook
  const { users, loading, filter, setFilter } = useUsers();

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: colors.white,
      "& fieldset": { borderColor: colors.gold },
      "&:hover fieldset": { borderColor: colors.gold },
      "&.Mui-focused fieldset": { borderColor: colors.gold },
    },
    "& .MuiInputLabel-root": { color: colors.cream },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ alignSelf: "flex-start", color: colors.gold, mb: 4 }}
      >
        VOLTAR
      </Button>

      <Typography
        variant="h4"
        sx={{ color: colors.gold, fontWeight: "bold", mb: 1 }}
      >
        LISTA DE USUÁRIOS
      </Typography>
      <Typography sx={{ color: colors.cream, mb: 4, opacity: 0.8 }}>
        Arquitetura Limpa: Helpers vs Hooks
      </Typography>

      <Box sx={{ maxWidth: 600, width: "100%" }}>
        {/* INPUT DE FILTRO */}
        <Paper
          sx={{
            p: 2,
            bgcolor: colors.surface,
            border: `1px solid ${colors.gold}`,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Filtrar por nome..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: colors.gold }} />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* LISTA */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: colors.gold }} />
          </Box>
        ) : (
          <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {users.map((user) => (
              <Paper
                key={user.id}
                sx={{
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid #333",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: colors.gold,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: colors.gold, color: colors.bg }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="h6" color={colors.white}>
                        {/* USANDO O HELPER CAPITALIZE */}
                        {capitalize(user.name)}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Badge sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color={colors.cream}>
                            {/* USANDO HELPER CPF */}
                            {formatCPF(user.cpf)}
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Cake sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color={colors.cream}>
                            {/* USANDO HELPER DATE */}
                            {calculateAge(user.birthDate)} anos
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AttachMoney
                            sx={{ fontSize: 16, color: colors.gold }}
                          />
                          <Typography
                            variant="body2"
                            color={colors.gold}
                            fontWeight="bold"
                          >
                            {/* USANDO HELPER CURRENCY */}
                            {formatCurrency(user.salary)}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}

            {users.length === 0 && (
              <Typography textAlign="center" color="gray">
                Nenhum usuário encontrado.
              </Typography>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default UserListView;
