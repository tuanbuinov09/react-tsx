import orderIcon from "../../assets/icons8-cart-96.png";
import userIcon from "../../assets/User.png";
import classNames from "classnames";
import style from "./Header.module.css";
import { useContext, useState } from "react";
import Order from "../Order/Order";
import { NavLink, useNavigate } from "react-router-dom";
import OrderContext from "../../contexts/OrderContext";
import useLocalStorage from "../../hooks/useLocalStorage";

function Header() {
  const navigate = useNavigate();

  const { totalOrderQuantity } = useContext(OrderContext);

  const [showOrder, setShowOrder] = useState(false);

  const toggleOpenOrder = () => {
    setShowOrder((s) => !s);
  };

  const [token, _] = useLocalStorage("token", "");

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
          onClick={() => {
            console.log(token);
            if (!token) {
              navigate('/login');
            } else {
              navigate('/user');
            }

            setShowOrder(false);
          }}
        >
          <img
            className={classNames(style.iconImg)}
            src={userIcon}
            alt="user-icon"
          />
        </div>

        <div
          className={classNames(style.iconWrapper)}
          onClick={toggleOpenOrder}
        >
          <img
            className={classNames(style.iconImg)}
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
