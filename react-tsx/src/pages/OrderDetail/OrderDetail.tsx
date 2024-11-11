import classNames from "classnames";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { OrderItem } from "../../data/models/OrderItem";
import useLocalStorage from "../../hooks/useLocalStorage";
import style from "./OrderDetail.module.css";
import { calculateTotalPrice, sortOrderItems } from "../../utilities/orderItemsUtils";

function OrderDetail() {
  const { orderID } = useParams();
  const [localAllOrders, _] = useLocalStorage("allOrders", []);

  const [orderDetail, setOrderDetail] = useState({ id: '', userID: '', shippingInformation: { name: "", phoneNumber: "", address: "", email: "", note: "" }, orderItems: [] });
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  useLayoutEffect(() => {
    const orderDetailFromDataSource = localAllOrders.find((o: any) => o.id === orderID);
    const orderItems = orderDetailFromDataSource.orderItems;

    sortOrderItems(orderItems);

    setOrderDetail(orderDetailFromDataSource);
    setTotalOrderPrice(calculateTotalPrice(orderItems));
  });

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.orderItems}>
          <h3 className={style.title}>ITEMS</h3>

          {orderDetail.orderItems.map((item: OrderItem) => {
            return <CheckoutItem key={item.id + item.size} orderItem={item} />;
          })}
        </div>

        <div className={style.confirmBtnContainer}>
          <h4>
            Total:{" "}
            <span className={style.highlightText}>
              {totalOrderPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </h4>

        </div>
      </div>

      <div className={style.right}>
        <form >
          <h3 className={style.title}>SHIPPING INFORMATION</h3>

          <div className={style.inputGroup}>
            <label className={classNames(style.label, style.disabled)}>Full name: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={orderDetail.shippingInformation?.name}
              readOnly />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={classNames(style.label, style.disabled)}>Address: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={orderDetail.shippingInformation?.address}
              readOnly />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={classNames(style.label, style.disabled)}>Phone number: </label>
            <input
              className={classNames(style.textInput, style.disabled)}

              value={orderDetail.shippingInformation?.phoneNumber}
              readOnly
              type="tel"
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={classNames(style.label, style.disabled)}>Note: </label>
            <textarea
              className={classNames(style.textInput, style.disabled)}
              value={orderDetail.shippingInformation?.note}
              readOnly
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <p className={style.errorMessage}>
            <span></span>
          </p>
        </form>
      </div>
    </div >
  );
}

export default OrderDetail;
