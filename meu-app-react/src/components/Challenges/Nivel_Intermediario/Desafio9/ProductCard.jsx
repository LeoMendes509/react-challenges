import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStyles } from "./styles";

// Tema padrão
const theme = createTheme();

const ProductCard = ({ image, title, description, price }) => {
  // Envolvemos tudo no ThemeProvider para garantir o contexto v5
  return (
    <ThemeProvider theme={theme}>
      <ProductCardContent
        image={image}
        title={title}
        description={description}
        price={price}
      />
    </ThemeProvider>
  );
};

// Componente interno que usa os estilos
const ProductCardContent = ({ image, title, description, price }) => {
  // Chamamos o hook (agora protegido contra erros)
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          image ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
        }
        title={title}
        component="img"
      />

      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title || "Produto Exemplo"}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {description || "Descrição do produto usando makeStyles (Legacy)."}
        </Typography>

        <Typography className={classes.price}>R$ {price || "0,00"}</Typography>

        <Button variant="contained" color="primary" className={classes.button}>
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
