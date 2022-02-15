import React, { useState } from 'react';

import '../style/ShoppingCart.scss';
import ShoppingCartTitle from './ShoppingCartTitle';
import ShoppingCartSum from './ShoppingCartSum';
// 數量加減元件
import NumericInput from 'react-numeric-input';
import '../style/NumericInput.scss';

// 圖片
// import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";
import cartProduct from '../img/product1.jpeg';
import heartEmpty from '../img/icon/heart-empty.svg';
import heartFull from '../img/icon/heart-full.svg';

function ShoppingCart() {
  // 點愛心
  const [heart, setHeart] = useState(false);
  const toggleSwitch = () => setHeart((previousState) => !previousState);

  const clickHeart = heart ? heartFull : heartEmpty;

  return (
    <>
      <main className="shopping-cart-main">
        <div className="container custom-container-width">
          {/* 上半部內容 */}
          <ShoppingCartTitle />

          {/* 購物車內商品 */}
          <div>
            {/* 01 */}
            <div className="cart-product row">
              <div className="col-4">
                <div className="cart-product-pic">
                  <img src={cartProduct} alt="" />
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
                <div className="cart-product-pic">
                  <img src={cartProduct} alt="" />
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
