import classNames from "classnames";
import { useEffect, useState, useLayoutEffect, useContext } from "react";
import style from "./ProductDetail.module.css";
import { products } from "../../data/mock-data.ts";
import OrderContext from "../../contexts/OrderContext.ts";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../../data/models/Product";

interface ProductDetail {
  size: string;
  quantity: number;
}

function ProductDetail() {
  const navigate = useNavigate();
  const { productID } = useParams();
  const { orderItems, updateOrderItems } = useContext(OrderContext);

  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    sizes: [],
    price: 0,
    image: null,
    description: "",
  });

  const [selectedProductDetail, setSelectedProductDetail] =
    useState<ProductDetail>({
      size: "",
      quantity: 1,
    });

  useLayoutEffect(() => {
    if (productID === "undefined" || productID === "null") {
      navigate("");
      return;
    }

    const productFromDataSource = products.find((x) => x.id === productID);

    if (!productFromDataSource) {
      navigate("");
      return;
    }

    setProduct(productFromDataSource);
    setSelectedProductDetail({
      ...selectedProductDetail,
      size: productFromDataSource.sizes[0],
    });
  }, [productID]);

  useEffect(() => {
    // console.log("selected:", selectedProductDetail);
  }, [selectedProductDetail]);

  const updateProductDetail = (updatedProductDetail: any) => {
    setSelectedProductDetail((s) => {
      return { ...s, ...updatedProductDetail };
    });
  };

  const addToOrder = () => {
    if (selectedProductDetail.quantity === 0) {
      return;
    }

    if (orderItems.length === 0) {
      orderItems.push({
        ...product,
        ...selectedProductDetail,
        dateAdded: new Date(),
      });
    } else {
      const productInCart = orderItems.find(
        (x) => x.id === product?.id && x.size === selectedProductDetail.size
      );

      if (productInCart) {
        productInCart.quantity =
          productInCart.quantity + selectedProductDetail.quantity;
      } else {
        orderItems.push({
          ...product,
          ...selectedProductDetail,
          dateAdded: new Date(),
        });
      }
    }

    updateOrderItems(orderItems);
  };

  const increaseQuantity = () => {
    if (selectedProductDetail.quantity === 20) return;

    updateProductDetail({ quantity: selectedProductDetail.quantity + 1 });
  };

  const decreaseQuantity = () => {
    if (selectedProductDetail.quantity === 0) return;

    updateProductDetail({ quantity: selectedProductDetail.quantity - 1 });
  };

  return (
    <>
      {product ? (
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.imgContainer}>
              <img alt="none" src={product.image} className={style.img} />
            </div>
          </div>
          <div className={style.right}>
            <h2 className={style.title}>{product.name}</h2>

            <div className={style.flex}>
              <div className={style.subtitle}>Size: </div>
              <div className={style.sizeContainer}>
                {product.sizes.map((s: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className={[
                        classNames(style.size, {
                          [style.active]: s === selectedProductDetail.size,
                        }),
                      ].join(" ")}
                      onClick={() => {
                        updateProductDetail({ size: s });
                      }}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className={style.price}>
              <span className={style.priceLabel}>Price: </span>
              <span>{`${product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`}</span>
            </p>

            <div className={style.desc}>
              {product.description ? product.description : "No description"}
            </div>

            <div className={style.btnContainer}>
              <button className={style.quantityBtn} onClick={decreaseQuantity}>
                -
              </button>

              <div className={style.quantity}>
                {selectedProductDetail.quantity}
              </div>

              <button className={style.quantityBtn} onClick={increaseQuantity}>
                +
              </button>
            </div>

            <div className={style.btnContainer}>
              <button
                onClick={addToOrder}
                className={[
                  classNames(style.btn, {
                    [style.disabled]: selectedProductDetail.quantity === 0,
                  }),
                ].join(" ")}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProductDetail;
