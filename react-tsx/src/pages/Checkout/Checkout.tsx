import style from "./Checkout.module.css";
import { useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import OrderContext from "../../contexts/OrderContext";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { NoDigitsRegex, PhoneNumberRegex } from "../../constants/Regexes";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";

interface ShippingInformation {
  name: string;
  address: string;
  phoneNumber: string;
  note: string;
}

const formSchema = yup.object<ShippingInformation>().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(100, "Name cannot exceed more than 100 characters")
    .matches(NoDigitsRegex, "Invalid name"),
  address: yup
    .string()
    .required("Address is required")
    .max(250, "Address cannot exceed more than 250 characters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .max(200, "Phone number cannot exceed more than 15 characters")
    .matches(PhoneNumberRegex, "Invalid Phone number"),
  note: yup
    .string()
    .max(1000, "Email cannot exceed more than 1000 characters")
    .default(null),
});

function Checkout() {
  const { orderItems, totalOrderQuantity, updateOrderItems } =
    useContext(OrderContext);

  const currentUser = useSelector(selectCurrentUser);

  const [latestCheckoutAddress, setLatestCheckoutAddress] = useLocalStorage(
    "latestCheckoutAddress",
    {}
  );

  const [_, setLocalOrderItems] = useLocalStorage("orderItems", []);

  const [localAllOrders, setLocalAllOrders] = useLocalStorage("allOrders", []);

  const totalOrderPrice = orderItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ShippingInformation>({
    resolver: yupResolver(formSchema),
    defaultValues: latestCheckoutAddress
  });

  const onSubmit: SubmitHandler<ShippingInformation> = (data) => {
    if (!orderItems || orderItems.length === 0) {
      return;
    }

    const selection = confirm("Confirmation on your order?");
    if (selection) {

      setLatestCheckoutAddress({ ...data, note: null });

      const newAllOrders = localAllOrders;
      console.log("order to be saved: ", { userID: currentUser?.id, address: data, orderItems: orderItems });

      newAllOrders.push({ userID: currentUser?.id, address: data, orderItems: orderItems });

      setLocalAllOrders(newAllOrders);

      updateOrderItems([]);
      setLocalOrderItems([]);

      toast.success("Success");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.orderItems}>
          <h3 className={style.title}>ITEMS</h3>

          {totalOrderQuantity === 0 ? (
            <>
              <h3 className={style.noItem}>No item in order.</h3>
              <a href="/">{`Back to shopping`}</a>{" "}
            </>
          ) : (
            <></>
          )}
          {orderItems.map((item) => {
            return <CheckoutItem key={item.id + item.size} orderItem={item} />;
          })}
        </div>

        {totalOrderQuantity !== 0 ? (
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
        ) : (
          <></>
        )}
      </div>

      <div className={style.right}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={style.title}>SHIPPING INFORMATION</h3>

          <div className={style.inputGroup}>
            <label className={style.label}>Full name: </label>
            <input
              className={style.textInput}
              {...register("name")} />
            <p className={style.errorMessage}>
              <span>{errors?.name?.message}</span>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Address: </label>
            <input
              className={style.textInput}
              {...register("address")} />
            <p className={style.errorMessage}>
              <span>{errors?.address?.message}</span>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Phone number: </label>
            <input
              className={style.textInput}
              {...register("phoneNumber")}
              type="tel"
            />
            <p className={style.errorMessage}>
              <span>{errors?.phoneNumber?.message}</span>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Note: </label>
            <textarea
              className={style.textInput}
              {...register("note")}
            />
            <p className={style.errorMessage}>
              <span>{errors?.note?.message}</span>
            </p>
          </div>

          <p className={style.errorMessage}>
            <span></span>
          </p>

          <button
            type="submit"
            className={classNames(style.checkoutBtn, {
              [style.disabled]: !orderItems || orderItems.length === 0
            })}
          >
            CONFIRM
          </button>
        </form>
      </div>
    </div >
  );
}

export default Checkout;
