import React, { useState } from "react";

// --- 1. LIBS EXTERNAS ---
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";

// --- 2. MATERIAL UI ---
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// --- 3. ÍCONES ---
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockIcon from "@mui/icons-material/Lock";

// --- 4. COMPONENTES AUXILIARES ---

// Componente de Máscara (IMask)
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      definitions={{ "#": /[1-9]/ }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

// SCHEMA de validação
// Aqui definimos todas as regras FORA do componente visual.
const schema = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "Mínimo de 3 caracteres."),
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Digite um e-mail válido."),
  telefone: yup
    .string()
    .required("Telefone é obrigatório.")
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido: (99) 99999-9999"),
  idade: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("A idade deve ser um número.")
    .min(18, "Você deve ser maior de 18 anos")
    .max(120, "Idade inválida."),
  senha: yup
    .string()
    .required("A senha é obrigatória.")
    .min(8, "Mínimo de 8 caracteres.")
    // Regex para: Pelo menos 1 maiúscula, 1 minúscula e 1 número
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Deve ter minúscula, maiúscula e número."
    ),
  confirmarSenha: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("senha")], "As senhas não conferem."),
  termos: yup.boolean().oneOf([true], "Você deve aceitar os termos."),
});

// --- 5. COMPONENTE PRINCIPAL ---
const YupForm = () => {
  // Configuração do hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    console.log("Dados validados pelo Yup: ", data);
    setFormData(data);
    setIsSubmitted(true);
  };

  // --- TELA DE SUCESSO (PRETO E DOURADO) ---
  if (isSubmitted) {
    return (
      <Paper elevation={10} sx={styles.successPaper}>
        <CheckCircleIcon sx={{ fontSize: 70, color: "#C69749", mb: 2 }} />
        <Typography variant="h5" sx={{ color: "#C69749", fontWeight: "bold" }}>
          Sucesso
        </Typography>
        <Typography sx={{ mt: 1, color: "#fff" }}>
          Bem-vindo ao clube, {formData.nome}.
        </Typography>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="contained"
          sx={styles.button}
        >
          Voltar
        </Button>
      </Paper>
    );
  }

  // --- FORMULÁRIO LUXURY ---
  return (
    <Paper elevation={20} sx={styles.mainContainer}>
      {/* LADO ESQUERDO: FORMULÁRIO */}
      <Box sx={styles.leftColumn}>
        <Typography variant="h4" sx={styles.title}>
          Membro Black
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa", mb: 4 }}>
          Preencha seus dados com exclusividade.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* NOME */}
            <TextField
              placeholder="Nome Completo"
              variant="outlined"
              fullWidth
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#C69749" }} />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />

            {/* EMAIL */}
            <TextField
              placeholder="E-mail"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#735F32" }} />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />

            {/* TELEFONE */}
            <Controller
              name="telefone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Telefone"
                  variant="outlined"
                  fullWidth
                  error={!!errors.telefone}
                  helperText={errors.telefone?.message}
                  InputProps={{
                    inputComponent: TextMaskCustom,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon sx={{ color: "#735F32" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.input}
                />
              )}
            />

            {/* IDADE */}
            <TextField
              placeholder="Idade"
              type="number"
              variant="outlined"
              fullWidth
              {...register("idade")}
              error={!!errors.idade}
              helperText={errors.idade?.message}
              sx={styles.input}
            />

            {/* SENHA */}
            <TextField
              placeholder="Senha Forte"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              {...register("senha")}
              error={!!errors.senha}
              helperText={errors.senha?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#C69749" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#C69749" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />

            {/* CONFIRMAR SENHA */}
            <TextField
              placeholder="Confirmar Senha"
              type="password"
              variant="outlined"
              fullWidth
              {...register("confirmarSenha")}
              error={!!errors.confirmarSenha}
              helperText={errors.confirmarSenha?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#735F32" }} />
                  </InputAdornment>
                ),
              }}
              sx={styles.input}
            />

            {/* TERMOS */}
            <FormControlLabel
              control={
                <Checkbox
                  {...register("termos")}
                  sx={{
                    color: "#735F32",
                    "&.Mui-checked": { color: "#C69749" },
                  }}
                />
              }
              label={
                <Typography variant="caption" sx={{ color: "#aaa" }}>
                  Li e concordo com os Termos de Serviço
                </Typography>
              }
            />
            {errors.termos && (
              <Typography
                variant="caption"
                sx={{ color: "#d32f2f", ml: 2, mt: -1 }}
              >
                {errors.termos.message}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={styles.button}
            >
              CRIAR CONTA BLACK
            </Button>
          </Box>
        </form>
      </Box>

      {/* LADO DIREITO: VISUAL LUXO */}
      <Box sx={styles.rightColumn}>
        <Box sx={styles.diamondCircle}>
          <Typography variant="h3">💎</Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, letterSpacing: 2 }}
        >
          EXCLUSIVE
        </Typography>
        <Typography variant="body1" sx={{ color: "#735F32", maxWidth: 250 }}>
          Segurança de alto nível com validação Yup.
        </Typography>
      </Box>
    </Paper>
  );
};

// --- 6. ESTILOS ORGANIZADOS (Objeto de Estilos) ---
const styles = {
  // Tela Principal
  mainContainer: {
    maxWidth: 950,
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
    bgcolor: "#282A3A",
    mx: "auto",
    mt: 2,
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // Flexbox resolve a altura
  },
  // Coluna Esquerda
  leftColumn: {
    flex: 1,
    p: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    mb: 1,
    color: "#C69749",
  },
  // Coluna Direita (Preta)
  rightColumn: {
    width: { xs: "100%", md: "40%" },
    bgcolor: "#000000",
    color: "#C69749",
    borderLeft: { md: "4px solid #735F32" },
    borderTop: { xs: "4px solid #735F32", md: "none" },
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    p: 4,
  },
  // Elementos Visuais
  diamondCircle: {
    width: 120,
    height: 120,
    border: "2px solid #C69749",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 3,
    boxShadow: "0 0 20px rgba(198, 151, 73, 0.3)",
  },
  // Inputs Customizados
  input: {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#1e1f2b",
      color: "#fff",
      borderRadius: 2,
      "& fieldset": { borderColor: "#735F32" },
      "&:hover fieldset": { borderColor: "#C69749" },
      "&.Mui-focused fieldset": { borderColor: "#C69749", borderWidth: "2px" },
    },
    "& .MuiOutlinedInput-input": { padding: "14px" },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "#735F32",
      opacity: 0.7,
    },
    "& .MuiFormHelperText-root": { marginLeft: 0, color: "#ff6b6b" },
  },
  // Botão
  button: {
    bgcolor: "#C69749",
    color: "#000",
    fontWeight: "bold",
    mt: 2,
    "&:hover": { bgcolor: "#735F32", color: "#fff" },
  },
  // Tela Sucesso
  successPaper: {
    p: 4,
    maxWidth: 400,
    bgcolor: "#282A3A",
    textAlign: "center",
    borderRadius: 4,
    border: "2px solid #C69749",
    mx: "auto",
    mt: 5,
  },
};

export default YupForm;
