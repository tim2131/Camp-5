import React, { useState, useEffect } from "react";

import EmptyCart from "./EmptyCart";
import CartProducts from "./CartProducts";

import "../style/ShoppingCart.scss";
import "../style/ShoppingCartSum.scss";
// 數量加減元件
// import NumericInput from "react-numeric-input";
import "../style/NumericInput.scss";

// 圖片
import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";

function ShoppingCart() {
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
          {/* 無法馬上判斷? */}
          {/* 結構有問題，要有父子(import) */}
          {/* 有key但空陣列 */}
          {inCart === null || inCart < 3 ? (
            <EmptyCart />
          ) : (
            <CartProducts inCart={inCart} setInCart={setInCart} />
          )}
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
