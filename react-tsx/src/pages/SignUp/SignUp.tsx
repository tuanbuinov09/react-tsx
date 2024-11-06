import style from "./SignUp.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { NoDigitsRegex, EmailRegex, PhoneNumberRegex } from "../../constants/Regexes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError, selectAuthLoading, selectUser, signUp } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { SignUpModel } from "../../data/models/SignUpModel";

const formSchema = yup.object<SignUpModel>().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(100, "Name cannot exceed more than 100 characters")
    .matches(NoDigitsRegex, "Invalid name"),
  email: yup
    .string()
    .required("Email is required")
    .max(200, "Email cannot exceed more than 200 characters")
    .matches(EmailRegex, "Invalid email"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .max(200, "Phone number cannot exceed more than 15 characters")
    .matches(PhoneNumberRegex, "Invalid Phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(30, "Password cannot exceed more than 30 characters"),
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .min(4, "Repeat password length should be at least 4 characters")
    .max(30, "Repeat password cannot exceed more than 30 characters")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

function SignUp() {
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();

  const newUser = useSelector(selectUser);
  const signUpLoading = useSelector(selectAuthLoading);
  const signUpError = useSelector(selectAuthError);

  useEffect(() => {
    if (!newUser) {
      return;
    }

    navigate('/login');
    toast(`Success, now you can use ${newUser.email} to login!`);
  }, [newUser]);

  useEffect(() => {
  }, [signUpLoading]);

  useEffect(() => {
  }, [signUpError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<SignUpModel>({
    resolver: yupResolver(formSchema),
  });

  let password;

  password = watch("password", "");

  const onSubmit: SubmitHandler<SignUpModel> = (data) => {
    dispatch(signUp(data));
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img className={style.image} src={image} alt="login" />{" "}
      </div>
      <div className={style.right}>
        <h3 className={style.title}>SIGN UP</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

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
            <label className={style.label}>Email: </label>
            <input
              className={style.textInput}
              {...register("email")}
            // type="email"
            />
            <p className={style.errorMessage}>
              <span>{errors?.email?.message}</span>
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
            <label className={style.label}>Password: </label>
            <input
              className={style.textInput}
              {...register("password")}
              type="password"
            />
            <p className={style.errorMessage}>
              <span>{errors?.password?.message}</span>
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Repeat password: </label>
            <input
              className={style.textInput}
              {...register("repeatPassword")}
              type="password"
            />
            <p className={style.errorMessage}>
              <span>{errors?.repeatPassword?.message}</span>
            </p>
          </div>

          <div>
            <p className={style.textAlignRight}>
              Already had an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>

          <p className={style.errorMessage}>
            <span>{signUpError}</span>
          </p>

          <button className={style.checkoutBtn} type="submit">
            {signUpLoading ? "LOADING.." : "SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
