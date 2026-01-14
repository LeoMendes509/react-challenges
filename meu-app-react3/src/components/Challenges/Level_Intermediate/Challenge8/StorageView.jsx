import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Chip,
  Stack,
  Switch,
} from "@mui/material";
import { ArrowBack, Settings, Person, Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// IMPORTANTE: Importe o hook useLocalStorage (O Robô Engenheiro)
import { useLocalStorage } from "../../../../hooks/Challenge8/useLocalStorage";
const colors = {
  bg: "#000000",
  gold: "#F4DFC8",
  cream: "#F4EAE0",
  white: "#FAF6F0",
  surface: "#0A0A0A",
  danger: "#ef5350",
};

const StorageView = () => {
  const navigate = useNavigate();

  // --- AQUI ESTÁ A MÁGICA (HOOKS) ---

  // 1. Hook para texto (Nome)
  // O hook procura "app_userName" no navegador. Se não achar, usa "" (vazio).
  const [name, setName] = useLocalStorage("app_userName", "");

  // 2. Hook para objeto (Configurações)
  // O hook sabe guardar objetos inteiros (JSON) e devolve pronto pra uso.
  const [settings, setSettings] = useLocalStorage("app_settings", {
    notifications: true,
    sound: false,
  });

  // 3. Hook para lista (Favoritos)
  // O hook sabe guardar Arrays. Começa com [] (lista vazia).
  const [favorites, setFavorites] = useLocalStorage("app_favorites", []);

  // Estado local (Temporário)
  // Esse NÃO usa o hook porque é só o que eu estou digitando AGORA antes de adicionar.
  const [tempFav, setTempFav] = useState("");

  // --- FUNÇÕES DE AÇÃO ---

  // Troca o switch de on/off
  const toggleSetting = (key) => {
    // Copia as configs antigas (...settings) e inverte só a que clicamos
    setSettings({ ...settings, [key]: !settings[key] });
  };

  // Adiciona um item na lista de favoritos
  const addFavorite = () => {
    if (tempFav.trim()) {
      // Cria uma nova lista com tudo que já tinha (...favorites) + o novo item
      setFavorites([...favorites, tempFav]);
      setTempFav(""); // Limpa o campo de digitar
    }
  };

  // Remove um item da lista
  const removeFavorite = (itemToDelete) => {
    // Filtra a lista mantendo só quem NÃO for o item que quero apagar
    setFavorites(favorites.filter((item) => item !== itemToDelete));
  };

  // Estilos para deixar bonito no fundo preto
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
        MEMÓRIA (LOCALSTORAGE)
      </Typography>
      <Typography
        sx={{ color: colors.cream, mb: 4, textAlign: "center", opacity: 0.8 }}
      >
        Teste de Fogo: Digite algo, <strong>aperte F5</strong> e veja que os
        dados continuam aqui.
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 600, width: "100%" }}>
        {/* --- CARTÃO 1: NOME (TEXTO) --- */}
        <Paper
          sx={{
            border: `1px solid ${colors.gold}`,
            p: 3,
            bgcolor: colors.surface,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <Person sx={{ color: colors.gold }} />
            <Typography variant="h6" color={colors.white}>
              Identificação
            </Typography>
          </Stack>

          {/* O value={name} garante que o input mostre o que veio do localStorage */}
          <TextField
            fullWidth
            label="Seu Nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={inputStyle}
          />
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 1, color: "gray" }}
          >
            Dado cru no banco: {JSON.stringify(name)}
          </Typography>
        </Paper>

        {/* --- CARTÃO 2: CONFIGS (OBJETO) --- */}
        <Paper
          sx={{
            border: `1px solid ${colors.gold}`,
            p: 3,
            bgcolor: colors.surface,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <Settings sx={{ color: colors.gold }} />
            <Typography variant="h6" color={colors.white}>
              Configurações
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color={colors.cream}>Notificações</Typography>
              <Switch
                checked={settings.notifications}
                onChange={() => toggleSetting("notifications")}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: colors.gold },
                  "& .MuiSwitch-track": { bgcolor: "gray" },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color={colors.cream}>Efeitos Sonoros</Typography>
              <Switch
                checked={settings.sound}
                onChange={() => toggleSetting("sound")}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: colors.gold },
                  "& .MuiSwitch-track": { bgcolor: "gray" },
                }}
              />
            </Box>
          </Stack>
        </Paper>

        {/* --- CARTÃO 3: FAVORITOS (ARRAY) --- */}
        <Paper
          sx={{
            border: `1px solid ${colors.gold}`,
            p: 3,
            bgcolor: colors.surface,
            borderRadius: 2,
          }}
        >
          <Stack direction="row" gap={2} alignItems="center" mb={2}>
            <Star sx={{ color: colors.gold }} />
            <Typography variant="h6" color={colors.white}>
              Favoritos
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Novo item..."
              value={tempFav}
              onChange={(e) => setTempFav(e.target.value)}
              sx={inputStyle}
            />
            <Button
              variant="contained"
              onClick={addFavorite}
              sx={{ bgcolor: colors.gold, color: "black", fontWeight: "bold" }}
            >
              ADD
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {favorites.length === 0 && (
              <Typography variant="caption" color="gray">
                Lista vazia.
              </Typography>
            )}

            {/* Fazemos um MAP para criar um Chip para cada item salvo */}
            {favorites.map((fav, index) => (
              <Chip
                key={index}
                label={fav}
                onDelete={() => removeFavorite(fav)}
                sx={{
                  bgcolor: "rgba(244, 223, 200, 0.1)",
                  color: colors.gold,
                  border: `1px solid ${colors.gold}`,
                  "& .MuiChip-deleteIcon": { color: colors.danger },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default StorageView;
