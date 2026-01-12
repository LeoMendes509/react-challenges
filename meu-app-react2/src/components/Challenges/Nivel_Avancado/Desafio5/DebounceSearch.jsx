import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  RiSearchLine,
  RiFilter3Line,
  RiComputerLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

// Dados Mockados (falso banco de dados)
const mockProducts = [
  { id: 1, name: "Notebook Dell", category: "Eletrônicos", price: 4500 },
  { id: 2, name: "Mouse Logitech", category: "Eletrônicos", price: 150 },
  { id: 3, name: "Teclado Mecânico", category: "Eletrônicos", price: 350 },
  { id: 4, name: 'Monitor LG 27"', category: "Eletrônicos", price: 1800 },
  { id: 5, name: "Cadeira Gamer", category: "Móveis", price: 1200 },
  { id: 6, name: "Mesa de Escritório", category: "Móveis", price: 800 },
  { id: 7, name: "Webcam HD", category: "Eletrônicos", price: 250 },
  { id: 8, name: "Headset Bluetooth", category: "Eletrônicos", price: 400 },
];

const CATEGORIES = ["Todas", "Eletrônicos", "Móveis"];

// Componente principal
const DebounceSearch = () => {
  // Estado do input (Atualiza instantaneamente ao digitar)
  const [searchTerm, setSearchTerm] = useState("");

  // Estado Debounced (Só atualiza depois de 500ms que o usuário parou)
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Outros estados
  const [category, setCategory] = useState("Todas");
  const [results, setResults] = useState(mockProducts);
  const [loading, setLoading] = useState(false);

  // Efeito 1 : cronômetro (DEBOUNCE)
  useEffect(() => {
    // define um "alarme" pra tocar daqui a 500ms
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    // CLEANUP FUNCTION (A Faxina)
    // Se o usuário digitar de novo antes dos 500ms, o React roda isso aqui:
    // "Cancele o alarme anterior, pois ele digitou mais coisas!"
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]); // roda toda vez que o usuário digita

  // Efeito 2 : a busca real (filtro)
  useEffect(() => {
    // Só busca quando o termo debounced ou a categoria mudarem
    const performSearch = () => {
      setLoading(true);
      // Simula delay de rede (300ms)
      setTimeout(() => {
        const filtered = mockProducts.filter((product) => {
          // lógica de filtro : Nome (case sensitive) E Categoria
          const matchesName = product.name
            .toLowerCase()
            .includes(debouncedTerm.toLowerCase());
          const matchesCategory =
            category === "Todas" || product.category === category;
          return matchesName & matchesCategory;
        });

        setResults(filtered);
        setLoading(false);
      }, 300);
    };

    performSearch();
  }, [debouncedTerm, category]); // Dependências: termo atrasado + categoria

  return (
    <Paper elevation={12} sx={styles.paper}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography variant="h6" sx={{ color: "#F1EFEC", fontWeight: "bold" }}>
          Busca Inteligente
        </Typography>
        <Typography variant="caption" sx={{ color: "#D4C9BE" }}>
          Tecnologia Debounce (500ms delay)
        </Typography>
      </Box>

      {/* Inputs */}
      <Box sx={styles.inputArea}>
        <TextField
          label="Buscar Produto..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={styles.input}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine color="#D4C9BE" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ ...styles.input, minWidth: 150 }}
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Status Bar */}
      <Box sx={styles.statusBar}>
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} sx={{ color: "#D4C9BE" }} />
            <Typography variant="caption" sx={{ color: "#D4C9BE" }}>
              Filtrando...
            </Typography>
          </Box>
        ) : (
          <Typography variant="caption" sx={{ color: "#F1EFEC" }}>
            {results.length} produtos encontrados
          </Typography>
        )}
      </Box>

      {/* Lista de Resultados */}
      <Box sx={styles.resultsList}>
        {results.length > 0 ? (
          results.map((product) => (
            <Paper key={product.id} sx={styles.productCard}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={styles.iconBox}>
                  {product.category === "Eletrônicos" ? (
                    <RiComputerLine />
                  ) : (
                    <RiFilter3Line />
                  )}
                </Box>
                <Box>
                  <Typography sx={{ color: "#F1EFEC", fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#D4C9BE" }}>
                    {product.category}
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<RiMoneyDollarCircleLine color="#123458" />}
                label={`R$ ${product.price}`}
                sx={{
                  bgcolor: "#D4C9BE",
                  color: "#123458",
                  fontWeight: "bold",
                }}
              />
            </Paper>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4, opacity: 0.5 }}>
            <Typography sx={{ color: "#D4C9BE" }}>
              Nenhum produto encontrado.
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default DebounceSearch;

// --- 3. ESTILOS (Deep Navy) ---
const styles = {
  paper: {
    maxWidth: 600,
    width: "100%",
    bgcolor: "#123458", // Azul Profundo
    borderRadius: 3,
    overflow: "hidden",
    border: "1px solid #1c4b78",
  },
  header: {
    p: 3,
    borderBottom: "1px solid rgba(212, 201, 190, 0.1)",
    textAlign: "center",
  },
  inputArea: {
    p: 3,
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" },
  },
  input: {
    "& .MuiOutlinedInput-root": {
      color: "#F1EFEC",
      "& fieldset": { borderColor: "rgba(212, 201, 190, 0.3)" },
      "&:hover fieldset": { borderColor: "#D4C9BE" },
      "&.Mui-focused fieldset": { borderColor: "#F1EFEC" },
    },
    "& .MuiInputLabel-root": { color: "#D4C9BE" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#F1EFEC" },
    "& .MuiSelect-icon": { color: "#D4C9BE" },
  },
  statusBar: {
    px: 3,
    pb: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  resultsList: {
    p: 3,
    pt: 0,
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    minHeight: 200,
  },
  productCard: {
    bgcolor: "rgba(255, 255, 255, 0.05)",
    p: 2,
    borderRadius: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "0.2s",
    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    bgcolor: "rgba(212, 201, 190, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#D4C9BE",
  },
};
