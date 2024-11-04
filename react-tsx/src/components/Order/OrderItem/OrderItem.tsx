import { useContext } from "react";
import style from "./OrderItem.module.css";
import classNames from "classnames";
import OrderContext from "../../../contexts/OrderContext";
import { OrderItem as OrderItemModel } from "../../../data/models/OrderItem";

function OrderItem(props: { orderItem: OrderItemModel }) {
  const { orderItems, updateOrderItems } = useContext(OrderContext);

  const { orderItem } = props;

  const increaseQuantity = () => {
    const editingItem: OrderItemModel | undefined = orderItems.find(
      (x) => x.id === orderItem.id && x.size === orderItem.size
    );

    if (!editingItem) {
      alert("Error no item with this id in order");
      return;
    }

    editingItem.quantity = editingItem.quantity + 1;

    updateOrderItems(orderItems);
  };

  const decreaseQuantity = () => {
    const editingItem: OrderItemModel | undefined = orderItems.find(
      (x) => x.id === orderItem.id && x.size === orderItem.size
    );

    if (!editingItem) {
      alert("Error no item with this id in order");
      return;
    }

    editingItem.quantity = editingItem.quantity - 1;

    if (editingItem.quantity === 0) {
      const indexOfItem = orderItems.indexOf(editingItem);
      orderItems.splice(indexOfItem, 1);
    }

    updateOrderItems(orderItems);
  };

  return (
    <div className={style.orderItem}>
      <img
        src={orderItem.image}
        alt={orderItem.name}
        className={classNames(style.image, style.left)}
      />

      <div className={style.right}>
        <h3>{orderItem.name}</h3>
        <p>
          Size: <span className={style.fieldValue}>{orderItem.size}</span>
        </p>
        <p>
          Price:{" "}
          <span className={style.fieldValue}>
            {orderItem.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>

        <div className={style.btnContainer}>
          <button className={style.quantityBtn} onClick={decreaseQuantity}>
            -
          </button>
          <div className={style.quantity}>{orderItem.quantity}</div>
          <button className={style.quantityBtn} onClick={increaseQuantity}>
            +
          </button>
        </div>

        <button
          className={style.removeBtn}
          onClick={() => {
            const editingItem: OrderItemModel | undefined = orderItems.find(
              (x) => x.id === orderItem.id && x.size === orderItem.size
            );

            if (!editingItem) {
              return;
            }

            const indexOfItem = orderItems.indexOf(editingItem);
            orderItems.splice(indexOfItem, 1);

            updateOrderItems(orderItems);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
