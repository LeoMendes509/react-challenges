import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  CssBaseline,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Menu,
  Dashboard,
  People,
  Inventory,
  ShoppingCart,
  BarChart,
  Settings,
  Search,
  Logout,
  Star,
} from "@mui/icons-material";

const drawerWidth = 260;

// Botão do Menu (Estilo Dark/Neon)
const MenuButton = styled(ListItemButton)(({ selected }) => ({
  marginBottom: 4,
  color: selected ? "#fff" : "#71717a",
  backgroundColor: selected ? "rgba(255, 255, 255, 0.03)" : "transparent",
  position: "relative",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "#e4e4e7",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: -16,
    top: "50%",
    transform: "translateY(-50%)",
    height: selected ? "60%" : "0%",
    width: 4,
    backgroundColor: "#8b5cf6", // Roxo Neon
    borderRadius: "0 4px 4px 0",
    transition: "height 0.2s ease",
  },
}));

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  // --- SEUS DADOS ORIGINAIS ---
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Usuários", icon: <People /> },
    { text: "Produtos", icon: <Inventory /> },
    { text: "Pedidos", icon: <ShoppingCart /> },
    { text: "Relatórios", icon: <BarChart /> },
    { text: "Configurações", icon: <Settings /> },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#09090b",
        color: "#fff",
        p: 3,
        borderRight: "1px solid #27272a",
      }}
    >
      {/* LOGO ADAPTADA */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5, pl: 1 }}
      >
        <Box
          sx={{ width: 24, height: 24, bgcolor: "#fff", borderRadius: "6px" }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ letterSpacing: "-0.5px" }}
        >
          Admin Panel
        </Typography>
      </Box>

      {/* AÇÕES RÁPIDAS */}
      <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#27272a",
            color: "#fff",
            fontSize: 12,
            "&:hover": { bgcolor: "#3f3f46" },
          }}
        >
          Novo Pedido
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{ color: "#71717a", fontSize: 12, "&:hover": { color: "#fff" } }}
        >
          Exportar
        </Button>
      </Box>

      {/* LISTA DE MENU */}
      <Typography
        variant="caption"
        sx={{
          color: "#52525b",
          fontWeight: "bold",
          mb: 1,
          display: "block",
          pl: 1,
        }}
      >
        GERENCIAMENTO
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <MenuButton
              selected={activeItem === item.text}
              onClick={() => setActiveItem(item.text)}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            </MenuButton>
          </ListItem>
        ))}
      </List>

      {/* CARD "PRO" DA SIDEBAR */}
      <Box
        sx={{
          mt: "auto",
          p: 2,
          bgcolor: "#171717",
          borderRadius: 3,
          border: "1px solid #27272a",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Star fontSize="small" sx={{ color: "#fbbf24" }} />
          <Typography variant="subtitle2" fontWeight="bold">
            Versão Pro
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary">
          Acesso total aos relatórios avançados.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APPBAR GLASSMORPHISM */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "rgba(9, 9, 11, 0.6)",
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: "1px solid #27272a",
          py: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <Menu />
          </IconButton>

          {/* USER INFO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#8b5cf6",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              AD
            </Avatar>
            <Box>
              <Typography variant="subtitle2" lineHeight={1.2}>
                Admin User
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Super Admin
              </Typography>
            </Box>
            <Chip
              label="Online ●"
              size="small"
              sx={{
                bgcolor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                fontWeight: "bold",
                ml: 1,
                border: "none",
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* SEARCH & ACTIONS */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              startIcon={<Search />}
              sx={{
                bgcolor: "#18181b",
                color: "#71717a",
                borderRadius: 20,
                px: 3,
                border: "1px solid #27272a",
                display: { xs: "none", md: "flex" },
              }}
            >
              Buscar...
            </Button>
            <IconButton
              sx={{
                bgcolor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: 3,
                color: "#a1a1aa",
              }}
            >
              <Logout fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#09090b",
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #27272a",
              bgcolor: "#09090b",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          pt: 12,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          bgcolor: "#09090b",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
