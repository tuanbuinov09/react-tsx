import style from "./User.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { signOut as signOutAction } from "../../features/authSlice";
import { fetchCurrentUser, selectAuthError, selectAuthLoading, selectCurrentUser } from "../../features/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectAuthLoading);
  const userError = useSelector(selectAuthError);

  const [token, setToken] = useLocalStorage('token', "");

  const signOut = () => {
    dispatch(signOutAction());
    setToken("");
    navigate('/login');
  }

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized");
      navigate("/login");
    }

    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [currentUser]);

  useEffect(() => {
  }, [userLoading]);

  useEffect(() => {
    if (userError) {
      toast.error(userError);
    }
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
              value={userLoading ? '' : currentUser?.name}
              readOnly />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Email: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userLoading ? '' : currentUser?.email}
              readOnly
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Phone number: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userLoading ? '' : currentUser?.phoneNumber}
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
