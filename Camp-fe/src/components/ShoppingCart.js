import React, { useState } from "react";

import "../style/ShoppingCart.scss";
import ShoppingCartSum from "./ShoppingCartSum";
// 數量加減元件
import NumericInput from "react-numeric-input";
import "../style/NumericInput.scss";

// 圖片
import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";
import cartProduct from "../img/product1.jpeg";
import heartEmpty from "../img/icon/heart-empty.svg";
import heartFull from "../img/icon/heart-full.svg";

function ShoppingCart() {
  // 點愛心
  const [heart, setHeart] = useState(false);
  const toggleSwitch = () => setHeart((previousState) => !previousState);

  const clickHeart = heart ? heartFull : heartEmpty;

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
          <div className="clear-cart text-right">
            <button>清除購物車</button>
          </div>
          <div className="cart-dividing-line-full"></div>

          {/* 購物車內商品 */}
          <div>
            {/* 01 */}
            <div className="cart-product row">
              <div className="col-4">
                <div className="cart-product-pic embed-responsive embed-responsive-1by1">
                  <img
                    src={cartProduct}
                    alt=""
                    className="embed-responsive-item"
                  />
                </div>
              </div>
              <div className="col-8">
                <div className="cart-content d-flex justify-content-between align-items-center">
                  <div className="cart-producr-title">
                    <h3>環保防水外套</h3>
                    <h5>SKU:XXXXXXXX</h5>
                    <h5>Color:Black</h5>
                  </div>
                  <div>
                    <NumericInput min={1} max={100} value={20} mobile />
                  </div>
                  <h3>NT$ 0</h3>
                  <div className="d-flex">
                    <button className="cart-remove-btn">移除</button>
                    <button
                      className="cart-product-heart"
                      onClick={() => toggleSwitch()}
                    >
                      <img src={clickHeart} alt="" />
                    </button>
                  </div>
                </div>
                <div className="cart-use-point d-flex justify-content-end align-items-center">
                  <h3>使用10點兌換此商品嗎?</h3>
                  <button>使用</button>
                </div>
              </div>
            </div>
            <div className="cart-dividing-line-medium"></div>

            {/* 02 */}
            <div className="cart-product row">
              <div className="col-4">
                <div className="cart-product-pic embed-responsive embed-responsive-1by1">
                  <img
                    src={cartProduct}
                    alt=""
                    className="embed-responsive-item"
                  />
                </div>
              </div>
              <div className="col-8">
                <div className="cart-content d-flex justify-content-between align-items-center">
                  <div className="cart-producr-title">
                    <h3>環保防水外套</h3>
                    <h5>SKU:XXXXXXXX</h5>
                    <h5>Color:Black</h5>
                  </div>
                  <div>
                    <NumericInput min={1} max={100} value={20} mobile />
                  </div>
                  <h3>NT$ 0</h3>
                  <div className="d-flex">
                    <button className="cart-remove-btn">移除</button>
                    <button
                      className="cart-product-heart"
                      onClick={() => toggleSwitch()}
                    >
                      <img src={clickHeart} alt="" />
                    </button>
                  </div>
                </div>
                <div className="cart-use-point d-flex justify-content-end align-items-center">
                  <h3>使用10點兌換此商品嗎?</h3>
                  <button>使用</button>
                </div>
              </div>
            </div>
            <div className="cart-dividing-line-medium"></div>
          </div>

          {/* 總和結帳 */}
          <ShoppingCartSum />
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
