import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  LinearProgress,
  CircularProgress,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Send,
  CheckCircleOutline,
} from "@mui/icons-material";

// --- CORES DA PALETA ---
const COLORS = {
  brown: "#854836",
  orange: "#FFB22C",
  offWhite: "#F7F7F7",
  success: "#2e7d32",
  error: "#d32f2f",
};

// --- ESTILOS ---
const CustomTextField = styled(TextField)({
  "& label.Mui-focused": { color: COLORS.brown },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: COLORS.orange },
    "&.Mui-focused fieldset": { borderColor: COLORS.brown },
  },
});

const PasswordStrengthBar = styled(LinearProgress)(({ value }) => ({
  height: 8,
  borderRadius: 5,
  marginTop: 8,
  backgroundColor: "#e0e0e0",
  "& .MuiLinearProgress-bar": {
    backgroundColor:
      value < 30 ? COLORS.error : value < 70 ? COLORS.orange : COLORS.success,
  },
}));

const StyledForm = () => {
  // --- ESTADOS ---
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Controla a tela de sucesso

  // --- LÓGICA DE FORÇA DA SENHA ---
  const calculateStrength = (password) => {
    let score = 0;
    if (!password) return 0;
    if (password.length > 5) score += 30;
    if (password.match(/[A-Z]/)) score += 20;
    if (password.match(/[0-9]/)) score += 20;
    if (password.match(/[^A-Za-z0-9]/)) score += 30;
    return score > 100 ? 100 : score;
  };
  const strength = calculateStrength(values.password);

  // --- MÁSCARA ---
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
      .slice(0, 15);
  };

  // --- HANDLERS ---
  const handleChange = (prop) => (event) => {
    let val = prop === "terms" ? event.target.checked : event.target.value;
    if (prop === "phone") val = formatPhone(val);
    setValues({ ...values, [prop]: val });
    if (errors[prop]) setErrors({ ...errors, [prop]: "" });
  };

  const validate = () => {
    let temp = {};
    if (!values.name) temp.name = "Nome obrigatório";
    if (!values.email.includes("@")) temp.email = "Email inválido";
    if (values.phone.length < 14) temp.phone = "Telefone incompleto";
    if (values.password.length < 6) temp.password = "Mínimo 6 caracteres";
    if (values.password !== values.confirmPassword)
      temp.confirmPassword = "Senhas não conferem";
    if (!values.terms) temp.terms = "Aceite os termos";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simula envio e mostra sucesso
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  // Função para resetar e cadastrar novo
  const handleReset = () => {
    setValues({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });
    setSuccess(false);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 700,
        margin: "auto",
        minHeight: 600,
      }}
    >
      {/* TELA DE SUCESSO (Aparece se success === true) */}
      {success ? (
        <Fade in={success}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 5,
            }}
          >
            <CheckCircleOutline
              sx={{ fontSize: 100, color: COLORS.success, mb: 2 }}
            />

            <Typography
              variant="h4"
              sx={{
                color: COLORS.brown,
                fontWeight: "bold",
                mb: 1,
                textAlign: "center",
              }}
            >
              Sucesso!
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "#666", mb: 4, textAlign: "center" }}
            >
              Usuário <strong>{values.name}</strong> cadastrado com sucesso.
            </Typography>

            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{
                color: COLORS.brown,
                borderColor: COLORS.brown,
                fontWeight: "bold",
                px: 4,
                py: 1,
                borderRadius: 8,
                "&:hover": { borderColor: COLORS.orange, color: COLORS.orange },
              }}
            >
              Cadastrar Novo Usuário
            </Button>
          </Box>
        </Fade>
      ) : (
        // FORMULÁRIO (Aparece se success === false)
        <Fade in={!success}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                sx={{ color: COLORS.brown, fontWeight: "bold", mb: 1 }}
              >
                Criar Conta
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Preencha seus dados para acessar o sistema
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Nome Completo"
                  value={values.name}
                  onChange={handleChange("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: COLORS.brown }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="E-mail"
                  value={values.email}
                  onChange={handleChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: COLORS.brown }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Telefone"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: COLORS.brown }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Senha"
                  value={values.password}
                  onChange={handleChange("password")}
                  error={!!errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: COLORS.brown }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <VisibilityOff
                          sx={{ display: showPassword ? "none" : "block" }}
                        />
                        <Visibility
                          sx={{ display: showPassword ? "block" : "none" }}
                        />
                      </IconButton>
                    ),
                  }}
                />
                {values.password && (
                  <Box sx={{ mt: 1 }}>
                    <PasswordStrengthBar
                      variant="determinate"
                      value={strength}
                    />
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Força:{" "}
                      {strength < 30
                        ? "Fraca"
                        : strength < 70
                        ? "Média"
                        : "Forte"}
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type="password"
                  label="Confirmar Senha"
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: COLORS.brown }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.terms}
                      onChange={handleChange("terms")}
                      sx={{
                        color: COLORS.brown,
                        "&.Mui-checked": { color: COLORS.brown },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      color={errors.terms ? "error" : "textPrimary"}
                    >
                      Li e aceito os Termos de Uso
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  size="large"
                  sx={{
                    bgcolor: COLORS.brown,
                    color: "#fff",
                    py: 1.5,
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#5e3326" },
                  }}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Send />
                    )
                  }
                >
                  {loading ? "Cadastrando..." : "CRIAR CONTA"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Fade>
      )}
    </Paper>
  );
};

export default StyledForm;
