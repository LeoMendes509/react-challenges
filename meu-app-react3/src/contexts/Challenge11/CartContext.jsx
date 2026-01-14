import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  // Estado inicial (Busca no LocalStorage ou começa vazio)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("my_cart_v1");
    return saved ? JSON.parse(saved) : [];
  });

  // Persistência (salva sempre que mudar)
  useEffect(() => {
    localStorage.setItem("my_cart_v1", JSON.stringify(cartItems));
  }, [cartItems]);

  // AÇÕES DO CARRINHO
  // Adicionar: Se já existe, aumenta +1. Se não, cria novo.
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o item já está no carrinho
      const itemExists = prevItems.find((item) => item.id === product.id);

      if (itemExists) {
        // Se existe, mapeamos e aumentamos a quantidade só daquele item
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona o objeto novo com quantity: 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remover Item Inteiro (Lixeira)
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Atualizar Quantidade (+ ou -)
  const updateQuantity = (productId, amount) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          // Calcula nova quantidade
          const newQty = item.quantity + amount;
          // Se for menor que 1, mantemos 1 (para remover usa a lixeira)
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      });
    });
  };

  // Limpar Carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // --- VALORES CALCULADOS (DERIVED STATE) ---
  // Reduce é perfeito para somar listas
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
