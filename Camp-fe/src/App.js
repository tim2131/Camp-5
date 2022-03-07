import React from "react";
import { Routes, Route } from "react-router-dom";

import "./style/App.css";

import Navbar from "./components/navbar/navbar";
// import Navbar from "./components/Navbar";
import Home from "./pages/home";
// import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import PaymentForGoods from "./components/PaymentForGoods";
import ShipmentCreditCard from "./components/ShipmentCreditCard";
import ShipmentConvenienceStore from "./components/ShipmentConvenienceStore";
import OrderSuccess from "./components/OrderSuccess";
import Footer from "./components/Footer";
import CampList from "./components/CampList";
import Login from "./components/Login";
import CampLogin from "./components/CampLogin";
import Signupuser from "./components/Signupuser";
import Signupcamp from "./components/Signupcamp";
import Forgotpw from "./components/Forgotpw";
import InputCode from "./components/InputCode";
import CampDetail from "./components/CampDetail";
import { AuthContext } from "./auth/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import Booking from "./components/Booking";

function App() {
  const [member, setMember] = useState(null);
  const [campmember, setCampMember] = useState(null);

  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      try {
        let result = await axios.get("http://localhost:3002/member", {
          withCredentials: true,
        });

        setMember(result.data);
      } catch (e) {
        // 尚未登入過
        // 401 也不會去 setMember
      }
    };
    getMember();
  }, []);
  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getCampMember = async () => {
      try {
        let result2 = await axios.get("http://localhost:3002/campmember", {
          withCredentials: true,
        });

        setCampMember(result2.data);
      } catch (e) {
        // 尚未登入過
        // 401 也不會去 setMember
      }
    };
    getCampMember();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ member, setMember, campmember, setCampMember }}
      >
        <div className="App">
          {/* <BrowserRouter> */}
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/camplist" exact element={<CampList />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/camplogin" exact element={<CampLogin />} />
            <Route path="/signupuser" exact element={<Signupuser />} />
            <Route path="/signupcamp" exact element={<Signupcamp />} />
            <Route path="/Forgotpw" exact element={<Forgotpw />} />
            <Route path="/code" exact element={<InputCode />} />
            <Route path="/camp/:campId" element={<CampDetail />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/p_orders/cart" element={<ShoppingCart />} />
            <Route path="/p_orders/payment" element={<PaymentForGoods />} />
            <Route path="/booking/:campId" element={<Booking />} />


            <Route
              path="/p_orders/shipment/credit_card"
              element={<ShipmentCreditCard />}
            />
            <Route
              path="/p_orders/shipment/convenience_store"
              element={<ShipmentConvenienceStore />}
            />
            <Route path="/p_orders/success" element={<OrderSuccess />} />
          </Routes>
          {/* <Footer /> */}
          <ProductDetail />
          {/* </BrowserRouter> */}
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
