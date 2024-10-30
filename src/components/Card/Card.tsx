import style from "./Card.module.css";
import { Product } from "../../data/mock-data";
// import { useNavigate } from "react-router-dom";

function Card(props) {
  const product = props.product;
  // const navigate = useNavigate();

  return (
    <div
      className={style.card}
      onClick={() => {
        // navigate(`/product/${product.id}`);
      }}
    >
      <img src={product.image} alt={product.name} className={style.image} />
      <div className={style.detail}>
        <h3>{product.name}</h3>
        <p>
          Sizes:{" "}
          <span className={style.fieldValue}>{product.sizes.join(", ")}</span>
        </p>
        <p>
          Price:{" "}
          <span className={style.fieldValue}>
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: Product,
};

export default Card;
