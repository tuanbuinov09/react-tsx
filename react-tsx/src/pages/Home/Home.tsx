import { products } from "../../data/mock-data";
import style from "./Home.module.css";
import { Product } from "../../data/models/Product";
import Card from "../../components/Card/Card";

function Home() {
  return (
    <div className={style.container}>
      {products.map((item: Product) => (
        <Card key={item.id} product={item} />
      ))}
    </div>
  );
}

export default Home;
