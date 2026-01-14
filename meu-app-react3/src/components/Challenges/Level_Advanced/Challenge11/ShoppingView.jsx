import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Badge,
  Paper,
  Divider,
  Stack,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  ShoppingCart,
  Add,
  Remove,
  DeleteOutline,
  ArrowBack,
  CheckCircle,
  LocalMall,
  Sell, // Ícone de etiqueta
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../hooks/Challenge11/useCart";

// --- DADOS MOCKADOS ---
const PRODUCTS = [
  { id: 1, name: "Casual T-Shirt", price: 49.9, image: "👕" },
  { id: 2, name: "Jeans Classic", price: 89.9, image: "👖" },
  { id: 3, name: "Urban Sneakers", price: 199.9, image: "👟" },
  { id: 4, name: "Street Cap", price: 39.9, image: "🧢" },
];

// --- NOVA PALETA (EARTHY CONTRAST) ---
const theme = {
  bg: "#000000", // Fundo Preto (Pedido)
  cardLight: "#F2E9D0", // Creme Claro (Fundo dos Cards)
  cardDark: "#EACEB4", // Pêssego Pálido (Detalhes/Fundo de imagem)
  accent: "#E79E85", // Salmão (Bordas/Destaques suaves)
  primary: "#BB5A5A", // Marrom Avermelhado (Botões/Ações Fortes)
  textDark: "#2C1A1D", // Texto Escuro para ler no fundo claro
  textLight: "#F2E9D0", // Texto Claro para ler no fundo preto
  success: "#4caf50",
};

// --- 1. SUB-COMPONENTE: ITEM DO CARRINHO ---
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        p: 2,
        bgcolor: "#fff", // Fundo branco suave para destacar no card creme
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderLeft: `5px solid ${theme.primary}`,
      }}
    >
      {/* Esquerda: Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            fontSize: "2rem",
            bgcolor: theme.cardDark,
            borderRadius: 2,
            width: 50,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.image}
        </Box>
        <Box>
          <Typography
            sx={{
              color: theme.textDark,
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              color: theme.primary,
              fontWeight: "bold",
              fontSize: "0.85rem",
            }}
          >
            R$ {item.price.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* Direita: Controles */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => updateQuantity(item.id, -1)}
          sx={{
            color: theme.primary,
            bgcolor: theme.cardDark,
            "&:hover": { bgcolor: theme.accent },
          }}
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography
          sx={{
            color: theme.textDark,
            minWidth: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {item.quantity}
        </Typography>

        <IconButton
          size="small"
          onClick={() => updateQuantity(item.id, 1)}
          sx={{
            color: theme.primary,
            bgcolor: theme.cardDark,
            "&:hover": { bgcolor: theme.accent },
          }}
        >
          <Add fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => removeFromCart(item.id)}
          sx={{ color: "#ef5350", ml: 0.5 }}
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ShoppingView = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, clearCart, totalItems, totalPrice } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.bg,
        color: theme.textLight,
        p: { xs: 2, md: 4 },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{
            color: theme.cardLight,
            fontWeight: "bold",
            "&:hover": { color: theme.accent },
          }}
        >
          VOLTAR
        </Button>

        <Typography
          variant="h4"
          sx={{
            color: theme.cardLight,
            fontWeight: "900",
            letterSpacing: 2,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Sell sx={{ color: theme.accent, fontSize: 35 }} /> URBAN SHOP
        </Typography>

        <Badge
          badgeContent={totalItems}
          sx={{
            "& .MuiBadge-badge": { bgcolor: theme.primary, color: "#fff" },
          }}
        >
          <ShoppingCart sx={{ color: theme.cardLight, fontSize: 30 }} />
        </Badge>
      </Box>

      <Grid container spacing={4}>
        {/* === ESQUERDA: CATÁLOGO === */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: theme.cardDark,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            COLEÇÃO ATUAL
          </Typography>

          <Grid container spacing={2}>
            {PRODUCTS.map((product) => (
              <Grid item xs={12} sm={6} key={product.id}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: theme.cardLight, // Fundo claro
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "0.3s",
                    border: `1px solid transparent`,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: `0 10px 20px rgba(231, 158, 133, 0.2)`, // Sombra cor salmão
                      borderColor: theme.accent,
                    },
                  }}
                >
                  {/* Área da Imagem */}
                  <Box
                    sx={{
                      height: 180,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "6rem",
                      bgcolor: theme.cardDark, // Fundo pêssego
                      position: "relative",
                    }}
                  >
                    {product.image}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: theme.primary,
                        color: "#fff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      NOVO
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: theme.textDark, fontWeight: "800" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.primary, fontWeight: "bold" }}
                      >
                        R$ {product.price.toFixed(0)}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: theme.textDark, opacity: 0.7, mb: 3 }}
                    >
                      Design minimalista e confortável.
                    </Typography>

                    <Button
                      fullWidth
                      disableElevation
                      variant="contained"
                      onClick={() => addToCart(product)}
                      sx={{
                        bgcolor: theme.textDark,
                        color: theme.cardLight,
                        fontWeight: "bold",
                        borderRadius: 2,
                        py: 1.5,
                        "&:hover": { bgcolor: theme.primary },
                      }}
                    >
                      ADICIONAR +
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* === DIREITA: CARRINHO === */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: theme.cardLight, // Fundo Claro
              p: 4,
              borderRadius: 4,
              position: "sticky",
              top: 20,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)", // Sombra forte para destacar do fundo preto
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
                pb: 2,
                borderBottom: `2px dashed ${theme.accent}`,
              }}
            >
              <LocalMall sx={{ color: theme.primary, fontSize: 30 }} />
              <Typography
                variant="h5"
                sx={{ color: theme.textDark, fontWeight: "800" }}
              >
                SEU CARRINHO
              </Typography>
            </Box>

            {/* LISTA DE ITENS */}
            <Box
              sx={{
                maxHeight: 400,
                overflowY: "auto",
                mb: 4,
                pr: 1,
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { bgcolor: "rgba(0,0,0,0.05)" },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: theme.accent,
                  borderRadius: "4px",
                },
              }}
            >
              {cartItems.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6, opacity: 0.6 }}>
                  <ShoppingCart
                    sx={{ fontSize: 50, color: theme.cardDark, mb: 2 }}
                  />
                  <Typography color={theme.textDark} fontWeight="bold">
                    Sua sacola está vazia.
                  </Typography>
                  <Typography variant="body2" color={theme.textDark}>
                    Adicione itens para começar.
                  </Typography>
                </Box>
              ) : (
                cartItems.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </Box>

            {/* TOTAIS */}
            <Box sx={{ bgcolor: theme.cardDark, p: 3, borderRadius: 3, mb: 3 }}>
              <Stack spacing={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: theme.textDark,
                  }}
                >
                  <Typography>Subtotal ({totalItems} itens)</Typography>
                  <Typography fontWeight="bold">
                    R$ {totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: theme.textDark,
                  }}
                >
                  <Typography>Frete</Typography>
                  <Typography fontWeight="bold" color={theme.success}>
                    GRÁTIS
                  </Typography>
                </Box>
                <Divider sx={{ my: 1, bgcolor: theme.accent }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    color={theme.textDark}
                    fontWeight="800"
                  >
                    TOTAL
                  </Typography>
                  <Typography
                    variant="h4"
                    color={theme.primary}
                    fontWeight="800"
                  >
                    R$ {totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* BOTÕES DE AÇÃO */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                fullWidth
                onClick={clearCart}
                disabled={cartItems.length === 0}
                sx={{
                  color: theme.textDark,
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#ef5350",
                    bgcolor: "rgba(239, 83, 80, 0.1)",
                  },
                }}
              >
                LIMPAR
              </Button>
              <Button
                variant="contained"
                fullWidth
                disableElevation
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
                startIcon={<CheckCircle />}
                sx={{
                  bgcolor: theme.primary,
                  color: "#fff",
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#9e4343" },
                }}
              >
                FINALIZAR COMPRA
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* === O MODAL (A CAIXINHA) === */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: "rgba(0,0,0,0.85)" } }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: theme.cardLight, // Fundo Claro
              boxShadow: 24,
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              outline: "none",
              border: `4px solid ${theme.primary}`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: theme.success,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <CheckCircle sx={{ fontSize: 50 }} />
            </Box>

            <Typography
              variant="h5"
              sx={{ color: theme.textDark, fontWeight: "900", mb: 1 }}
            >
              PEDIDO CONFIRMADO!
            </Typography>

            <Typography sx={{ color: theme.textDark, mb: 4, opacity: 0.8 }}>
              Tudo certo. Seus itens já estão sendo separados com carinho.
            </Typography>

            <Button
              variant="contained"
              onClick={handleCloseModal}
              fullWidth
              disableElevation
              sx={{
                bgcolor: theme.primary,
                color: "#fff",
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": { bgcolor: "#9e4343" },
              }}
            >
              VOLTAR À LOJA
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ShoppingView;
