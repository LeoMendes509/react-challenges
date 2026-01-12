import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";

// --- SCHEMA YUP (Com Validações Rigorosas) ---
const schema = yup.object({
  // ETAPA 1: PESSOAL
  name: yup
    .string()
    .required("Nome completo obrigatório")
    .min(5, "Mínimo 5 letras"),
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Formato inválido (000.000.000-00)"
    ),
  birthDate: yup.string().required("Data de nascimento obrigatória"),
  phone: yup.string().required("Telefone obrigatório"),

  // ETAPA 2: ENDEREÇO (Objeto Aninhado)
  address: yup.object({
    zipCode: yup.string().required("CEP obrigatório"),
    street: yup.string().required("Rua obrigatória"),
    number: yup.string().required("Número obrigatório"),
    complement: yup.string(),
    city: yup.string().required("Cidade obrigatória"),
    state: yup
      .string()
      .required("UF obrigatória")
      .max(2, "Use a sigla (ex: SP)"),
  }),

  // ETAPA 3: PROFISSIONAL
  position: yup.string().required("Cargo obrigatório"),
  department: yup.string().required("Departamento obrigatório"),
  salary: yup
    .number()
    .typeError("Deve ser um número")
    .positive("Deve ser positivo")
    .required("Salário obrigatório"),
  hireDate: yup.string().required("Data de admissão obrigatória"),
});

const STEPS = ["Dados Pessoais", "Endereço", "Profissional"];

const EmployeeWizard = ({ initialData, onFinish, onCancel, loading }) => {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      // Valores padrão para garantir estrutura correta
      address: { state: "", city: "" },
    },
  });

  const { control, handleSubmit, reset, trigger } = methods;

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const handleNext = async () => {
    let isValid = false;

    // Validação por Etapa
    if (activeStep === 0) {
      isValid = await trigger(["name", "cpf", "birthDate", "phone"]);
    } else if (activeStep === 1) {
      // Valida o objeto address inteiro
      isValid = await trigger("address");
    } else if (activeStep === 2) {
      isValid = await trigger(["position", "department", "salary", "hireDate"]);
    }

    if (isValid) {
      if (activeStep === STEPS.length - 1) {
        handleSubmit(onFinish)();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ p: 1 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={styles.stepper}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel sx={styles.stepLabel}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form>
          <Box sx={{ minHeight: 350, mt: 3 }}>
            {/* ETAPA 1: DADOS PESSOAIS */}
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Nome Completo"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="CPF (000.000.000-00)"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Nascimento"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Telefone"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}

            {/* ETAPA 2: ENDEREÇO (Note o 'address.field') */}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Controller
                    name="address.zipCode"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="CEP"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="address.street"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Rua / Logradouro"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="address.number"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Número"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="address.complement"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Complemento"
                        fullWidth
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    name="address.city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Cidade"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="address.state"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="UF"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}

            {/* ETAPA 3: DADOS PROFISSIONAIS */}
            {activeStep === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="department"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        select
                        label="Departamento"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      >
                        <MenuItem value="TI">Tecnologia (TI)</MenuItem>
                        <MenuItem value="RH">Recursos Humanos</MenuItem>
                        <MenuItem value="Financeiro">Financeiro</MenuItem>
                        <MenuItem value="Comercial">Comercial</MenuItem>
                        <MenuItem value="Diretoria">Diretoria</MenuItem>
                        <MenuItem value="Administrativo">
                          Administrativo
                        </MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="position"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Cargo"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="salary"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Salário (R$)"
                        type="number"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="hireDate"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Admissão"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
          </Box>

          <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={onCancel} sx={{ color: "#808191" }}>
              Cancelar
            </Button>
            <Box>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((p) => p - 1)}
                sx={{ mr: 2, color: "#fff" }}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
                sx={styles.btnPrimary}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : activeStep === STEPS.length - 1 ? (
                  "Salvar"
                ) : (
                  "Próximo"
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </FormProvider>
  );
};

export default EmployeeWizard;

const styles = {
  stepper: { mb: 4 },
  stepLabel: {
    "& .MuiStepIcon-root": { color: "#2F3349" },
    "& .MuiStepIcon-root.Mui-active": { color: "#6C5DD3" },
    "& .MuiStepIcon-root.Mui-completed": { color: "#3DD9B3" },
    "& .MuiStepLabel-label": { color: "#808191" },
  },
  input: {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      bgcolor: "#131419",
      borderRadius: 2,
      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: "#6C5DD3" },
      "&.Mui-focused fieldset": { borderColor: "#6C5DD3" },
    },
    "& .MuiInputLabel-root": { color: "#808191" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#6C5DD3" },
    "& .MuiSelect-icon": { color: "#6C5DD3" },
    "& .MuiFormHelperText-root": { color: "#E95D5D" },
  },
  btnPrimary: {
    bgcolor: "#6C5DD3",
    fontWeight: "bold",
    borderRadius: 2,
    px: 4,
    "&:hover": { bgcolor: "#5a4cb5" },
  },
};
