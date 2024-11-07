import { OrderItem } from "../data/models/OrderItem";

export const sortOrderItems = (orderItems: Array<OrderItem>) => {
  orderItems.sort((a: OrderItem, b: OrderItem) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    const dateAddedA = a.dateAdded;
    const dateAddedB = b.dateAdded;

    if (dateAddedA < dateAddedB) {
      return 1;
    }

    if (dateAddedA > dateAddedB) {
      return -1;
    }

    return 0;
  });
};

export const calculateTotalQuantity = (orderItems: Array<OrderItem>) => {
  const totalQuantity = orderItems.reduce((acc, item) => {
    return item.quantity + acc;
  }, 0);

  return totalQuantity;
};

export const calculateTotalPrice = (orderItems: Array<OrderItem>) => {
  const totalOrderPrice = orderItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return totalOrderPrice;
};
