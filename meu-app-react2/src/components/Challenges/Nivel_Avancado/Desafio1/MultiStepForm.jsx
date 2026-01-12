import React, { useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

// Configuração e dados estáticos
const STEPS = ["Dados Pessoais", "Endereço", "Credenciais", "Resumo"];

// Mapeia quais campos validar em cada etapa antes de avançar
const FIELDS_BY_STEP = [
  ["nome", "cpf", "nascimento"],
  ["cep", "rua", "numero", "cidade", "estado"],
  ["email", "senha", "confirmarSenha"],
];

// SCHEMA de validação YUP
const schema = yup.object({
  // Etapa 1
  nome: yup.string().required("Nome obrigatório").min(3, "Mínimo 3 letras"),
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .length(11, "Deve ter 11 dígitos"),
  nascimento: yup.string().required("Data obrigatória"),
  // Etapa 2
  cep: yup.string().required("CEP obrigatório"),
  rua: yup.string().required("Rua obrigatória"),
  numero: yup.string().required("Número obrigatório"),
  cidade: yup.string().required("Cidade obrigatória"),
  estado: yup.string().required("Selecione o estado"),
  // Etapa 3
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  senha: yup
    .string()
    .min(12, "Mínimo 12 caracteres")
    .required("Senha obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não conferem")
    .required("Confirmação obrigatória"),
});

// --- 3. SUB-COMPONENTES (ETAPAS) ---
// Usam useFormContext para acessar os dados sem receber props (Clean Code)

const StepPessoal = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box sx={styles.stepContainer}>
      <Controller
        name="nome"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome Completo"
            fullWidth
            error={!!errors.nome}
            helperText={errors.nome?.message}
            sx={styles.input}
          />
        )}
      />
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="CPF (Apenas números)"
            type="number"
            fullWidth
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
            sx={styles.input}
          />
        )}
      />
      <Controller
        name="nascimento"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Data de Nascimento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.nascimento}
            helperText={errors.nascimento?.message}
            sx={styles.input}
          />
        )}
      />
    </Box>
  );
};

const StepEndereco = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box sx={styles.stepContainer}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="CEP"
              fullWidth
              error={!!errors.cep}
              helperText={errors.cep?.message}
              sx={styles.input}
            />
          )}
        />
        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="UF"
              fullWidth
              error={!!errors.estado}
              helperText={errors.estado?.message}
              sx={styles.input}
            >
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="RJ">RJ</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
            </TextField>
          )}
        />
      </Box>
      <Controller
        name="cidade"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Cidade"
            fullWidth
            error={!!errors.cidade}
            helperText={errors.cidade?.message}
            sx={styles.input}
          />
        )}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="rua"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Logradouro"
              fullWidth
              sx={{ ...styles.input, flex: 3 }}
              error={!!errors.rua}
              helperText={errors.rua?.message}
            />
          )}
        />
        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nº"
              sx={{ ...styles.input, flex: 1 }}
              error={!!errors.numero}
              helperText={errors.numero?.message}
            />
          )}
        />
      </Box>
    </Box>
  );
};

const StepCredenciais = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box sx={styles.stepContainer}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="E-mail"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={styles.input}
          />
        )}
      />
      <Controller
        name="senha"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Senha"
            type="password"
            fullWidth
            error={!!errors.senha}
            helperText={errors.senha?.message}
            sx={styles.input}
          />
        )}
      />
      <Controller
        name="confirmarSenha"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirmar Senha"
            type="password"
            fullWidth
            error={!!errors.confirmarSenha}
            helperText={errors.confirmarSenha?.message}
            sx={styles.input}
          />
        )}
      />
    </Box>
  );
};

const StepResumo = () => {
  const { getValues } = useFormContext();
  const values = getValues(); // Pega todos os dados preenchidos até agora

  return (
    <Box sx={{ textAlign: "left", color: "#EEEEEE", mt: 2 }}>
      <Typography variant="h6" sx={{ color: "#FFD369", mb: 2 }}>
        Confira seus dados:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="gray" variant="caption">
            NOME
          </Typography>
          <Typography>{values.nome}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="gray" variant="caption">
            CPF
          </Typography>
          <Typography>{values.cpf}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="gray" variant="caption">
            EMAIL
          </Typography>
          <Typography>{values.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="gray" variant="caption">
            ENDEREÇO
          </Typography>
          <Typography>
            {values.rua}, {values.numero} - {values.cidade}/{values.estado}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

// --- 4. COMPONENTE PRINCIPAL ---
const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Inicializa o form apenas uma vez no pai
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      cpf: "",
      nascimento: "",
      cep: "",
      rua: "",
      numero: "",
      cidade: "",
      estado: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const { handleSubmit, trigger } = methods;

  // Valida apenas os campos da etapa atual antes de ir para a próxima
  const handleNext = async () => {
    const currentFields = FIELDS_BY_STEP[activeStep];

    // Se for a última etapa (Resumo), finaliza
    if (activeStep === STEPS.length - 1) {
      handleSubmit(onSubmit)();
      return;
    }

    // Dispara validação parcial (trigger)
    const isValid = await trigger(currentFields);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const onSubmit = (data) => {
    console.log("Formulário Completo:", data);
    setIsFinished(true);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepPessoal />;
      case 1:
        return <StepEndereco />;
      case 2:
        return <StepCredenciais />;
      case 3:
        return <StepResumo />;
      default:
        return null;
    }
  };

  if (isFinished) {
    return (
      <Paper elevation={10} sx={styles.paper}>
        <Box sx={{ textAlign: "center", py: 5 }}>
          <RiCheckDoubleLine size={60} color="#FFD369" />
          <Typography variant="h4" sx={{ color: "#EEEEEE", mt: 2 }}>
            Cadastro Sucesso!
          </Typography>
          <Button
            onClick={() => window.location.reload()}
            sx={{ mt: 3, color: "#FFD369" }}
          >
            Reiniciar
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={10} sx={styles.paper}>
      {/* FormProvider: A "Nuvem" que distribui os dados para os filhos */}
      <FormProvider {...methods}>
        {/* Header e Stepper */}
        <Typography variant="h5" sx={styles.title}>
          Formulário De Cadastro
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={styles.stepper}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel StepIconProps={{ sx: styles.stepIcon }}>
                <span style={{ color: "#EEEEEE" }}>{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={(e) => e.preventDefault()}>
          <Box sx={{ minHeight: "320px", mt: 3 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 3 }} />

          {/* Botões de Navegação */}
          <Box sx={styles.actions}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
              startIcon={<RiArrowLeftLine />}
              sx={styles.buttonSecondary}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={
                activeStep === STEPS.length - 1 ? (
                  <RiCheckDoubleLine />
                ) : (
                  <RiArrowRightLine />
                )
              }
              sx={styles.buttonPrimary}
            >
              {activeStep === STEPS.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default MultiStepForm;

// --- 5. ESTILOS (SX OBJECTS - DARK & GOLD) ---
const styles = {
  paper: {
    maxWidth: 800,
    width: "100%",
    bgcolor: "#393E46", // Cinza Chumbo
    color: "#EEEEEE",
    p: 4,
    borderRadius: 4,
  },
  title: {
    fontWeight: "bold",
    color: "#FFD369", // Dourado
    textAlign: "center",
    mb: 3,
  },
  stepper: {
    "& .MuiStepConnector-line": { borderColor: "#555" },
  },
  stepIcon: {
    "&.Mui-active": { color: "#FFD369" },
    "&.Mui-completed": { color: "#FFD369" },
    color: "gray",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    animation: "fadeIn 0.5s ease",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      color: "#EEEEEE",
      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "#FFD369" }, // Dourado no Hover
      "&.Mui-focused fieldset": { borderColor: "#FFD369" }, // Dourado no Foco
    },
    "& .MuiInputLabel-root": { color: "#b0b0b0" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#FFD369" },
    "& .MuiSelect-icon": { color: "#FFD369" },
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonPrimary: {
    bgcolor: "#FFD369",
    color: "#222831",
    fontWeight: "bold",
    "&:hover": { bgcolor: "#E6BE58" },
  },
  buttonSecondary: {
    color: "#b0b0b0",
    borderColor: "#b0b0b0",
    "&:hover": { color: "#EEEEEE", bgcolor: "rgba(255,255,255,0.05)" },
  },
};
