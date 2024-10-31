import orderIcon from "../../assets/icons8-cart-96.png";
import classNames from "classnames";
import style from "./Header.module.css";
import { useContext, useState } from "react";
import Order from "../Order/Order";
import { NavLink } from "react-router-dom";
import OrderContext from "../../contexts/OrderContext";

function Header() {
  const { totalOrderQuantity } = useContext(OrderContext);

  const [showOrder, setShowOrder] = useState(false);

  const toggleOpenOrder = () => {
    setShowOrder((s) => !s);
  };

  return (
    <header className={classNames(style.header)}>
      <div className={classNames(style.left)}>
        <NavLink to={""} className={style.homeLink}>
          HOME
        </NavLink>
      </div>

      <div className={classNames(style.right)}>
        <div
          className={classNames(style.iconWrapper)}
          onClick={toggleOpenOrder}
        >
          <img
            className={classNames(style.orderIcon)}
            src={orderIcon}
            alt="icon"
          />
          <span className={classNames(style.orderCount)}>
            {totalOrderQuantity}
          </span>
        </div>
      </div>
      {showOrder && <Order toggleOpenOrder={toggleOpenOrder} />}
    </header>
  );
}

export default Header;
