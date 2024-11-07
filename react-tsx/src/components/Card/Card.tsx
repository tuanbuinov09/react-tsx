import { Product } from "../../data/models/Product";
import style from "./Card.module.css";
import { useNavigate } from "react-router-dom";

function Card(props: { product: Product }) {
  const product = props.product;
  const navigate = useNavigate();

  return (
    <div
      className={style.card}
      onClick={() => {
        navigate(`/products/${product.id}`);
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

export default Card;
