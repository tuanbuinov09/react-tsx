import style from "./SignUp.module.css";
import image from "../../assets/062_Outline_OnlineShopping_MS.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { AlphabeticCharactersOnly, EmailRegex } from "../../constants/Regexes";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    alert(JSON.stringify(data));

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img className={style.image} src={image} alt="login" />{" "}
      </div>
      <div className={style.right}>
        <h3 className={style.title}>LOGIN</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputGroup}>
            <label className={style.label}>Full name: </label>
            <input
              className={style.textInput}
              {...register("fullName", {
                required: true,
                maxLength: 50,
                pattern: AlphabeticCharactersOnly,
              })}
            />
            <p className={style.errorMessage}>
              {errors.fullName && errors.fullName.type === "required" && (
                <span>This is required</span>
              )}
              {errors.fullName && errors.fullName.type === "maxLength" && (
                <span>Max length exceeded</span>
              )}
              {errors.fullName && errors.fullName.type === "pattern" && (
                <span>Invalid name</span>
              )}
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Email: </label>
            <input
              className={style.textInput}
              {...register("email", {
                required: true,
                maxLength: 50,
                pattern: EmailRegex,
              })}
              // type="email"
            />
            <p className={style.errorMessage}>
              {errors.email && errors.email.type === "required" && (
                <span>This is required</span>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <span>Max length exceeded</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span>Invalid email</span>
              )}
            </p>
          </div>
          <div className={style.inputGroup}>
            <label className={style.label}>Password: </label>

            <input
              className={style.textInput}
              {...register("password", { required: true })}
              type="password"
            />

            <p className={style.errorMessage}>
              {errors.password && errors.password.type === "required" && (
                <span>This is required</span>
              )}
            </p>
          </div>

          <div className={style.inputGroup}>
            <label className={style.label}>Repeat password: </label>

            <input
              className={style.textInput}
              {...register("repeatPassword", {
                required: true,
              })}
              type="password"
            />

            <p className={style.errorMessage}>
              {errors.repeatPassword &&
                errors.repeatPassword.type === "required" && (
                  <span>This is required</span>
                )}
            </p>
          </div>

          <div>
            <p className={style.textAlignRight}>
              Already had an account? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
          <button className={style.checkoutBtn} type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
