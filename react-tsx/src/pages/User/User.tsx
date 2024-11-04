import style from "./User.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import classNames from "classnames";


function User() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [loginStatus, setLoginStatus] = useLocalStorage("loginStatus", false);

  const signOut = () => {
    setLoginStatus(false);
    navigate('/login');
  }

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img className={style.image} src={image} alt="login" />{" "}
      </div>
      <div className={style.right}>
        <h3 className={style.title}>USER</h3>
        <form>
          <div className={style.inputGroup}>
            <label className={style.label}>Full name: </label>
            <input className={classNames(style.textInput, style.disabled)} value={userInfo.name} />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Email: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userInfo.email}
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Phone number: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userInfo.phoneNumber}
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <button className={classNames(style.checkoutBtn, style.bgGray)} onClick={signOut}>
            SIGN OUT
          </button>
        </form>
      </div>
    </div>
  );
}

export default User;
