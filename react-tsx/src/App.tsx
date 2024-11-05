import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderItem } from "./data/models/OrderItem";
import OrderContext from "./contexts/OrderContext";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";
import { ToastContainer } from "react-toastify";

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
    console.log(newOrderItems);

    newOrderItems.sort((a: OrderItem, b: OrderItem) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      const dateAddedA = a.dateAdded;
      const dateAddedB = b.dateAdded;

      if (dateAddedA < dateAddedB) {
        return 1;
      }

      if (dateAddedA > dateAddedB) {
        return -1;
      }

      return 0;
    });

    const totalQuantity = newOrderItems.reduce((acc, item) => {
      return item.quantity + acc;
    }, 0);

    setOrderItems(newOrderItems);
    setTotalOrderQuantity(totalQuantity);
    setLocalStorageOrderItems(newOrderItems);
  };

  useEffect(() => {
    console.log(orderItems, totalOrderQuantity);
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
            <Route path="/product/:productID" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter>
      </OrderContext.Provider>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </>
  );
}

export default App;
