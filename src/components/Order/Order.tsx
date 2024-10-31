import { useContext } from "react";
import style from "./Order.module.css";
import { useNavigate } from "react-router-dom";
import OrderContext from "../../contexts/OrderContext";
import OrderItem from "./OrderItem/OrderItem";

function Order(props: { toggleOpenOrder: () => void }) {
  const navigate = useNavigate();

  const { orderItems, totalOrderQuantity, updateOrderItems } =
    useContext(OrderContext);

  return (
    <>
      <div className={style.container}>
        <div className={style.orderItems}>
          {totalOrderQuantity === 0 ? (
            <h3 className={style.noItem}>No item in order.</h3>
          ) : (
            <></>
          )}
          {orderItems.map((item) => {
            return (
              <OrderItem key={`${item.id} + ${item.size}`} orderItem={item} />
            );
          })}
        </div>
        <div className={style.btnContainer}>
          {totalOrderQuantity > 0 ? (
            <button
              className={style.checkoutBtn}
              onClick={() => {
                navigate("checkout");
                props.toggleOpenOrder();
              }}
            >
              Check Out
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
