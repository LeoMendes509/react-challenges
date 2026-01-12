import React, { forwardRef } from "react";
// Importando os componentes prontos do Material UI (botões, caixas, textos)
import {
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Divider,
  InputAdornment,
} from "@mui/material";
// Importando os ícones
import {
  ArrowBack,
  FilterAlt,
  Clear,
  AlternateEmail,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Nossa paleta de cores centralizada (se mudar aqui, muda em tudo)
const colors = {
  orange: "#FF6500",
  teal: "#1E3E62",
  darkBlue: "#0B192C",
  black: "#000000",
};

// forwardRef: Permite que este componente receba "ganchos" (refs) do componente Pai
const FocusView = forwardRef(
  ({ searchValue, onSearchChange, onClear, onFocusEmail }, refs) => {
    const navigate = useNavigate(); // Hook para mudar de página
    const { searchRef, emailRef } = refs; // Desempacotando os ganchos que recebemos

    return (
      // Box Principal: Ocupa 100% da altura (100vh) e pinta o fundo de preto
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: colors.black,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        {/* Botão Voltar: Fica fixo no canto superior esquerdo (absolute) */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{
            color: colors.teal,
            position: "absolute",
            top: 24,
            left: 24,
            fontWeight: "bold",
            letterSpacing: 1,
            "&:hover": { color: colors.orange }, // Muda para laranja ao passar o mouse
          }}
        >
          VOLTAR
        </Button>

        {/* Paper: O cartão central que segura o formulário */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: colors.darkBlue,
            border: `2px solid ${colors.teal}`,
            borderRadius: 1,
            p: 0,
            width: "100%",
            maxWidth: 550,
            boxShadow: `0 0 40px ${colors.teal}30`, // Cria aquele brilho/glow azul atrás
          }}
        >
          {/* Cabeçalho do Card: Título e Versão */}
          <Box sx={{ p: 3, borderBottom: `1px solid ${colors.teal}` }}>
            <Typography
              variant="h6"
              sx={{ color: colors.orange, fontWeight: 700, letterSpacing: 1 }}
            >
              CONSULTA DE REGISTROS
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#EDFFF0", textTransform: "uppercase" }}
            >
              Módulo de Gestão v3.0
            </Typography>
          </Box>

          {/* Área dos Inputs: Flex column para empilhar um embaixo do outro */}
          <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            {/* --- BLOCO 1: INPUT DE BUSCA --- */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                IDENTIFICADOR DO PROJETO
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                {/* O TextField recebe o 'searchRef' para podermos focar nele depois */}
                <TextField
                  inputRef={searchRef}
                  fullWidth
                  size="small"
                  placeholder="Ex: PRJ-2024-X"
                  value={searchValue} // O texto que aparece é controlado pelo Estado
                  onChange={(e) => onSearchChange(e.target.value)} // Avisa o Pai quando digita
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterAlt sx={{ color: colors.teal }} />
                      </InputAdornment>
                    ),
                  }}
                  // SX: Estilização profunda para mudar as cores padrão do MUI
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#EDFFF0", // Cor do texto digitado
                      bgcolor: "rgba(0,0,0,0.3)",
                      "& fieldset": { borderColor: colors.teal }, // Cor da borda normal
                      "&:hover fieldset": { borderColor: colors.orange }, // Cor da borda ao passar mouse
                      "&.Mui-focused fieldset": {
                        // Cor da borda quando clicado
                        borderColor: colors.orange,
                        borderWidth: 2,
                      },
                    },
                    "& input::placeholder": {
                      // Cor do texto de exemplo (placeholder)
                      color: "#EDFFF0",
                      opacity: 0.7,
                    },
                  }}
                />

                {/* Botão Limpar: Chama a função que apaga o texto e devolve o foco */}
                <Button
                  variant="outlined"
                  onClick={onClear}
                  sx={{
                    borderColor: colors.teal,
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: colors.orange,
                      bgcolor: "rgba(255, 101, 0, 0.1)",
                      color: colors.orange,
                    },
                  }}
                >
                  LIMPAR
                </Button>
              </Box>
            </Box>

            {/* Linha divisória sutil */}
            <Divider sx={{ borderColor: colors.teal, opacity: 0.3 }} />

            {/* --- BLOCO 2: INPUT DE EMAIL --- */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#fff",
                  mb: 1,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                EMAIL ADMINISTRATIVO
              </Typography>

              {/* O TextField recebe o 'emailRef' para pularmos para cá depois */}
              <TextField
                inputRef={emailRef}
                fullWidth
                size="small"
                placeholder="admin@empresa.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmail sx={{ color: "#EDFFF0" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: colors.orange,
                    bgcolor: "rgba(0,0,0,0.3)",
                    "& fieldset": { borderColor: colors.teal },
                    "&:hover fieldset": { borderColor: colors.orange },
                    "&.Mui-focused fieldset": { borderColor: colors.orange },
                  },
                  "& input::placeholder": { color: "#EDFFF0", opacity: 0.7 },
                }}
              />
            </Box>
          </Box>

          {/* Rodapé: Contém o botão de atalho */}
          <Box
            sx={{
              p: 2,
              bgcolor: "rgba(30, 62, 98, 0.3)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: "#EDFFF0", mr: 2 }}>
              Atalho: Use o botão ao lado para navegação rápida
            </Typography>

            {/* Botão que aciona o foco no email */}
            <Button
              size="small"
              onClick={onFocusEmail}
              sx={{
                color: colors.orange,
                borderColor: colors.orange,
                border: "1px solid",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                fontWeight: "bold",
                "&:hover": { bgcolor: colors.orange, color: colors.black },
              }}
            >
              Focar Email
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }
);

export default FocusView;
