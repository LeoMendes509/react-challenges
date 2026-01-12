import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const HookForm = () => {
  // Configuração Do HOOK
  // mode: 'onChange' -> Valida enquanto digita (igual o desafio anterior)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(null); // Só para exibir no sucesso

  // Função que roda apenas se a validação passar
  const onSubmit = (data) => {
    console.log("Dados válidos: ", data);
    setFormData(data);
    setIsSubmitted(true);
  };

  // --- TELA DE SUCESSO ---
  if (isSubmitted) {
    return (
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          bgcolor: "#352F44",
          textAlign: "center",
          borderRadius: 4,
          color: "#DBD8E3",
          border: "1px solid #5C5470",
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 70, color: "#DBD8E3", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Cadastro Realizado!
        </Typography>
        <Typography sx={{ mt: 1, opacity: 0.8 }}>
          Bem-vindo ao sistema, {formData.nome}.
        </Typography>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outlined"
          sx={{ mt: 3, color: "#DBD8E3", borderColor: "#DBD8E3" }}
        >
          Voltar
        </Button>
      </Paper>
    );
  }

  // --- FORMULÁRIO ---
  return (
    <Paper
      elevation={10}
      sx={{
        maxWidth: 900,
        width: "100%",
        display: "flex",
        overflow: "hidden",
        borderRadius: 5,
        bgcolor: "#352F44", // Roxo Escuro (Card)
        color: "#DBD8E3", // Lilás Claro (Texto)
      }}
    >
      <Grid container>
        {/* LADO ESQUERDO: FORMULÁRIO */}
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
            sx={{ fontWeight: "bold", mb: 1, color: "#DBD8E3" }}
          >
            Nova Conta
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 3 }}>
            Use o React Hook Form para se cadastrar.
          </Typography>

          {/* O handleSubmit do Hook envolve nossa função */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* NOME */}
              <TextField
                placeholder="Nome Completo"
                variant="outlined"
                fullWidth
                // AQUI ENTRA O REGISTER
                {...register("nome", {
                  required: "Nome é obrigatório.",
                  minLength: { value: 3, message: "Mínimo 3 caracteres." },
                })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#DBD8E3" }} />
                    </InputAdornment>
                  ),
                }}
                sx={purpleInputStyle}
              />

              {/* EMAIL */}
              <TextField
                placeholder="E-mail"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "E-mail é obrigatório.",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Formato de e-mail inválido.",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#DBD8E3" }} />
                    </InputAdornment>
                  ),
                }}
                sx={purpleInputStyle}
              />

              {/* IDADE */}
              <TextField
                placeholder="Idade"
                type="number"
                variant="outlined"
                fullWidth
                {...register("idade", {
                  required: "Informe a idade.",
                  min: { value: 18, message: "Mínimo 18 anos." },
                  max: { value: 120, message: "Máximo 120 anos." },
                })}
                error={!!errors.idade}
                helperText={errors.idade?.message}
                sx={purpleInputStyle}
              />

              {/* SENHA */}
              <TextField
                placeholder="Senha"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                {...register("senha", {
                  required: "Crie uma senha.",
                  minLength: { value: 6, message: "Mínimo 6 caracteres." },
                })}
                error={!!errors.senha}
                helperText={errors.senha?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#5C5470" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={purpleInputStyle}
              />

              {/* CONFIRMAR SENHA */}
              <TextField
                placeholder="Confirmar Senha"
                type="password"
                variant="outlined"
                fullWidth
                {...register("confirmarSenha", {
                  required: "Confirme a senha.",
                  validate: (value) =>
                    value === getValues("senha") || "As senhas não coincidem.",
                })}
                error={!!errors.confirmarSenha}
                helperText={errors.confirmarSenha?.message}
                sx={purpleInputStyle}
              />

              {/* TERMOS */}
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("termos", {
                      required: "Você deve aceitar os termos.",
                    })}
                    sx={{
                      color: "#5C5470",
                      "&.Mui-checked": { color: "#DBD8E3" },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="caption"
                    sx={{ color: errors.termos ? "#ff6b6b" : "#aaa" }}
                  >
                    Li e concordo com os Termos & Condições
                  </Typography>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#DBD8E3",
                  color: "#2A2438",
                  fontWeight: "bold",
                  borderRadius: 3,
                  "&:hover": {
                    bgcolor: "#fff",
                    boxShadow: "0 0 10px rgba(219, 216, 227, 0.5)",
                  },
                }}
              >
                Criar Conta
              </Button>
            </Box>
          </form>
        </Grid>

        {/* LADO DIREITO: VISUAL ROXO */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "linear-gradient(135deg, #5C5470 0%, #2A2438 100%)",
            color: "#DBD8E3",
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
          <Typography variant="h6" sx={{ opacity: 0.7, maxWidth: 300 }}>
            Junte-se a nós nesta experiência com React Hook Form.
          </Typography>
          {/* Elementos decorativos */}
          <Box
            sx={{
              width: 150,
              height: 150,
              border: "2px solid rgba(219, 216, 227, 0.1)",
              borderRadius: "50%",
              position: "absolute",
              top: -20,
              right: -20,
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: "rgba(219, 216, 227, 0.1)",
              borderRadius: "50%",
              position: "absolute",
              bottom: 50,
              left: 50,
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

// ESTILO DOS INPUTS (ROXO MISTÉRIO)
const purpleInputStyle = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#2A2438", // Fundo bem escuro
    borderRadius: 3,
    color: "#DBD8E3",
    "& fieldset": { borderColor: "#5C5470" }, // Borda roxa média
    "&:hover fieldset": { borderColor: "#DBD8E3" },
    "&.Mui-focused fieldset": { borderColor: "#DBD8E3" },
  },
  "& .MuiOutlinedInput-input::placeholder": { color: "#5C5470", opacity: 1 },
  "& .MuiFormHelperText-root": { marginLeft: 1, color: "#ff6b6b" },
};

export default HookForm;
