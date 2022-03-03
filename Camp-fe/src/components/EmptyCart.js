import React from "react";

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

export default EmptyCart;
