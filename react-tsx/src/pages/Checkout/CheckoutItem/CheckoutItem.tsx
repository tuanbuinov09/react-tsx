import style from "./CheckoutItem.module.css";
import classNames from "classnames";
import { OrderItem } from "../../../data/models/OrderItem";

function CheckoutItem(props: { orderItem: OrderItem }) {
  const { orderItem } = props;
  const total = orderItem.quantity * orderItem.price;
  return (
    <div className={style.orderItem}>
      <img
        src={orderItem.image}
        alt={orderItem.name}
        className={classNames(style.image, style.left)}
      />

      <div className={style.right}>
        <h4>{orderItem.name}</h4>
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
          , Quantity:{" "}
          <span className={style.fieldValue}>{orderItem.quantity}</span>
        </p>
        <p>
          Total:{" "}
          <span className={style.fieldValue}>
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}

export default CheckoutItem;
