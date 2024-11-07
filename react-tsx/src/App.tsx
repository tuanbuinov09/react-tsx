import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderItem } from "./data/models/OrderItem.ts";
import OrderContext from "./contexts/OrderContext";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";
import { ToastContainer } from "react-toastify";
import OrderDetail from "./pages/OrderDetail/OrderDetail.tsx";
import { calculateTotalQuantity, sortOrderItems } from "./utilities/orderItemsUtils.ts";
import Orders from "./pages/Orders/Orders.tsx";

function App() {
  const [orderItems, setOrderItems] = useState(new Array<OrderItem>());
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(0);
  const [localStorageOrderItems, setLocalStorageOrderItems] = useLocalStorage(
    "orderItems",
    []
  );

  useLayoutEffect(() => {
    if (orderItems.length === 0) {
      updateOrderItems(localStorageOrderItems);
    }
  }, []);

  const updateOrderItems = (newOrderItems: Array<OrderItem>) => {
    // console.log(newOrderItems);
    sortOrderItems(newOrderItems);

    const totalQuantity = calculateTotalQuantity(newOrderItems);

    setOrderItems(newOrderItems);
    setTotalOrderQuantity(totalQuantity);
    setLocalStorageOrderItems(newOrderItems);
  };

  useEffect(() => {
    console.log("orderItems and total:", orderItems, totalOrderQuantity);
  }, [orderItems, totalOrderQuantity]);

  const value = { orderItems, totalOrderQuantity, updateOrderItems };

  return (
    <>
      <OrderContext.Provider value={value}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:productID" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user" element={<User />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderID" element={<OrderDetail />} />
          </Routes>
        </BrowserRouter>
      </OrderContext.Provider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        //pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </>
  );
}

export default App;
