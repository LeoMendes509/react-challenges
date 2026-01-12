import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormGroup,
} from "@mui/material";
import {
  FaRegSadTear,
  FaRegFrown,
  FaRegMeh,
  FaRegSmile,
  FaRegGrinStars,
} from "react-icons/fa";
import PollIcon from "@mui/icons-material/Poll";
import SendIcon from "@mui/icons-material/Send";
import StarRateIcon from "@mui/icons-material/StarRate";

// Configuração das opções do formulário
const departamentos = ["TI", "RH", "Financeiro", "Marketing", "Operações"];
const opcoesMelhoria = [
  "Comunicação",
  "Processos",
  "Ferramentas",
  "Ambiente",
  "Salários",
];

// Configuração dos Emojis usando a cor de destaque (Amarelo)
const emojis = [
  { icon: FaRegSadTear, label: "Péssimo", color: "#FFD369" },
  { icon: FaRegFrown, label: "Ruim", color: "#FFD369" },
  { icon: FaRegMeh, label: "Neutro", color: "#FFD369" },
  { icon: FaRegSmile, label: "Bom", color: "#FFD369" },
  { icon: FaRegGrinStars, label: "Excelente", color: "#FFD369" },
];

// Schema de validação dos dados
const schema = yup.object({
  nome: yup.string().required("Nome obrigatório."),
  departamento: yup.string().required("Selecione o departamento."),
  satisfacao: yup.number().required("Avalie.").min(1, "Selecione."),
  melhorias: yup.array().min(1, "Marque 1 opção."),
  comentarios: yup.string(),
});

// Componente visual de avaliação por Emojis
const EmojiRating = ({ value, onChange }) => {
  const [hoverRating, setHoverRating] = useState(null);

  // Define o índice ativo (hover ou valor salvo)
  const activeIndex =
    hoverRating !== null ? hoverRating : value ? value - 1 : -1;
  const activeColor = activeIndex >= 0 ? emojis[activeIndex].color : "#EEEEEE";

  return (
    <div className="emoji-rating-wrapper" style={{ marginBottom: 0 }}>
      <div className="emojis-container" style={{ gap: "5px" }}>
        {emojis.map((emoji, index) => {
          const Icon = emoji.icon;
          const isActive = index <= activeIndex;
          return (
            <div
              key={index}
              className={`emoji-item ${isActive ? "active" : ""}`}
              onClick={() => onChange(index + 1)}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(null)}
              style={{ color: isActive ? activeColor : "#555", padding: "5px" }}
            >
              <Icon
                className="emoji-icon"
                style={{ fontSize: "2rem", marginBottom: "5px" }}
              />
              <span className="emoji-label" style={{ fontSize: "0.65rem" }}>
                {emoji.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente principal do Formulário
const SurveyForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      departamento: "",
      satisfacao: 0,
      melhorias: [],
      comentarios: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    setFormData(data);
    setIsSubmitted(true);
  };

  // Renderiza tela de sucesso após envio
  if (isSubmitted) {
    return (
      <Paper elevation={10} sx={cardStyle}>
        <StarRateIcon sx={{ fontSize: 60, color: "#FFD369", mb: 1 }} />
        <Typography variant="h5" sx={{ color: "#FFD369", fontWeight: "bold" }}>
          Obrigado!
        </Typography>
        <Typography sx={{ color: "#EEEEEE", mb: 2, fontSize: "0.9rem" }}>
          Feedback recebido.
        </Typography>

        <Box sx={summaryBoxStyle}>
          <Typography sx={labelSummaryStyle}>Nome:</Typography>
          <Typography sx={textSummaryStyle}>{formData.nome}</Typography>
          <Typography sx={labelSummaryStyle}>Departamento:</Typography>
          <Typography sx={textSummaryStyle}>{formData.departamento}</Typography>
          <Typography sx={labelSummaryStyle}>Nota:</Typography>
          <Typography sx={textSummaryStyle}>
            {formData.satisfacao} / 5
          </Typography>
        </Box>
        <Button
          onClick={() => setIsSubmitted(false)}
          fullWidth
          variant="outlined"
          sx={outlineBtnStyle}
        >
          Nova Pesquisa
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={10} sx={cardStyle}>
      <Box sx={{ mb: 2 }}>
        <PollIcon sx={{ fontSize: 40, color: "#FFD369" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#EEEEEE" }}>
          Pesquisa Interna
        </Typography>
        <Typography variant="caption" sx={{ color: "#FFD369" }}>
          Sua opinião é fundamental.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Nome Completo"
            variant="filled"
            size="small"
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            sx={inputStyle}
          />

          <TextField
            select
            fullWidth
            label="Departamento"
            variant="filled"
            size="small"
            defaultValue=""
            inputProps={register("departamento")}
            error={!!errors.departamento}
            helperText={errors.departamento?.message}
            sx={inputStyle}
          >
            {departamentos.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ width: "100%", textAlign: "left" }}>
            <FormControl error={!!errors.satisfacao} fullWidth>
              <FormLabel
                sx={{
                  color: "#FFD369 !important",
                  mb: 0.5,
                  fontSize: "0.9rem",
                }}
              >
                Como você avalia a empresa?
              </FormLabel>
              <Controller
                name="satisfacao"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <EmojiRating value={value} onChange={onChange} />
                )}
              />
              <FormHelperText
                sx={{ color: "#d32f2f", textAlign: "center", m: 0 }}
              >
                {errors.satisfacao?.message}
              </FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ width: "100%", textAlign: "left" }}>
            <FormControl
              error={!!errors.melhorias}
              component="fieldset"
              fullWidth
            >
              <FormLabel
                sx={{
                  color: "#FFD369 !important",
                  mb: 0.5,
                  fontSize: "0.9rem",
                }}
              >
                Pontos de Melhoria
              </FormLabel>
              <FormGroup>
                <Controller
                  name="melhorias"
                  control={control}
                  render={({ field }) => (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 0.5,
                      }}
                    >
                      {opcoesMelhoria.map((opcao) => (
                        <FormControlLabel
                          key={opcao}
                          label={
                            <Typography
                              sx={{ fontSize: "0.8rem", color: "#EEEEEE" }}
                            >
                              {opcao}
                            </Typography>
                          }
                          control={
                            <Checkbox
                              size="small"
                              sx={checkboxStyle}
                              checked={field.value.includes(opcao)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const vals = field.value || [];
                                if (checked) field.onChange([...vals, opcao]);
                                else
                                  field.onChange(
                                    vals.filter((v) => v !== opcao)
                                  );
                              }}
                            />
                          }
                        />
                      ))}
                    </Box>
                  )}
                />
              </FormGroup>
              <FormHelperText sx={{ color: "#d32f2f", m: 0 }}>
                {errors.melhorias?.message}
              </FormHelperText>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            label="Comentários"
            variant="filled"
            multiline
            rows={2}
            size="small"
            {...register("comentarios")}
            sx={inputStyle}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="medium"
            endIcon={<SendIcon />}
            sx={btnStyle}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

// Estilização do Card (Fundo Cinza Médio)
const cardStyle = {
  p: 3,
  maxWidth: 550,
  width: "100%",
  borderRadius: 4,
  bgcolor: "#393E46",
  borderTop: "4px solid #FFD369",
  textAlign: "center",
  color: "#EEEEEE",
};

// Estilização dos Inputs (Fundo Cinza Escuro para contraste)
const inputStyle = {
  "& .MuiFilledInput-root": {
    bgcolor: "#222831",
    color: "#EEEEEE",
    borderRadius: 1,
  },
  "& .MuiFilledInput-root:hover": { bgcolor: "#2C3440" },
  "& .MuiFilledInput-root.Mui-focused": {
    bgcolor: "#222831",
    borderColor: "#FFD369",
  },
  "& .MuiInputLabel-root": {
    color: "#EEEEEE",
    fontSize: "0.9rem",
    opacity: 0.7,
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#FFD369", opacity: 1 },
  "& .MuiSelect-select": {
    minHeight: "1.2em",
    display: "flex",
    alignItems: "center",
  },
};

// Estilização do Checkbox (Cor Amarela quando marcado)
const checkboxStyle = {
  color: "#EEEEEE",
  padding: "4px",
  "&.Mui-checked": { color: "#FFD369" },
};

// Botão Principal (Amarelo com texto Escuro para leitura)
const btnStyle = {
  bgcolor: "#FFD369",
  color: "#222831",
  fontWeight: "bold",
  fontSize: "1rem",
  mt: 0.5,
  "&:hover": {
    bgcolor: "#E6BE58",
    boxShadow: "0 0 10px rgba(255, 211, 105, 0.4)",
  },
};

// Botão de Borda (Amarelo)
const outlineBtnStyle = {
  mt: 2,
  color: "#FFD369",
  borderColor: "#FFD369",
  "&:hover": {
    borderColor: "#EEEEEE",
    color: "#EEEEEE",
    bgcolor: "rgba(255, 211, 105, 0.1)",
  },
};

// Caixa de Resumo (Fundo Escuro)
const summaryBoxStyle = {
  textAlign: "left",
  bgcolor: "#222831",
  p: 2,
  borderRadius: 2,
};

const labelSummaryStyle = { color: "#FFD369", fontSize: "0.75rem", mt: 0.5 };
const textSummaryStyle = {
  color: "#EEEEEE",
  fontSize: "1rem",
  fontWeight: "bold",
};

export default SurveyForm;
