import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  Menu as MenuIcon,
  AccountCircle,
  Settings,
  Logout,
  Close,
  TouchApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../../../../hooks/Challenge14/useClickOutside";

// --- PALETA EARTH ---
const theme = {
  bg: "#000000",
  card: "#F2E9D0", // Creme Claro
  menuBg: "#EACEB4", // Pêssego (Menu Dropdown)
  primary: "#BB5A5A", // Marrom Avermelhado
  accent: "#E79E85", // Salmão
  textDark: "#2C1A1D",
  textLight: "#F2E9D0",
};

const ClickOutsideView = () => {
  const navigate = useNavigate();

  // --- ESTADO 1: DROPDOWN MENU ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(); // Criamos a referência para o menu

  // Usamos o Hook: Se clicar fora do "menuRef", fecha o menu.
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  // --- ESTADO 2: MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef(); // Criamos a referência para o conteúdo do modal

  // Usamos o Hook: Se clicar fora do "conteúdo", fecha o modal.
  useClickOutside(modalContentRef, () => setIsModalOpen(false));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.bg,
        p: 4,
        color: theme.textLight,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 8,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ color: theme.card }}
        >
          VOLTAR
        </Button>
        <Typography variant="h5" fontWeight="bold" sx={{ color: theme.card }}>
          INTERAÇÕES INTELIGENTES
        </Typography>

        {/* --- EXEMPLO 1: O BOTÃO DE MENU --- */}
        <Box sx={{ position: "relative" }} ref={menuRef}>
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            sx={{
              bgcolor: theme.card,
              color: theme.textDark,
              "&:hover": { bgcolor: theme.accent },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* O MENU FLUTUANTE */}
          <Fade in={isMenuOpen}>
            <Paper
              elevation={8}
              sx={{
                position: "absolute",
                top: 50,
                right: 0,
                width: 200,
                bgcolor: theme.menuBg,
                color: theme.textDark,
                borderRadius: 2,
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              <List disablePadding>
                <ListItem sx={{ bgcolor: theme.primary, color: "#fff" }}>
                  <Typography variant="caption" fontWeight="bold">
                    MENU DE USUÁRIO
                  </Typography>
                </ListItem>
                <ListItemButton>
                  <AccountCircle sx={{ mr: 2 }} />{" "}
                  <ListItemText primary="Perfil" />
                </ListItemButton>
                <ListItemButton>
                  <Settings sx={{ mr: 2 }} />{" "}
                  <ListItemText primary="Configurações" />
                </ListItemButton>
                <Divider sx={{ borderColor: theme.accent }} />
                <ListItemButton onClick={() => setIsMenuOpen(false)}>
                  <Logout sx={{ mr: 2, color: theme.primary }} />{" "}
                  <ListItemText primary="Sair" sx={{ color: theme.primary }} />
                </ListItemButton>
              </List>
            </Paper>
          </Fade>
        </Box>
      </Box>

      {/* ÁREA CENTRAL */}
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography
          variant="h3"
          sx={{ mb: 2, fontWeight: "900", color: theme.accent }}
        >
          CLIQUE FORA 🖱️
        </Typography>
        <Typography sx={{ mb: 6, maxWidth: 600, mx: "auto", opacity: 0.8 }}>
          Tente abrir o menu no canto superior direito e clique em qualquer
          lugar preto para fechar.
          <br />
          Ou abra o Modal abaixo e clique no fundo escuro.
        </Typography>

        {/* --- EXEMPLO 2: BOTÃO DO MODAL --- */}
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsModalOpen(true)}
          startIcon={<TouchApp />}
          sx={{
            bgcolor: theme.primary,
            color: "#fff",
            fontWeight: "bold",
            py: 2,
            px: 6,
            borderRadius: 10,
            fontSize: "1.2rem",
            "&:hover": { bgcolor: theme.accent, transform: "scale(1.05)" },
            transition: "0.3s",
          }}
        >
          ABRIR MODAL
        </Button>
      </Box>

      {/* --- O MODAL (OVERLAY ESCURO) --- */}
      {isModalOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.85)", // Fundo escuro semi-transparente
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            backdropFilter: "blur(5px)",
          }}
        >
          {/* O CONTEÚDO DO MODAL (ESTE NÃO DEVE FECHAR AO CLICAR) */}
          <Fade in={isModalOpen}>
            <Paper
              ref={modalContentRef} // <--- A MÁGICA: A ref está aqui!
              sx={{
                width: 400,
                p: 4,
                bgcolor: theme.card,
                borderRadius: 4,
                textAlign: "center",
                boxShadow: "0 0 50px rgba(187, 90, 90, 0.3)",
                border: `2px solid ${theme.primary}`,
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => setIsModalOpen(false)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: theme.primary,
                }}
              >
                <Close />
              </IconButton>

              <TouchApp sx={{ fontSize: 60, color: theme.primary, mb: 2 }} />
              <Typography
                variant="h5"
                color={theme.textDark}
                fontWeight="bold"
                gutterBottom
              >
                Eu sou um Modal
              </Typography>
              <Typography color={theme.textDark} sx={{ mb: 3 }}>
                Se você clicar <strong>AQUI DENTRO</strong>, nada acontece
                (graças ao <code>ref.current.contains</code>).
                <br />
                <br />
                Mas se clicar no <strong>FUNDO ESCURO</strong>, eu fecho (graças
                ao <code>useClickOutside</code>).
              </Typography>

              <Button
                variant="outlined"
                onClick={() => setIsModalOpen(false)}
                sx={{
                  borderColor: theme.textDark,
                  color: theme.textDark,
                  fontWeight: "bold",
                }}
              >
                ENTENDI
              </Button>
            </Paper>
          </Fade>
        </Box>
      )}
    </Box>
  );
};

export default ClickOutsideView;
