import style from "./User.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { fetchCurrentUser, selectError, selectLoading, selectUser } from "../../features/usersSlice";
import { useEffect } from "react";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const user = useSelector(selectUser);
  const userLoading = useSelector(selectLoading);
  const userError = useSelector(selectError);

  const [_, setToken] = useLocalStorage('token', "");

  const signOut = () => {
    dispatch(logout());
    setToken("");
    navigate('/login');
  }

  useEffect(() => {
    console.log("aaaaaaaa");
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
  }, [userLoading]);

  useEffect(() => {
  }, [userError]);


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
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userLoading ? '' : user?.name}
              readOnly />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Email: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userLoading ? '' : user?.email}
              readOnly
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Phone number: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userLoading ? '' : user?.phoneNumber}
              readOnly
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
