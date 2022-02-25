import React, { useState } from "react";

import "../style/ShoppingCartSum.scss";

function ShoppingCartSum() {
  // 取購物車資料
  let cart = JSON.parse(localStorage.getItem("cartProduct"));

  const [inCart, setInCart] = useState(cart);
  // console.log(inCart);
  // console.log(inCart[1]["product_price"]);

  // let total = inCart[1]["product_price"] * inCart[1]["amount"];
  // console.log(total);
  // console.log(inCart.length);

  return (
    <>
      <div className="cart-dividing-line-full"></div>
      <div className="row cart-total-block">
        <div className="col">
          <div>有促銷碼嗎?</div>
          <div className="cart-discount-input d-flex">
            <input></input>
            <button>加入</button>
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-between">
            <div>商品總額</div>
            <div>NT$4,600</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>運費</div>
            <div>NT$60</div>
          </div>
          {/* <div className="d-flex justify-content-between">
            <div>折扣</div>
            <div>－NT$60</div>
          </div> */}
          <div className="d-flex justify-content-between">
            <div>促銷碼</div>
            <div>－NT$600</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>集點兌換</div>
            <div>－NT$600</div>
          </div>
          <div className="cart-dividing-line-short"></div>
          <div className="d-flex justify-content-between">
            <div>訂單總額</div>
            <div>NT$33040</div>
          </div>
          <div>
            <button className="cart-checkout-btn">結帳</button>
          </div>
          <div>
            <button className="cart-continue-btn">繼續購物</button>
          </div>
          <div className="cart-point-this-time d-flex justify-content-between">
            <div>您的本次使用集點：</div>
            <div>20點</div>
          </div>
          <div className="cart-point-rest d-flex justify-content-between">
            <div>您的剩餘集點：</div>
            <div>90點</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCartSum;
