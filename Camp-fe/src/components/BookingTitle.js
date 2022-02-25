import "../style/BookingTitle.scss";

import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";

function BookingTitle() {
  return (
    <>
      <div className="shopping-cart-title">
        <h2 className="text-center">您的訂房資訊</h2>
      </div>
      <div className="checkout-flow d-flex justify-content-between align-items-center">
        <h3 className="checkout-flow-cart">訂房資訊</h3>
        <div>
          <img src={shoppingCartArrow} alt="" />
        </div>
        <h3 className="checkout-flow-pay">您的資料</h3>
        <div>
          <img src={shoppingCartArrow} alt="" />
        </div>
        <h3 className="checkout-flow-deliver">付款資訊</h3>
      </div>
      <div className="cart-dividing-line-full"></div>
    </>
  );
}

export default BookingTitle;
