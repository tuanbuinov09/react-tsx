import style from "./Unauthorized.module.css";

const Unauthorized: React.FC<any> = () => {
  return (
    <div className={style.container}>
      <div className={style.orderItems}>
        <h3 className={style.title}>UNAUTHORIZED</h3>
        <span><a href="/login">{`Login`}</a>{" "} with the right privilege to continue</span>
      </div>
    </div >
  );
}

export default Unauthorized;
