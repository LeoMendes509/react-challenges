import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import {
  ArrowBack,
  Lock,
  Edit,
  Save,
  CheckCircle,
  History,
  Visibility,
  Email,
  Work,
  Badge,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../hooks/Challenge6/useUser";

const colors = {
  bg: "#000000",
  gold: "#F4DFC8",
  cream: "#F4EAE0",
  white: "#FAF6F0",
  surface: "#0A0A0A",
  success: "#4CAF50",
};

const AuthView = () => {
  const navigate = useNavigate();
  const { user, login, logout, updateProfile, loading, error, mockList } =
    useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [prevData, setPrevData] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role || "Membro",
      });
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleUpdate = () => {
    setPrevData(user);
    updateProfile(formData);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setPrevData(null);
  };

  const autoFill = (userEmail) => {
    setEmail(userEmail);
    setPassword("123");
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: colors.white,
      "& fieldset": { borderColor: colors.gold, opacity: 0.3 },
      "&:hover fieldset": { borderColor: colors.gold, opacity: 0.8 },
      "&.Mui-focused fieldset": { borderColor: colors.gold },
    },
    "& .MuiInputLabel-root": { color: colors.cream, opacity: 0.7 },
    "& .MuiInputLabel-root.Mui-focused": { color: colors.gold },
  };

  // Componente Auxiliar para Linha de Informação
  const InfoRow = ({ icon, label, oldVal, newVal }) => (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
        {icon}
        <Typography
          variant="caption"
          color={colors.gold}
          textTransform="uppercase"
        >
          {label}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption" color="#666" display="block">
            ANTERIOR
          </Typography>
          <Typography
            variant="body2"
            color="#aaa"
            sx={{ textDecoration: "line-through" }}
          >
            {oldVal}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color={colors.success} display="block">
            NOVO
          </Typography>
          <Typography variant="body2" color={colors.white} fontWeight="bold">
            {newVal}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1, borderColor: "#333" }} />
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        display: "flex",
        p: 2,
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: 24, left: 24, color: colors.gold }}
      >
        VOLTAR
      </Button>

      <Paper
        elevation={0}
        sx={{
          bgcolor: colors.surface,
          border: `1px solid ${colors.gold}`,
          p: 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 2,
          boxShadow: `0 0 30px rgba(244, 223, 200, 0.05)`,
        }}
      >
        {!user ? (
          // === LOGIN ===
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Lock sx={{ fontSize: 40, color: colors.gold, mb: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: colors.white, fontWeight: "bold" }}
              >
                ACESSO RESTRITO
              </Typography>
            </Box>
            {error && (
              <Alert
                severity="error"
                sx={{
                  bgcolor: "rgba(211, 47, 47, 0.1)",
                  color: "#ffcdd2",
                  border: "1px solid #ef5350",
                }}
              >
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textFieldStyles}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: colors.gold,
                color: colors.bg,
                fontWeight: "bold",
                py: 1.5,
                "&:hover": { bgcolor: colors.cream },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "ENTRAR"
              )}
            </Button>
          </Box>
        ) : showSuccess ? (
          // === RELATÓRIO DETALHADO (COMPARADOR) ===
          <Box sx={{ animation: "fadeIn 0.5s ease" }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <CheckCircle
                sx={{ fontSize: 50, color: colors.success, mb: 1 }}
              />
              <Typography variant="h6" color={colors.white}>
                Atualização Concluída
              </Typography>
            </Box>

            {/* Lista Detalhada de Mudanças */}
            <InfoRow
              icon={<Badge sx={{ fontSize: 18, color: colors.gold }} />}
              label="Nome"
              oldVal={prevData?.name}
              newVal={user.name}
            />
            <InfoRow
              icon={<Work sx={{ fontSize: 18, color: colors.gold }} />}
              label="Cargo"
              oldVal={prevData?.role}
              newVal={user.role}
            />
            <InfoRow
              icon={<Email sx={{ fontSize: 18, color: colors.gold }} />}
              label="E-mail"
              oldVal={prevData?.email}
              newVal={user.email}
            />

            <Button
              fullWidth
              variant="outlined"
              onClick={closeSuccess}
              sx={{ borderColor: colors.gold, color: colors.gold, mt: 2 }}
            >
              FECHAR E VOLTAR AO PERFIL
            </Button>
          </Box>
        ) : (
          // === EDIÇÃO DE PERFIL ===
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                src={user.avatar}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  border: `2px solid ${colors.gold}`,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: colors.gold,
                  borderRadius: "50%",
                  p: 0.5,
                }}
              >
                <Edit sx={{ fontSize: 16, color: colors.bg }} />
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{ mt: 2, color: colors.white, fontWeight: "bold" }}
            >
              EDITAR PERFIL
            </Typography>

            <Stack spacing={2} sx={{ mt: 3, mb: 3 }}>
              <TextField
                size="small"
                label="Nome Completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                sx={textFieldStyles}
              />
              <TextField
                size="small"
                label="Cargo / Função"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                sx={textFieldStyles}
              />
              <TextField
                size="small"
                label="E-mail Corporativo"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                sx={textFieldStyles}
              />
            </Stack>

            <Button
              fullWidth
              variant="contained"
              startIcon={<Save />}
              onClick={handleUpdate}
              sx={{
                bgcolor: colors.gold,
                color: colors.bg,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              SALVAR ALTERAÇÕES
            </Button>
            <Button
              fullWidth
              size="small"
              onClick={logout}
              sx={{
                color: "#ef5350",
                textTransform: "lowercase",
                opacity: 0.7,
              }}
            >
              sair da conta
            </Button>
          </Box>
        )}
      </Paper>

      {/* --- LISTA LATERAL (Cheat Sheet Dinâmico) --- */}
      {/* Mostra a lista atualizada vinda do Contexto (mockList) */}
      {!user && (
        <Paper
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px dashed #333",
            p: 3,
            maxWidth: 300,
            width: "100%",
            borderRadius: 2,
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: colors.gold, fontWeight: "bold" }}
          >
            Membros (Atualizado)
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 2,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {mockList.map((u) => (
              <Box
                key={u.id}
                onClick={() => autoFill(u.email)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(244, 223, 200, 0.1)" },
                }}
              >
                <Avatar src={u.avatar} sx={{ width: 24, height: 24 }} />
                <Box>
                  {/* Se o nome mudou lá na edição, aqui já vai aparecer atualizado */}
                  <Typography
                    variant="body2"
                    sx={{ color: "#aaa", fontSize: "0.8rem" }}
                  >
                    {u.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#666", fontSize: "0.7rem" }}
                  >
                    {u.role}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AuthView;
