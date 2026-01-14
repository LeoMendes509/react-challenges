import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowBack, Search, AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../../hooks/Challenge9/useDebounce";
const colors = {
  bg: "#000000",
  gold: "#F4DFC8",
  cream: "#F4EAE0",
  white: "#FAF6F0",
  surface: "#0A0A0A",
  gray: "#333",
};

const DebounceView = () => {
  const navigate = useNavigate();

  // Estado Imediato (Muda a acada tecla)
  const [searchTerm, setSearchTerm] = useState("");

  // Estado Debounced (muda só depois de 800ms de silêncio)
  const debouncedSearch = useDebounce(searchTerm, 800);

  // Simulação de Loading
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Esse efeito roda quando o debounced muda (não quando o usuário digita)
  useEffect(() => {
    if (debouncedSearch) {
      setIsSearching(true);
      console.log("🔍 BUSCANDO NA API POR: ", debouncedSearch);

      // Simulando busca na API (demora 1s)
      setTimeout(() => {
        setIsSearching(false);
        setResults([
          `Resultado 1 para "${debouncedSearch}"`,
          `Resultado 2 para "${debouncedSearch}"`,
          `Resultado 3 para "${debouncedSearch}"`,
        ]);
      }, 1000);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: colors.white,
      "& fieldset": { borderColor: colors.gold },
      "&:hover fieldset": { borderColor: colors.gold },
      "&.Mui-focused fieldset": { borderColor: colors.gold },
    },
    "& .MuiInputLabel-root": { color: colors.cream },
    "& .MuiInputLabel-root.Mui-focused": { color: colors.gold },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ alignSelf: "flex-start", color: colors.gold, mb: 4 }}
      >
        VOLTAR
      </Button>

      <Typography
        variant="h4"
        sx={{ color: colors.gold, fontWeight: "bold", mb: 1 }}
      >
        BUSCA OTIMIZADA
      </Typography>
      <Typography
        sx={{ color: colors.cream, mb: 4, textAlign: "center", opacity: 0.8 }}
      >
        Digite rápido abaixo. Perceba que a "Busca Real" espera você parar.
        <br />
        Isso economiza recursos do servidor.
      </Typography>

      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* INPUT DE BUSCA */}
        <Paper
          sx={{
            p: 3,
            bgcolor: colors.surface,
            border: `1px solid ${colors.gold}`,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Search sx={{ color: colors.gold, fontSize: 30 }} />
            <TextField
              fullWidth
              label="Pesquisar..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={inputStyle}
            />
          </Stack>
        </Paper>

        {/* MONITORAMENTO (DEBUG) */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* O que você digita */}
          <Paper
            sx={{ flex: 1, p: 2, bgcolor: "#111", border: "1px dashed #555" }}
          >
            <Typography variant="caption" color="gray">
              DIGITANDO AGORA (State)
            </Typography>
            <Typography
              variant="h6"
              color={colors.white}
              sx={{ minHeight: 30 }}
            >
              {searchTerm}
            </Typography>
          </Paper>

          {/* O que o sistema vê */}
          <Paper
            sx={{
              flex: 1,
              p: 2,
              bgcolor: "rgba(244, 223, 200, 0.1)",
              border: `1px solid ${colors.gold}`,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <AccessTime sx={{ fontSize: 16, color: colors.gold }} />
              <Typography variant="caption" color={colors.gold}>
                PROCESSADO (Debounce)
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              color={colors.white}
              sx={{ minHeight: 30 }}
            >
              {debouncedSearch}
            </Typography>
          </Paper>
        </Stack>

        {/* RESULTADOS */}
        <Paper sx={{ p: 3, bgcolor: colors.surface, minHeight: 150 }}>
          {isSearching ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: colors.cream,
              }}
            >
              <CircularProgress size={20} sx={{ color: colors.gold }} />
              <Typography>Consultando servidor...</Typography>
            </Box>
          ) : results.length > 0 ? (
            <Stack spacing={1}>
              {results.map((res, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1,
                    borderBottom: "1px solid #333",
                    color: colors.white,
                  }}
                >
                  {res}
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="gray" fontStyle="italic">
              Aguardando busca...
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default DebounceView;
