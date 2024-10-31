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
import { Product } from "./models/Product";

const randomGuids: string[] = [
  "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
  "9b2e5d60-4f89-11d3-9a0c-0305e82c3302",
  "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
  "6fa459ea-ee8a-3ca4-894e-db77e160355e",
  "7d444840-9dc0-11d1-b245-5ffdce74fad2",
  "e2c56db5-dffb-48d2-b060-d0f5a71096e0",
  "a3bb189e-8bf9-3888-9912-ace4e6543002",
  "d9428888-122b-11e1-b85c-61cd3cbb3210",
  "e3589d60-1aa2-11e3-9c8b-0800200c9a66",
  "f47ac10b-58cc-4372-a567-0e02b2c3d479",
];

export const products: Array<Product> = [
  {
    id: randomGuids[0],
    name: "Jacket vip pro 123",
    sizes: ["S", "M", "L", "XL"],
    price: 26,
    description: "",
    image: productImage1,
  },
  {
    id: randomGuids[1],
    name: "Button down to earth 456",
    sizes: ["S", "M", "L", "XL"],
    price: 20,
    description: "Vip shirt imported from Mars",
    image: productImage2,
  },
  {
    id: randomGuids[2],
    name: "Pro pants 789",
    sizes: ["29", "30", "31", "32"],
    price: 22,
    description: "",
    image: productImage3,
  },
  {
    id: randomGuids[3],
    name: "Polo polar bear",
    sizes: ["M", "L", "XL"],
    price: 18.99,
    description: "",
    image: productImage4,
  },
  {
    id: randomGuids[4],
    name: "Polo pala lara",
    sizes: ["S", "M", "L", "XL"],
    price: 20,
    description: "",
    image: productImage5,
  },
  {
    id: randomGuids[5],
    name: "Polo long sleeves hihi haha",
    sizes: ["M", "L", "XL"],
    price: 20,
    description: "",
    image: productImage6,
  },
  {
    id: randomGuids[6],
    name: "Polo brownie",
    sizes: ["M", "L", "XL"],
    price: 21.99,
    description: "",
    image: productImage7,
  },
  {
    id: randomGuids[7],
    name: "Dark blue button down shirt",
    sizes: ["M", "L", "XL"],
    price: 20,
    description: "",
    image: productImage8,
  },
  {
    id: randomGuids[8],
    name: "T shirt",
    sizes: ["M", "L", "XL"],
    price: 14.99,
    description: "",
    image: productImage9,
  },
  {
    id: randomGuids[9],
    name: "Checkered polo",
    sizes: ["M", "L", "XL"],
    price: 24.99,
    description: "",
    image: productImage10,
  },
];
