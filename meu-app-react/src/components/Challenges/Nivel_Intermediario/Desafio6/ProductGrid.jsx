import React from "react";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const products = [
  { id: 1, name: "Notebook", price: 4500, image: "💻" },
  { id: 2, name: "Mouse", price: 150, image: "🖱️" },
  { id: 3, name: "Teclado", price: 350, image: "⌨️" },
  { id: 4, name: "Monitor", price: 1800, image: "🖥️" },
  { id: 5, name: "Headset", price: 400, image: "🎧" },
  { id: 6, name: "Webcam", price: 250, image: "📷" },
];

const ProductGrid = () => {
  // Acessamos o tema padrão para pegar os tamanhos de tela (breakpoints)
  const theme = useTheme();

  // O Sensor: isMobile será TRUE se a tela for menor que 'sm' (Tablet/600px)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // Container limita a largura máxima para não ficar esticado em monitores gigantes
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#fff" }}
      >
        Loja de Eletrônicos
      </Typography>

      {/* GRID CONTAINER: É a linha que segura os itens. spacing={4} é o espaço entre eles. */}
      <Grid container spacing={3}>
        {products.map((produto) => (
          // GRID ITEM: Aqui definimos o tamanho de cada carta.
          // xs={12}: Celular (ocupa 12/12 = 1 por linha)
          // sm={6}: Tablet (ocupa 6/12 = 2 por linha)
          // md={4}: Laptop (ocupa 4/12 = 3 por linha)
          // lg={3}: Monitor Grande (ocupa 3/12 = 4 por linha)
          <Grid item xs={12} sm={6} md={4} lg={3} key={produto.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                p: 2,
                borderRadius: 4,
              }}
            >
              {/* Emoji Gigante como Imagem */}
              <Typography variant="h1" sx={{ mb: 2 }}>
                {produto.image}
              </Typography>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  fontWeight="bold"
                >
                  {produto.name}
                </Typography>
                <Typography variant="h5" color="primary.main" fontWeight="bold">
                  R$ {produto.price}
                </Typography>
              </CardContent>

              {/* Botão com Texto Dinâmico (Muda se for mobile) */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                {isMobile ? "🛒" : "Adicionar ao Carrinho"}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
