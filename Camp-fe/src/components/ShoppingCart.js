import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import EmptyCart from "./EmptyCart";
import CartProducts from "./CartProducts";
import Footer from "./Footer";

import "../style/ShoppingCart.scss";
import "../style/ShoppingCartSum.scss";
import "../style/NumericInput.scss";

// 圖片
import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";

function ShoppingCart() {
  // 判斷是否登入
  const [logData, setLogData] = useState(null);
  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      try {
        let result = await axios.get(`http://localhost:3002/member`, {
          withCredentials: true,
        });
        console.log("app.js id", result.data.id);
        setLogData(result.data);
      } catch (e) {
        alert("您尚未登入，請登入後繼續");
        setLogData(false);

        // 尚未登入過
        // 401 也不會去 setMember
      }
    };
    getMember();
  }, []);
  // console.log("logData", logData);

  let loginId;
  if (logData !== null) {
    // console.log("logData.id", logData.id);
    loginId = logData.id;
  }

  // -------------------------------------------------
  // 取購物車資料
  let cart;
  if (
    localStorage.getItem("cartProduct") === null ||
    localStorage.getItem("cartProduct").length < 3
  ) {
    cart = [];
    // console.log("空的");
  } else {
    cart = JSON.parse(localStorage.getItem("cartProduct"));
    // console.log("有東西");
  }
  const [inCart, setInCart] = useState(cart);

  if (logData === false) {
    // 轉頁效果
    return <Navigate to="/login" />;
  }

  return (
    <>
      <main className="shopping-cart-main">
        <div className="container">
          {/* 上半部內容 */}
          {/* <ShoppingCartTitle /> */}
          <div className="shopping-cart-title">
            <h2 className="text-center">您的訂購資訊</h2>
          </div>
          <div className="checkout-flow d-flex justify-content-between align-items-center">
            <h3 className="checkout-flow-bg-green">購物車</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3>付款資訊</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3>運送資訊</h3>
          </div>
          {inCart === null || inCart < 3 ? (
            <EmptyCart />
          ) : (
            <CartProducts
              inCart={inCart}
              setInCart={setInCart}
              loginId={loginId}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ShoppingCart;
