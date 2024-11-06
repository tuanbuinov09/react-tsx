import { createContext } from "react";
import { OrderItem } from "../data/models/OrderItem.ts";

const OrderContext = createContext({
  orderItems: new Array<OrderItem>(),
  totalOrderQuantity: 0,
  updateOrderItems: (_: Array<OrderItem>) => {},
});

export default OrderContext;
