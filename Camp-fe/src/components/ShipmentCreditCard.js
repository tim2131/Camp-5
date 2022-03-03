import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../style/OrderFlow.scss";

import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";

function ShipmentCreditCard() {
  // 購物車資料
  let cart = JSON.parse(localStorage.getItem("cartProduct"));
  console.log("cart", cart);

  // session資料 (剩餘點數、折扣碼哪張、運費、總額)
  let waitingInfo = JSON.parse(sessionStorage.getItem("waitingInfo"));
  console.log("waitingInfo", waitingInfo);

  // 信用卡資料
  const [creditCardShipment, setCreditCardShipment] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    setCreditCardShipment({
      ...creditCardShipment,
      [e.target.name]: e.target.value,
    });
  }

  // 送出按鈕
  async function handleSubmit(e) {
    // e.preventDefaul();
    // 信用卡資料
    let responseShipment = await axios.post(
      "http://localhost:3002/api/products/credit-card-shipment",
      creditCardShipment
    );
    console.log(responseShipment.data);

    // 進 product_order (session)
    let responseOrder = await axios.post(
      "http://localhost:3002/api/products/send-order",
      waitingInfo
    );
    sessionStorage.removeItem("waitingInfo");
    console.log(responseOrder.data);

    // 進 product_orderdet (購物車)
    let responseOrderdet = await axios.post(
      "http://localhost:3002/api/products/send-orderdet",
      cart
    );
    localStorage.setItem("cartProduct", []);
    console.log(responseOrderdet.data);
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
          <div className="checkout-flow checkout-flow-margin d-flex justify-content-between align-items-center">
            <h3>購物車</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3>付款資訊</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3 className="checkout-flow-bg-green">運送資訊</h3>
          </div>
          <div className="cart-dividing-line-full"></div>

          {/* 填寫欄位 */}
          <div className="product-payment-title text-center">
            <h3>您的收貨資料</h3>
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
                    value={creditCardShipment.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="product-payment-input-right"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="請輸入姓氏"
                    value={creditCardShipment.lastName}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <h6>您的電子信箱</h6>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="請輸入email"
                    value={creditCardShipment.email}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <h6>您的電話</h6>
                <div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="請輸入電話/手機"
                    value={creditCardShipment.phone}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <h6>您的帳單地址</h6>
                <div>
                  <input
                    className="shipment-input-short shipment-input-no-margin"
                    type="text"
                    id=""
                    name=""
                    placeholder="郵遞區號"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="縣市"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="鄉鎮市區"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="路名"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="段"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <input
                    className="shipment-input-short shipment-input-no-margin"
                    type="text"
                    id=""
                    name=""
                    placeholder="巷"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="弄"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="號"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="樓"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="shipment-input-short"
                    type="text"
                    id=""
                    name=""
                    placeholder="室"
                    value={creditCardShipment.csc}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>

            {/* 送出按鈕 */}
            <div className="cart-dividing-line-full"></div>
            <div className="cart-next-back-btn-block">
              <Link to="/p_orders/success">
                <button
                  type="submit"
                  className="cart-next-btn"
                  onClick={handleSubmit}
                >
                  確認送出
                </button>
              </Link>
              <Link to="/p_orders/payment">
                <button className="cart-back-btn">返回上一步</button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default ShipmentCreditCard;
