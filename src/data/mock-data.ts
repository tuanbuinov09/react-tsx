import productImage1 from "../assets/khoac-m-dutti-tay-chun-den_12.jpeg";
import productImage2 from "../assets/so-mi-lacoste-trang.webp";
import productImage3 from "../assets/au-p-cardin-den.webp";
import productImage4 from "../assets/den-polo-bur.jpg";
import productImage5 from "../assets/photo_2022-12-16_13-02-57_b82dfaa42fe04bd9a1af387e117a57fe_master.jpg";
import productImage6 from "../assets/polo-daitay-bubery-trang.jpg";
import productImage7 from "../assets/polo-fred-nau.jpg";
import productImage8 from "../assets/so-mi-lacoste-xanhden.webp";
import productImage9 from "../assets/tthun-lacoste-den.jpg";
import productImage10 from "../assets/xanh-nhat.jpg";

export class Product {
  id: number;
  name: string;
  sizes: string[];
  price: number;
  description: string;
  image: any;

  constructor(
    id: number,
    name: string,
    sizes: string[],
    price: number,
    description: string,
    image: any
  ) {
    this.id = id;
    this.name = name;
    this.sizes = sizes;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

export const products: Array<Product> = [
  new Product(
    1,
    "Jacket vip pro 123",
    ["S", "M", "L", "XL"],
    26,
    "",
    productImage1
  ),
  new Product(
    2,
    "Button down to earth 456",
    ["S", "M", "L", "XL"],
    20,
    "Vip shirt imported from Mars",
    productImage2
  ),
  new Product(
    3,
    "Pro pants 789",
    ["29", "30", "31", "32"],
    22,
    "",
    productImage3
  ),
  new Product(4, "Polo polar bear", ["M", "L", "XL"], 18.99, "", productImage4),
  new Product(
    5,
    "Polo pala lara",
    ["S", "M", "L", "XL"],
    20,
    "",
    productImage5
  ),
  new Product(
    6,
    "Polo long sleeves hihi haha",
    ["M", "L", "XL"],
    20,
    "",
    productImage6
  ),
  new Product(7, "Polo brownie", ["M", "L", "XL"], 21.99, "", productImage7),
  new Product(
    8,
    "Dark blue button down shirt",
    ["M", "L", "XL"],
    20,
    "",
    productImage8
  ),
  new Product(9, "T shirt", ["M", "L", "XL"], 14.99, "", productImage9),
  new Product(
    10,
    "Checkered polo",
    ["M", "L", "XL"],
    24.99,
    "",
    productImage10
  ),
];
