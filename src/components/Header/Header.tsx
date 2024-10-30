import cartIcon from "../../assets/icons8-cart-96.png";
import classNames from "classnames";
import style from "./Header.module.css";
import { useContext, useState } from "react";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";
// import Cart from "../Cart/Cart";
import { NavLink } from "react-router-dom";

function Header() {
  // const { totalCartQuantity } = useContext(ShoppingCartContext);

  const [showCart, setShowCart] = useState(false);

  const toggleOpenCart = () => {
    setShowCart((s) => !s);
  };

  return (
    <header className={classNames(style.header)}>
      <div className={classNames(style.left)}>
        <NavLink to={""} className={style.homeLink}>
          HOME
        </NavLink>
      </div>

      <div className={classNames(style.right)}>
        <div className={classNames(style.iconWrapper)} onClick={toggleOpenCart}>
          <img
            className={classNames(style.cartIcon)}
            src={cartIcon}
            alt="icon"
          />
          <span className={classNames(style.cartCount)}>
            {/* {totalCartQuantity} */}0
          </span>
        </div>
      </div>
      {/* {showCart && <Cart toggleOpenCart={toggleOpenCart} />} */}
    </header>
  );
}

export default Header;
