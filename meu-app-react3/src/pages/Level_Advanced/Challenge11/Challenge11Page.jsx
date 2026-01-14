import React from "react";
import { CartProvider } from "../../../contexts/Challenge11/CartContext";
import ShoppingView from "../../../components/Challenges/Level_Advanced/Challenge11/ShoppingView";

const Challenge11Page = () => {
  return (
    // Envolvemos a tela com o "Cérebro" do Carrinho
    <CartProvider>
      <ShoppingView />
    </CartProvider>
  );
};

export default Challenge11Page;
