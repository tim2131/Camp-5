import '../style/ShoppingCartTitle.scss';

import shoppingCartArrow from '../img/icon/shopping-cart-arrow.svg';

function ShoppingCartTitle() {
  return (
    <>
      <div className="shopping-cart-title">
        <h2 className="text-center">您的訂購資訊</h2>
      </div>
      <div className="checkout-flow d-flex justify-content-between align-items-center">
        <h3 className="checkout-flow-cart">購物車</h3>
        <div>
          <img src={shoppingCartArrow} alt="" />
        </div>
        <h3 className="checkout-flow-pay">付款資訊</h3>
        <div>
          <img src={shoppingCartArrow} alt="" />
        </div>
        <h3 className="checkout-flow-deliver">運送資訊</h3>
      </div>
      <div className="clear-cart text-right">
        <button>清除購物車</button>
      </div>
      <div className="cart-dividing-line-full"></div>
    </>
  );
}

export default ShoppingCartTitle;
