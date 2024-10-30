import { createContext } from "react";

const ShoppingCartContext = createContext({
  cartItems: [],
  totalCartQuantity: 0,
  updateCartItems: () => {},
});

export default ShoppingCartContext;
