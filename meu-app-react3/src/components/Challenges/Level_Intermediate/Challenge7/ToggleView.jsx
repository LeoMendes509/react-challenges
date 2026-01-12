import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Modal,
  Fade,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
  Close,
  Settings,
  Notifications,
  Info,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// 1. IMPORTAMOS NOSSO HOOK MÁGICO
import { useToggle } from "../../../../hooks/useToggle";

// --- CORES DARK LUXURY ---
const colors = {
  bg: "#000000",
  gold: "#F4DFC8",
  cream: "#F4EAE0",
  white: "#FAF6F0",
  surface: "#0A0A0A",
  overlay: "rgba(0, 0, 0, 0.8)",
};

const ToggleView = () => {
  const navigate = useNavigate();

  // --- 2. USANDO O HOOK (MÚLTIPLAS VEZES) ---
  // Veja como o código fica limpo! Não precisa criar funções "handleOpen...", "handleClose..."

  // Para o Modal
  const [isModalOpen, toggleModal] = useToggle(false);

  // Para o Menu Dropdown
  const [isMenuOpen, toggleMenu] = useToggle(false);

  // Para o Accordion (Sanfona)
  const [isAccordionOpen, toggleAccordion] = useToggle(true); // Começa aberto

  // Para as Configurações (Switchs)
  const [isWifiOn, toggleWifi] = useToggle(true);
  const [isNotifOn, toggleNotif] = useToggle(false);

  // --- ESTILOS AUXILIARES ---
  const boxStyle = {
    border: `1px solid ${colors.gold}`,
    borderRadius: 2,
    p: 3,
    bgcolor: colors.surface,
    mb: 3,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.bg,
        color: colors.white,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{ alignSelf: "flex-start", color: colors.gold, mb: 2 }}
      >
        VOLTAR
      </Button>

      <Typography
        variant="h4"
        sx={{ color: colors.gold, fontWeight: "bold", mb: 1 }}
      >
        CUSTOM HOOKS
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: colors.cream, mb: 4, opacity: 0.8 }}
      >
        Reutilizando a lógica de "Abrir/Fechar" com <strong>useToggle</strong>
      </Typography>

      <Box sx={{ maxWidth: 600, width: "100%" }}>
        {/* ===================================================
            EXEMPLO 1: MODAL
           =================================================== */}
        <Box sx={boxStyle}>
          <Typography variant="h6" color={colors.gold} gutterBottom>
            1. Modal Interativo
          </Typography>
          <Typography variant="body2" color={colors.cream} paragraph>
            O hook controla se a janela está visível ou não.
          </Typography>

          <Button
            variant="outlined"
            onClick={toggleModal}
            sx={{ borderColor: colors.gold, color: colors.gold }}
          >
            ABRIR MODAL
          </Button>

          <Modal open={isModalOpen} onClose={toggleModal} closeAfterTransition>
            <Fade in={isModalOpen}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: colors.surface,
                  border: `2px solid ${colors.gold}`,
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Info sx={{ fontSize: 50, color: colors.gold, mb: 2 }} />
                <Typography variant="h5" color={colors.white} fontWeight="bold">
                  Olá, Visitante!
                </Typography>
                <Typography sx={{ mt: 2, color: colors.cream }}>
                  Este modal está sendo controlado pelo hook{" "}
                  <code>useToggle</code>. Simples, né?
                </Typography>
                <Button
                  onClick={toggleModal}
                  variant="contained"
                  sx={{
                    mt: 3,
                    bgcolor: colors.gold,
                    color: colors.bg,
                    fontWeight: "bold",
                  }}
                >
                  FECHAR
                </Button>
              </Box>
            </Fade>
          </Modal>
        </Box>

        {/* ===================================================
            EXEMPLO 2: ACCORDION (SANFONA)
           =================================================== */}
        <Box sx={boxStyle}>
          <Box
            onClick={toggleAccordion}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" color={colors.gold}>
              2. Accordion (Clique aqui)
            </Typography>
            {isAccordionOpen ? (
              <ExpandLess sx={{ color: colors.gold }} />
            ) : (
              <ExpandMore sx={{ color: colors.gold }} />
            )}
          </Box>

          <Collapse in={isAccordionOpen}>
            <Divider sx={{ my: 2, bgcolor: colors.gold, opacity: 0.3 }} />
            <Typography variant="body2" color={colors.cream}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. O
              conteúdo expande e colapsa usando exatamente a mesma lógica do
              modal, mas com uma animação diferente.
            </Typography>
          </Collapse>
        </Box>

        {/* ===================================================
            EXEMPLO 3: MENU DROPDOWN
           =================================================== */}
        <Box sx={{ ...boxStyle, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color={colors.gold}>
              3. Menu Dropdown
            </Typography>
            <IconButton
              onClick={toggleMenu}
              sx={{ color: colors.gold, border: `1px solid ${colors.gold}` }}
            >
              {isMenuOpen ? <Close /> : <MenuIcon />}
            </IconButton>
          </Box>

          <Collapse in={isMenuOpen}>
            <Paper
              sx={{
                mt: 2,
                bgcolor: "rgba(255,255,255,0.05)",
                color: colors.white,
              }}
            >
              <List>
                <ListItem button>
                  <ListItemText primary="Meu Perfil" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Configurações" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Sair" sx={{ color: "#ef5350" }} />
                </ListItem>
              </List>
            </Paper>
          </Collapse>
        </Box>

        {/* ===================================================
            EXEMPLO 4: SWITCHES DE CONFIGURAÇÃO
           =================================================== */}
        <Box sx={boxStyle}>
          <Typography variant="h6" color={colors.gold} gutterBottom>
            4. Configurações (Switches)
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Settings sx={{ color: colors.cream }} />
              <Typography color={colors.white}>Modo Wi-Fi</Typography>
            </Box>
            <Switch
              checked={isWifiOn}
              onChange={toggleWifi}
              sx={{
                "& .MuiSwitch-track": { bgcolor: "#666" },
                "& .MuiSwitch-switchBase.Mui-checked": { color: colors.gold },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  bgcolor: colors.gold,
                },
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Notifications sx={{ color: colors.cream }} />
              <Typography color={colors.white}>Notificações</Typography>
            </Box>
            <Switch
              checked={isNotifOn}
              onChange={toggleNotif}
              sx={{
                "& .MuiSwitch-track": { bgcolor: "#666" },
                "& .MuiSwitch-switchBase.Mui-checked": { color: colors.gold },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  bgcolor: colors.gold,
                },
              }}
            />
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              color: colors.gold,
              fontStyle: "italic",
            }}
          >
            Status: Wi-Fi {isWifiOn ? "Ligado" : "Desligado"} | Notificações{" "}
            {isNotifOn ? "Ativas" : "Mudas"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ToggleView;
