import style from "./User.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { signOut as signOutAction, updateCurrentUser } from "../../features/authSlice";
import { fetchCurrentUser, selectAuthError, selectAuthLoading, selectCurrentUser } from "../../features/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NoDigitsRegex, PhoneNumberRegex } from "../../constants/Regexes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserUpdateDto } from "../../data/dtos/UserUpdateDto";
import { SubmitHandler, useForm } from "react-hook-form";

const formSchema = yup.object<UserUpdateDto>().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(100, "Name cannot exceed more than 100 characters")
    .matches(NoDigitsRegex, "Invalid name"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .max(200, "Phone number cannot exceed more than 15 characters")
    .matches(PhoneNumberRegex, "Invalid Phone number"),
});

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const currentUser = useSelector(selectCurrentUser);
  const userLoading = useSelector(selectAuthLoading);
  const userError = useSelector(selectAuthError);

  const [token, setToken] = useLocalStorage('token', "");
  const [hasChanges, setHasChanges] = useState(false);

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
    if (currentUser) {
      setValue(
        "name", currentUser?.name
      );
      setValue(
        "phoneNumber", currentUser?.phoneNumber
      );

      if (hasChanges) {
        toast.success("Success");
        setHasChanges(false);
      }
    }
  }, [currentUser]);

  useEffect(() => {
  }, [userLoading]);

  useEffect(() => {
    // if (userError) {
    //   toast.error(userError);
    // }
  }, [userError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue
  } = useForm<UserUpdateDto>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: currentUser?.name,
      phoneNumber: currentUser?.phoneNumber
    }
  });

  const onSubmit: SubmitHandler<UserUpdateDto> = (data) => {
    dispatch(updateCurrentUser(data));
    setHasChanges(true);
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img className={style.image} src={image} alt="login" />{" "}
      </div>
      <div className={style.right}>
        <h3 className={style.title}>USER</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={style.inputGroup}>
            <label className={classNames(style.label, style.disabled)}>Email: </label>
            <input
              className={classNames(style.textInput, style.disabled)}
              value={userLoading ? '' : currentUser?.email}
              readOnly
            />
            <p className={style.errorMessage}>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Full name: </label>
            <input
              className={classNames(style.textInput)}
              {...register("name")} />
            <p className={style.errorMessage}>
              <span>{errors?.name?.message}</span>

            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Phone number: </label>
            <input
              className={classNames(style.textInput)}
              {...register("phoneNumber")}
              type="tel"
            />
            <p className={style.errorMessage}>
              <span>{errors?.phoneNumber?.message}</span>

            </p>
          </div>

          <p className={style.errorMessage}>
            <span>{userError}</span>
          </p>

          <div className={style.confirmBtnContainer}>
            <button
              type="submit"
              className={classNames(style.checkoutBtn)}
            >
              {userLoading ? "LOADING.." : "UPDATE"}
            </button>

            <button className={classNames(style.checkoutBtn, style.bgGray)} onClick={signOut}>
              SIGN OUT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;
