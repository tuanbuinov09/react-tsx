import style from "./Login.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { EmailRegex } from "../../constants/Regexes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLocalStorage from "../../hooks/useLocalStorage";

interface FormValues {
  email: string;
  password: string;
}

const formSchema = yup.object<FormValues>().shape({
  email: yup.string()
    .required("Email is required")
    .matches(EmailRegex, "Invalid email"),
  password: yup.string()
    .required("Password is required"),
});

function Login() {
  const [_, setLoginStatus] = useLocalStorage('loginStatus', false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert(JSON.stringify(data));
    setLoginStatus(true);
    navigate('/');
  }

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img className={style.image} src={image} alt="login" />{" "}
      </div>
      <div className={style.right}>
        <h3 className={style.title}>LOGIN</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div>
            <p className={style.textAlignRight}>
              New to the shop? <NavLink to="/sign-up">Sign up</NavLink>
            </p>
          </div>
          <button className={style.checkoutBtn} type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
