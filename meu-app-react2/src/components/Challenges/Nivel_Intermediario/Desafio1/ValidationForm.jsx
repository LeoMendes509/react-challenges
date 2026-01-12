import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

const ValidationForm = () => {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    idade: "",
    senha: "",
    confirmarSenha: "",
    termos: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Estado para controlar o "olhinho" da senha
  const [showPassword, setShowPassword] = useState(false);

  // --- VALIDAÇÃO (Mesma lógica) ---
  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "nome":
        if (value.length < 3) errorMsg = "Mínimo 3 letras.";
        break;
      case "email":
        if (!value.includes("@")) errorMsg = "Email inválido.";
        break;
      case "idade": {
        const num = Number(value);
        if (!value || num < 18 || num > 120) errorMsg = "18 a 120 anos.";
        break;
      }
      case "senha":
        if (value.length < 6) errorMsg = "Mínimo 6 caracteres.";
        break;
      case "confirmarSenha":
        if (value !== formData.senha) errorMsg = "Senhas não conferem.";
        break;
      case "termos":
        if (value === false) errorMsg = "Obrigatório.";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitted(true);
  };

  const isFormValid =
    Object.values(formData).every((x) => x !== "" && x !== false) &&
    Object.values(errors).every((x) => x === "");

  // --- TELA DE SUCESSO ---
  if (isSubmitted) {
    return (
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          bgcolor: "#424769", // Fundo Índigo (Cartão)
          textAlign: "center",
          borderRadius: 4,
          color: "#fff", // Texto Branco
          border: "1px solid #7077A1", // Borda sutil
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 70, color: "#F6B17A", mb: 2 }} />
        <Typography variant="h5" sx={{ color: "#F6B17A", fontWeight: "bold" }}>
          Bem-vindo!
        </Typography>
        <Typography sx={{ mt: 1, color: "#b0b6d4" }}>
          {formData.nome}, seu cadastro foi criado.
        </Typography>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outlined"
          sx={{
            mt: 3,
            color: "#F6B17A",
            borderColor: "#F6B17A",
            "&:hover": {
              borderColor: "#fff",
              color: "#fff",
              bgcolor: "rgba(246, 177, 122, 0.1)",
            },
          }}
        >
          Voltar
        </Button>
      </Paper>
    );
  }

  // --- FORMULÁRIO SPLIT SCREEN ---
  return (
    <Paper
      elevation={10}
      sx={{
        maxWidth: 900,
        width: "100%",
        display: "flex",
        overflow: "hidden",
        borderRadius: 5,
        bgcolor: "#2D3250", // Fundo Principal: Midnight Navy
        color: "#fff",
      }}
    >
      <Grid container>
        {/* LADO ESQUERDO: O FORMULÁRIO */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}
          >
            Crie sua conta
          </Typography>
          <Typography variant="body2" sx={{ color: "#7077A1", mb: 3 }}>
            Preencha seus dados para acessar a plataforma.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                name="nome"
                placeholder="Nome Completo"
                variant="outlined"
                fullWidth
                value={formData.nome}
                onChange={handleChange}
                error={!!errors.nome}
                helperText={errors.nome}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#F6B17A" }} />
                    </InputAdornment>
                  ),
                }}
                sx={roundedInputStyle}
              />

              <TextField
                name="email"
                placeholder="E-mail"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#F6B17A" }} />
                    </InputAdornment>
                  ),
                }}
                sx={roundedInputStyle}
              />

              <TextField
                name="idade"
                placeholder="Idade"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.idade}
                onChange={handleChange}
                error={!!errors.idade}
                helperText={errors.idade}
                sx={roundedInputStyle}
              />

              <TextField
                name="senha"
                placeholder="Senha"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={formData.senha}
                onChange={handleChange}
                error={!!errors.senha}
                helperText={errors.senha}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#7077A1" }} // Ícone olho cor Periwinkle
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={roundedInputStyle}
              />

              <TextField
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.confirmarSenha}
                onChange={handleChange}
                error={!!errors.confirmarSenha}
                helperText={errors.confirmarSenha}
                sx={roundedInputStyle}
              />

              {/* Checkbox de Termos */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="termos"
                    checked={formData.termos}
                    onChange={handleChange}
                    sx={{
                      color: "#7077A1", // Cor desligado
                      "&.Mui-checked": { color: "#F6B17A" }, // Cor ligado (Pêssego)
                    }}
                  />
                }
                label={
                  <Typography variant="caption" sx={{ color: "#7077A1" }}>
                    Li e concordo com os Termos & Condições
                  </Typography>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isFormValid}
                sx={{
                  bgcolor: "#F6B17A", // Botão Pêssego
                  color: "#2D3250", // Texto do botão escuro para contraste
                  borderRadius: 3,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "#ffbe8a", // Pêssego mais claro no hover
                    boxShadow: "0 0 15px rgba(246, 177, 122, 0.4)", // Efeito Glow
                  },
                  "&:disabled": { bgcolor: "#424769", color: "#7077A1" },
                }}
              >
                Criar Conta
              </Button>

              <Typography
                align="center"
                variant="caption"
                sx={{ mt: 1, color: "#7077A1" }}
              >
                Já tem uma conta?{" "}
                <span
                  style={{
                    color: "#F6B17A",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Entrar
                </span>
              </Typography>
            </Box>
          </form>
        </Grid>

        {/* LADO DIREITO: GRADIENTE DARK */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            // Gradiente diagonal do Índigo para o Navy
            background: "linear-gradient(135deg, #424769 0%, #2D3250 100%)",
            color: "#fff",
            p: 4,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Bem-vindo(a)!
          </Typography>
          <Typography variant="h6" sx={{ color: "#7077A1", maxWidth: 300 }}>
            Junte-se a nós nesta experiência noturna.
          </Typography>

          {/* Bolinhas decorativas (Glassmorphism) */}
          <Box
            sx={{
              width: 120,
              height: 120,
              bgcolor: "rgba(112, 119, 161, 0.1)", // Periwinkle transparente
              borderRadius: "50%",
              position: "absolute",
              top: 60,
              right: 60,
              backdropFilter: "blur(5px)",
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "rgba(246, 177, 122, 0.1)", // Pêssego transparente
              borderRadius: "50%",
              position: "absolute",
              bottom: 120,
              left: 60,
              backdropFilter: "blur(5px)",
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

// ESTILO DOS INPUTS (Dark Mode)
const roundedInputStyle = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#424769", // Fundo Índigo nos inputs
    borderRadius: 3,
    color: "#fff", // Texto digitado branco
    transition: "all 0.3s ease",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "#7077A1" }, // Borda Periwinkle no hover
    "&.Mui-focused fieldset": { borderColor: "#F6B17A" }, // Borda Pêssego no foco
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#7077A1", // Cor do placeholder
    opacity: 0.8,
  },
  "& .MuiOutlinedInput-input": { padding: "12px 14px" },
  "& .MuiFormHelperText-root": { marginLeft: 1, color: "#ff6b6b" }, // Vermelho claro para erro
};

export default ValidationForm;
