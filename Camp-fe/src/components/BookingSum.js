import "../style/BookingSum.scss";
import React, { useState, useEffect } from "react";

import { useCart } from "./useCart";
import { useSecondCart } from "./useSecondCart";
import axios from "axios";
import { Link } from "react-router-dom";
function BookingSum() {
  const firstCart = useCart();
  const secondCart = useSecondCart();
  console.log(firstCart.cart.totalItems + secondCart.cart.totalItems);
  console.log(firstCart.cart.cartTotal + secondCart.cart.cartTotal);

  // 促銷碼
  // where id & promo_code
  const [coupon, setCoupon] = useState({
    coupon: "",
  });
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState();
  const [couponSuccess, setCouponSuccess] = useState();

  function handleCoupon(e) {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  }

  // 把輸入的折扣碼送到後端去判斷，再傳結果回來
  async function couponSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:3002/api/products/coupon/1",
        coupon
      );
      // console.log(response.data[0].discount);
      setDiscount(response.data[0].discount);
      setCouponError();
      setCouponSuccess("使用成功");
      setWaitingInfo({ ...waitingInfo, used_coupon: coupon.coupon });
    } catch (e) {
      if (e.response.data.msg === "無法使用此折扣碼") {
        setCouponError("無法使用此折扣碼");
      }
    }
  }
  // 要放session的 使用的折扣碼改成無法使用、點數改成剩下的、運費、總額
  const [waitingInfo, setWaitingInfo] = useState({
    used_coupon: "",

    final_total: "",
  });
  return (
    <>
      <div className="cart-dividing-line-full"></div>
      <div className="row cart-total-block">
        <div className="col">
          <form>
            <div>有折扣碼嗎?</div>
            <div className="cart-discount-input d-flex">
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={coupon.coupon}
                onChange={handleCoupon}
              />
              <button type="submit" onClick={couponSubmit}>
                加入
              </button>
            </div>
            {/* 錯誤訊息 */}
            {couponError === "無法使用此折扣碼" ? (
              <h5 className="coupon-error">{couponError}</h5>
            ) : (
              <h5 className="coupon-error">{couponSuccess}</h5>
            )}
          </form>
        </div>
        <div className="col">
          <div className="d-flex justify-content-between">
            <div>帳篷定價</div>
            <div>NT${firstCart.cart.cartTotal}</div>
          </div>

          <div className="d-flex justify-content-between">
            <div>活動總價</div>
            <div>NT${secondCart.cart.cartTotal}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>折扣碼</div>
            <div>－NT${discount}</div>
          </div>
          <div className="cart-dividing-line-short"></div>
          <div className="d-flex justify-content-between">
            <div>訂單總額</div>
            <div>
              NT$
              {firstCart.cart.cartTotal + secondCart.cart.cartTotal - discount}
            </div>
          </div>
          <div>
            <Link to={`/orders/booking_info`}>
              <button className="cart-checkout-btn">下一步填寫資料</button>
            </Link>
          </div>
          <div>
            <button className="cart-continue-btn">返回列表</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingSum;
