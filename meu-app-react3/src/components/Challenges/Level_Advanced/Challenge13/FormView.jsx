import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Fade,
  Stack,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  Send,
  CleaningServices,
  AssignmentInd,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Importando nosso Hook Poderoso
import { useForm } from "../../../../hooks/Challenge13/useForm";

// --- PALETA EARTH ---
const theme = {
  bg: "#000000",
  card: "#F2E9D0",
  primary: "#BB5A5A", // Marrom Avermelhado
  accent: "#E79E85", // Salmão
  textDark: "#2C1A1D",
  textLight: "#F2E9D0",
};

const FormView = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  // --- CONFIGURAÇÃO DO HOOK ---
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isValid,
  } = useForm({
    initialValues: {
      name: "",
      email: "",
      age: "",
      role: "",
    },
    // Função de Validação (Regras de Negócio)
    validate: (vals) => {
      const errs = {};

      if (!vals.name) errs.name = "O nome é obrigatório.";
      else if (vals.name.length < 3) errs.name = "Nome muito curto.";

      if (!vals.email) errs.email = "Email é obrigatório.";
      else if (!/\S+@\S+\.\S+/.test(vals.email)) errs.email = "Email inválido.";

      if (!vals.age) errs.age = "Idade obrigatória.";
      else if (Number(vals.age) < 18) errs.age = "Apenas maiores de 18 anos.";

      if (!vals.role) errs.role = "Cargo é obrigatório.";

      return errs;
    },
    // Função de Envio
    onSubmit: (vals) => {
      console.log("DADOS ENVIADOS:", vals);
      setSuccessMessage("Cadastro realizado com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
      reset();
    },
  });

  // Estilo customizado para os Inputs (MUI)
  const inputSx = {
    "& label.Mui-focused": { color: theme.primary },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: theme.accent },
      "&.Mui-focused fieldset": { borderColor: theme.primary },
    },
    mb: 2,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.bg,
        p: 4,
        color: theme.textLight,
      }}
    >
      {/* HEADER */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ color: theme.card, mb: 4 }}
      >
        VOLTAR
      </Button>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: theme.card,
              borderRadius: 4,
              color: theme.textDark,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <Box
                sx={{
                  bgcolor: theme.primary,
                  p: 1.5,
                  borderRadius: 2,
                  color: "#fff",
                }}
              >
                <AssignmentInd sx={{ fontSize: 30 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="900">
                  CADASTRO DE FUNCIONÁRIO
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Validação em tempo real com Custom Hook
                </Typography>
              </Box>
            </Box>

            {successMessage && (
              <Fade in={true}>
                <Alert severity="success" sx={{ mb: 3, fontWeight: "bold" }}>
                  {successMessage}
                </Alert>
              </Fade>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* NOME */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // A mágica do Touched: Só mostra erro se o usuário já mexeu no campo
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={inputSx}
                  />
                </Grid>

                {/* EMAIL */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Email Corporativo"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={inputSx}
                  />
                </Grid>

                {/* IDADE */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Idade"
                    name="age"
                    type="number"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                    sx={inputSx}
                  />
                </Grid>

                {/* CARGO */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cargo Pretendido"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                    sx={inputSx}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={reset}
                  startIcon={<CleaningServices />}
                  sx={{ color: theme.textDark, borderColor: theme.textDark }}
                >
                  LIMPAR
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<Send />}
                  disabled={!isValid && Object.keys(touched).length > 0} // Opcional: Bloquear botão
                  sx={{
                    bgcolor: theme.primary,
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#8a3f3f" },
                  }}
                >
                  CADASTRAR
                </Button>
              </Stack>
            </form>

            {/* DEBUGGER: PARA VOCÊ ENTENDER O QUE ESTÁ ACONTECENDO */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                bgcolor: "#eee",
                borderRadius: 2,
                fontSize: "0.8rem",
                fontFamily: "monospace",
              }}
            >
              <Typography fontWeight="bold" color="error">
                Estado do Hook (Debug):
              </Typography>
              <pre>
                {JSON.stringify({ values, errors, touched, isValid }, null, 2)}
              </pre>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormView;
