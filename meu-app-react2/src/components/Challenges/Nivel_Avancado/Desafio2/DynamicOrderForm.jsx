import React, { useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Divider,
  Card,
} from "@mui/material";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiFileList3Line,
  RiCheckDoubleLine,
} from "react-icons/ri";

// --- SCHEMA YUP ---
const schema = yup.object({
  cliente: yup.string().required("Nome do cliente obrigatório"),
  produtos: yup
    .array()
    .of(
      yup.object().shape({
        nome: yup.string().required("Produto obrigatório"),
        qtd: yup
          .number()
          .typeError("Qtd inválida")
          .positive()
          .integer()
          .required(),
        preco: yup.number().typeError("Valor inválido").positive().required(),
      })
    )
    .min(1, "Adicione pelo menos 1 produto"),
});

// --- SUB-COMPONENTE: MOSTRAR TOTAL ---
const TotalDisplay = ({ control }) => {
  const produtos = useWatch({ control, name: "produtos" });

  const total = produtos.reduce((acc, curr) => {
    const q = parseFloat(curr.qtd) || 0;
    const p = parseFloat(curr.preco) || 0;
    return acc + q * p;
  }, 0);

  return (
    <Box sx={styles.totalBox}>
      <Typography variant="subtitle1" sx={{ color: "#948979" }}>
        VALOR TOTAL
      </Typography>
      <Typography variant="h4" sx={{ color: "#DFD0B8", fontWeight: "bold" }}>
        R$ {total.toFixed(2)}
      </Typography>
    </Box>
  );
};

// --- COMPONENTE PRINCIPAL ---
const DynamicOrderForm = () => {
  const [sucesso, setSucesso] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cliente: "",
      produtos: [{ nome: "", qtd: 1, preco: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "produtos",
  });

  const onSubmit = (data) => {
    console.log("Pedido Enviado:", data);
    setSucesso(true);
  };

  if (sucesso) {
    return (
      <Paper elevation={10} sx={styles.paperSuccess}>
        <RiCheckDoubleLine size={60} color="#DFD0B8" />
        <Typography variant="h5" sx={{ mt: 2, color: "#DFD0B8" }}>
          Pedido Confirmado!
        </Typography>
        <Button onClick={() => window.location.reload()} sx={styles.btnOutline}>
          Novo Pedido
        </Button>
      </Paper>
    );
  }

  return (
    <Paper elevation={10} sx={styles.paper}>
      {/* Cabeçalho */}
      <Box sx={styles.header}>
        <RiFileList3Line size={28} color="#DFD0B8" />
        <Box>
          <Typography
            variant="h6"
            sx={{ color: "#DFD0B8", fontWeight: "bold", lineHeight: 1 }}
          >
            Novo Pedido
          </Typography>
          <Typography variant="caption" sx={{ color: "#948979" }}>
            Controle de Vendas
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Fixo: Cliente */}
        <Box sx={{ mb: 3 }}>
          <TextField
            {...register("cliente")}
            label="Cliente / Empresa"
            fullWidth
            variant="outlined"
            error={!!errors.cliente}
            helperText={errors.cliente?.message}
            sx={styles.input}
          />
        </Box>

        <Divider sx={{ borderColor: "rgba(148, 137, 121, 0.2)", mb: 2 }} />

        {/* Lista Dinâmica */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fields.map((field, index) => (
            <Card key={field.id} sx={styles.itemCard}>
              <Grid container spacing={2} alignItems="center">
                {/* Nome do Produto */}
                <Grid item xs={12} sm={5}>
                  <Controller
                    name={`produtos.${index}.nome`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Produto"
                        fullWidth
                        size="small"
                        sx={styles.input}
                        error={!!errors.produtos?.[index]?.nome}
                      />
                    )}
                  />
                </Grid>

                {/* Quantidade */}
                <Grid item xs={4} sm={2}>
                  <Controller
                    name={`produtos.${index}.qtd`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Qtd"
                        type="number"
                        fullWidth
                        size="small"
                        sx={styles.input}
                      />
                    )}
                  />
                </Grid>

                {/* Preço */}
                <Grid item xs={5} sm={3}>
                  <Controller
                    name={`produtos.${index}.preco`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Preço"
                        type="number"
                        fullWidth
                        size="small"
                        sx={styles.input}
                        InputProps={{
                          startAdornment: (
                            <Typography
                              sx={{
                                color: "#948979",
                                mr: 1,
                                fontSize: "0.8rem",
                              }}
                            >
                              R$
                            </Typography>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Botão Remover */}
                <Grid
                  item
                  xs={3}
                  sm={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    sx={{ color: "#ef5350" }}
                  >
                    <RiDeleteBinLine />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>

        {/* Botão Adicionar */}
        <Button
          onClick={() => append({ nome: "", qtd: 1, preco: "" })}
          startIcon={<RiAddLine />}
          sx={styles.btnAdd}
        >
          Adicionar Item
        </Button>

        {/* Totais e Submit */}
        <Box sx={{ mt: 4 }}>
          <TotalDisplay control={control} />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.btnSubmit}
          >
            Finalizar Venda
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default DynamicOrderForm;

// --- ESTILOS (PALETA DARK VINTAGE) ---
// #222831 (Fundo Pagina) -> Usado no CSS externo
// #393E46 (Card / Paper)
// #948979 (Bronze / Detalhes)
// #DFD0B8 (Creme / Texto Principal)

const styles = {
  paper: {
    maxWidth: 750,
    width: "100%",
    bgcolor: "#393E46", // Card Cinza Escuro
    color: "#DFD0B8",
    p: 4,
    borderRadius: 2,
    border: "1px solid rgba(148, 137, 121, 0.3)", // Borda sutil bronze
  },
  paperSuccess: {
    maxWidth: 400,
    textAlign: "center",
    bgcolor: "#393E46",
    p: 5,
    borderRadius: 2,
    border: "1px solid #DFD0B8",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 4,
    pb: 2,
    borderBottom: "2px solid #948979", // Linha Bronze
  },
  itemCard: {
    bgcolor: "rgba(34, 40, 49, 0.5)", // Fundo mais escuro (#222831 com alpha)
    p: 2,
    borderRadius: 1,
    borderLeft: "4px solid #948979", // Detalhe Bronze na esquerda
  },
  input: {
    "& .MuiOutlinedInput-root": {
      color: "#DFD0B8", // Texto Creme
      "& fieldset": { borderColor: "rgba(223, 208, 184, 0.3)" },
      "&:hover fieldset": { borderColor: "#DFD0B8" },
      "&.Mui-focused fieldset": { borderColor: "#DFD0B8" },
    },
    "& .MuiInputLabel-root": { color: "#948979" }, // Label Bronze
    "& .MuiInputLabel-root.Mui-focused": { color: "#DFD0B8" },
  },
  btnAdd: {
    mt: 2,
    color: "#948979",
    border: "1px dashed #948979",
    width: "100%",
    "&:hover": {
      bgcolor: "rgba(223, 208, 184, 0.05)",
      borderColor: "#DFD0B8",
      color: "#DFD0B8",
    },
  },
  totalBox: {
    bgcolor: "#222831", // Fundo bem escuro
    p: 2,
    borderRadius: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    border: "1px solid #948979",
  },
  btnSubmit: {
    bgcolor: "#DFD0B8", // Botão Creme
    color: "#222831", // Texto Escuro
    fontWeight: "bold",
    py: 1.5,
    "&:hover": { bgcolor: "#fff" },
  },
  btnOutline: {
    mt: 3,
    color: "#DFD0B8",
    borderColor: "#DFD0B8",
    variant: "outlined",
  },
};
