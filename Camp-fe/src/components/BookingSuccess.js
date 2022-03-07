import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../style/OrderFlow.scss";

function BookingSuccess() {
  return (
    <>
      <main className="shopping-cart-main">
        <div className="container">
          {/* 上半部內容 */}
          {/* <ShoppingCartTitle /> */}
          <div className="shopping-cart-title">
            <h2 className="text-center">您的訂房資訊</h2>
          </div>
          <div className="cart-dividing-line-full"></div>

          {/* 內容 */}
          <div className="order_content">
            <h3 className="text-center">
              恭喜你! 你已經完成了訂購!
              {/* 訂單編號為: 00000001 */}
            </h3>
            {/* <h3 className="text-center">
              我們稍後將會寄送確認郵件到你的信箱: test@test.com
            </h3> */}
          </div>
          <div className="cart-dividing-line-full"></div>

          {/* 按鈕 */}
          <div className="cart-dividing-line-full"></div>
          <div className="cart-next-back-btn-block">
            <button type="submit" className="cart-next-btn">
              前往我的訂單
            </button>
            <Link to="/">
              <button className="cart-back-btn">返回首頁</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default BookingSuccess;
