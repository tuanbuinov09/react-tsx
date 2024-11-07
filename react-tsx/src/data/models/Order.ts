import { OrderItem } from "./OrderItem";
import { ShippingInformation } from "./ShippingInformation";

export interface Order {
  id: string;
  userID: string;
  shippingInformation: ShippingInformation;
  orderItems: OrderItem[];
  createdDate: string;
}
