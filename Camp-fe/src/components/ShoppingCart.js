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

// 購物車內容-----------------------------------------------------------------
function CartProducts() {
  // 取購物車資料
  let cart = JSON.parse(localStorage.getItem("cartProduct"));
  // console.log(cart);

  const [inCart, setInCart] = useState(cart);

  // 加減數量
  function handleChange(e, index) {
    const newInCart = [...inCart];
    newInCart[index].amount = Number(e.target.value);
    setInCart(newInCart);
  }

  // 刪除單筆
  function removeOne(index) {
    const result = inCart.filter((v, i) => i !== index);
    setInCart(result);
    localStorage.clear();
    console.log(result);
    let cartString = JSON.stringify(result);
    localStorage.setItem("cartProduct", cartString);
  }
  // setInCart不知道什麼時候才會變(由react控制)，所以沒辦法馬上抓到，但如果設成變數就會馬上寫入，能馬上抓到

  // 清空購物車
  function removeAll() {
    localStorage.clear();
  }

  // 點愛心
  const [heart, setHeart] = useState(false);
  const toggleSwitch = () => setHeart((previousState) => !previousState);

  const clickHeart = heart ? heartFull : heartEmpty;

  return (
    <>
      {/* 上半部內容 */}
      <div className="clear-cart text-right">
        <button onClick={removeAll}>清空購物車</button>
      </div>
      <div className="cart-dividing-line-full"></div>

      {/* 購物車內商品 */}
      <div>
        {/* {localStorage.getItem("cartProduct") != null ? "有東西" : "沒東西"} */}
        {/* 01 */}
        {inCart.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="cart-product row">
                <div className="col-4">
                  <div className="cart-product-pic embed-responsive embed-responsive-1by1">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      alt=""
                      className="embed-responsive-item"
                    />
                  </div>
                </div>
                <div className="col-8">
                  <div className="cart-content d-flex justify-content-between align-items-center">
                    <div className="cart-producr-title">
                      <h3>{item.product_name}</h3>
                      <h5>顏色：{item.color}</h5>
                      <h5>尺寸：{item.size}</h5>
                    </div>
                    <div>
                      {/* <NumericInput min={1} max={100} value={20} mobile /> */}
                      <input
                        type="number"
                        min="1"
                        max={item.product_stock}
                        value={inCart[index].amount}
                        name="amount"
                        onChange={(event) => handleChange(event, index)}
                      ></input>
                    </div>
                    <h3>NT${item.product_price}</h3>
                    <div className="d-flex">
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeOne(index)}
                      >
                        移除
                      </button>
                      <button
                        className="cart-product-heart"
                        onClick={() => toggleSwitch()}
                      >
                        <img src={clickHeart} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="cart-use-point d-flex justify-content-end align-items-center">
                    <h3>使用 {item.product_point} 點兌換此商品嗎?</h3>
                    <button>使用</button>
                  </div>
                </div>
              </div>
              <div className="cart-dividing-line-medium"></div>
            </React.Fragment>
          );
        })}
      </div>

      {/* 總和結帳 */}
      <ShoppingCartSum />
    </>
  );
}

// 空的購物車----------------------------------------------------------------
function EmptyCart() {
  return (
    <>
      {/* 上半部內容 */}
      <div className="clear-cart text-right">
        <button>清空購物車</button>
      </div>
      <div className="cart-dividing-line-full"></div>
      <h3 className="text-center empty-cart">購物車是空的喔！</h3>
      <div className="cart-dividing-line-full"></div>
      <div className="empty-cart-btn-div">
        <button className="cart-next-btn">購物去</button>
      </div>
    </>
  );
}

// 購物車主體----------------------------------------------------------------
function ShoppingCart() {
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
          {localStorage.getItem("cartProduct") != null ? (
            <CartProducts />
          ) : (
            <EmptyCart />
          )}
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
