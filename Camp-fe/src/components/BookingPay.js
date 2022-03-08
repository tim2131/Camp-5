import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../style/OrderFlow.scss";
import "../style/ShoppingCartTitle.scss";

import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";
import Footer from "./Footer";

// 信用卡----------------------------------------------------------
function CreditCard() {
  // 信用卡資料
  const [creditCardInfo, setCreditCardInfo] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    validThru: "",
    csc: "",
  });

  function handleChange(e) {
    setCreditCardInfo({ ...creditCardInfo, [e.target.name]: e.target.value });
  }
  console.log(creditCardInfo);

  function saveSession() {
    let waitingInfo = JSON.parse(sessionStorage.getItem("waitingInfo"));
    let newWaitingInfo = { ...waitingInfo, payment: 6 }; // 信用卡 -> 已付款
    let waitingInfoString = JSON.stringify(newWaitingInfo);
    sessionStorage.setItem("waitingInfo", waitingInfoString);
  }

  // 送出按鈕
  async function handleSubmit(e) {
    e.preventDefault();
    let response = await axios.post(
      "http://localhost:3002/api/products/payment",
      creditCardInfo
    );
    console.log(creditCardInfo);
    console.log(response.data);
  }

  return (
    <>
      <div className="product-payment-title text-center">
        <h3>信用卡付款資訊</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="product-payment-input m-auto">
          <div>
            <h6>您的姓名</h6>
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="請輸入名字"
                value={creditCardInfo.firstName}
                onChange={handleChange}
              />
              <input
                className="product-payment-input-right"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="請輸入姓氏"
                value={creditCardInfo.lastName}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div>
            <h6>您的信用卡卡號</h6>
            <div>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="請輸入信用卡卡號"
                value={creditCardInfo.cardNumber}
                onChange={handleChange}
              ></input>
              <div></div>
            </div>
          </div>
          <div>
            <h6>信用卡日期</h6>
            <div>
              <input
                type="text"
                id="validThru"
                name="validThru"
                placeholder="請輸入信用卡日期"
                value={creditCardInfo.validThru}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div>
            <h6>信用卡驗證碼</h6>
            <div>
              <input
                type="text"
                id="csc"
                name="csc"
                placeholder="請輸入信用卡驗證碼"
                value={creditCardInfo.csc}
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>

        {/* 送出按鈕 */}
        <div className="cart-dividing-line-full"></div>
        <div className="cart-next-back-btn-block">
          <Link to="/orders/success">
            <button type="submit" className="cart-next-btn">
              完成預定
            </button>
          </Link>
          <Link to="/orders/booking_info">
            <button className="cart-back-btn">返回上一步</button>
          </Link>
        </div>
      </form>
    </>
  );
}

// 主體----------------------------------------------------------
function BookingPay() {
  return (
    <>
      <main className="shopping-cart-main">
        <div className="container">
          {/* 上半部內容 */}
          {/* <ShoppingCartTitle /> */}
          <div className="shopping-cart-title">
            <h2 className="text-center">您的訂房資訊</h2>
          </div>
          <div className="checkout-flow checkout-flow-margin d-flex justify-content-between align-items-center">
            <h3>訂房資訊</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3>您的資料</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3 className="checkout-flow-bg-green">付款資訊</h3>
          </div>
          <div className="cart-dividing-line-full"></div>
        </div>
        <CreditCard />
      </main>
      <Footer />
    </>
  );
}

export default BookingPay;
