import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../style/ShoppingCart.scss";
import "../style/ShoppingCartSum.scss";
import "../style/NumericInput.scss";

// 購物車內容-----------------------------------------------------------------
function CartProducts(props) {
  // 取購物車資料在前面的檔案
  // inCart, setInCart

  // 取後端資料
  const [user, setUser] = useState([]);
  const [favData, setFavData] = useState([]);
  useEffect(async () => {
    let responseUser = await axios.get(`http://localhost:3002/api/user/1`);
    setUser(responseUser.data[0]);
  }, []);

  // 加減數量
  function handleChange(e, index) {
    const newInCart = [...props.inCart];
    newInCart[index].amount = Number(e.target.value);
    props.setInCart(newInCart);
  }

  // 刪除單筆
  // 刪除單筆到最後localStorage中會剩下[]
  function removeOne(index) {
    const result = props.inCart.filter((v, i) => i !== index);
    props.setInCart(result);
    console.log(result);
    let cartString = JSON.stringify(result);
    localStorage.setItem("cartProduct", cartString);
  }
  // setInCart不知道什麼時候才會變(由react控制)，所以沒辦法馬上抓到，但如果設成變數就會馬上寫入，能馬上抓到

  // 使用點數
  const [usedPoint, setUsedPoint] = useState(0);
  const pointExchange = (index, points) => {
    let newCart = [...props.inCart];
    // console.log(newCart[index].point_exchange);
    if (newCart[index].point_exchange === undefined) {
      newCart[index].point_exchange = true;
      newCart[index].readonly_value = true;
      //如果已經被點擊過 有可能like是false or true
      //再點擊就會變相反定義
    } else {
      newCart[index].point_exchange = !newCart[index].point_exchange;
      newCart[index].readonly_value = !newCart[index].readonly_value;
    }
    // console.log(newCart[index]);
    if (newCart[index].point_exchange === true) {
      newCart[index].point_to_money = points;
      newCart[index].exchanged_money =
        newCart[index].product_price * newCart[index].amount;
    }
    props.setInCart(newCart);
    // console.log(newCart[index].point_exchange);
    // console.log(newCart[index].point_to_money);
    // console.log(newCart[index].exchanged_money);
  };

  // 計算點數折抵 錢&點數
  // 更改數量時不會更新
  let pointTrue = props.inCart.filter(function (item) {
    return item.point_exchange === true;
  });
  // console.log(pointTrue);
  let pointDiscount = 0;
  let exchangedMoney = 0;
  for (let i = 0; i < pointTrue.length; i++) {
    pointDiscount += pointTrue[i]["point_to_money"];
    exchangedMoney += pointTrue[i]["exchanged_money"];
  }
  // console.log(pointDiscount);
  // console.log(exchangedMoney);

  // 剩餘集點
  let leftPoint = user.point - pointDiscount;
  useEffect(() => {
    setWaitingInfo({ ...waitingInfo, remain_point: leftPoint });
    console.log("waitingInfo", waitingInfo);
  }, [leftPoint]);

  // 清空購物車
  function removeAll() {
    // 不要清空 設成空陣列
    localStorage.setItem("cartProduct", []);
    props.setInCart([]);
  }

  // 總和--------------------------------------------------------------
  // 商品總額
  let total = 0;
  for (let i = 0; i < props.inCart.length; i++) {
    total += props.inCart[i]["product_price"] * props.inCart[i]["amount"];
  }

  // 運費
  let deliveryCharge = 49;

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
    // console.log("coupon", coupon);
    try {
      let response = await axios.post(
        `http://localhost:3002/api/products/coupon-input`,
        [coupon, { loginId: props.loginId }]
      );
      // console.log("response.data[0].discount", response.data[0].discount);

      setCouponError();
      if (response.data[0].discount < finalTotal) {
        setDiscount(response.data[0].discount);
        setCouponSuccess("使用成功");
        setWaitingInfo({ ...waitingInfo, used_coupon: coupon.coupon });
      } else {
        setCouponSuccess("折抵價格多於剩餘價格");
        setDiscount(0);
      }
    } catch (e) {
      if (e.response.data.msg === "無法使用此折扣碼") {
        setCouponError("無法使用此折扣碼");
        setDiscount(0);
      }
    }
  }

  // 集點兌換在上面

  // 訂單總額
  const [finalTotal, setFinalTotal] = useState();
  useEffect(() => {
    setFinalTotal(total + deliveryCharge - discount - exchangedMoney);
  }, [total, discount, exchangedMoney]);

  // 要放session的 使用的折扣碼改成無法使用、點數改成剩下的、運費、總額
  const [waitingInfo, setWaitingInfo] = useState({
    used_coupon: "",
    remain_point: user.point,
    delivery_charge: deliveryCharge,
    final_total: "",
  });

  // 訂購成功時才修改資料庫內容：使用的折扣碼改成無法使用、點數改成剩下的、商品庫存減少
  // 結帳時存在SessionStorage?
  function checkout() {
    // console.log("waitingInfo", waitingInfo);
    // console.log("finalTotal", finalTotal);
    let newWaitingInfo = { ...waitingInfo, final_total: finalTotal };
    let waitingInfoString = JSON.stringify(newWaitingInfo);
    sessionStorage.setItem("waitingInfo", waitingInfoString);
  }

  console.log("inCart", props.inCart);

  return (
    <>
      {/* 上半部內容 */}
      <div className="clear-cart text-right">
        <button onClick={removeAll}>清空購物車</button>
      </div>
      <div className="cart-dividing-line-full"></div>

      {/* 購物車內商品 */}
      <div>
        {props.inCart.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="cart-product row">
                <div className="col-4">
                  <div className="cart-product-pic embed-responsive embed-responsive-1by1 list_item1">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      alt=""
                      className="embed-responsive-item pic1"
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
                      <input
                        type="number"
                        min="1"
                        max={item.product_stock}
                        value={props.inCart[index].amount}
                        name="amount"
                        onChange={(event) => handleChange(event, index)}
                        readOnly={item.readonly_value}
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
                    </div>
                  </div>
                  {(() => {
                    if (
                      (item.point_exchange === false ||
                        item.point_exchange === undefined) &&
                      item.product_price * props.inCart[index].amount >
                        finalTotal
                    ) {
                      return (
                        <div className="cart-use-point d-flex justify-content-end align-items-center">
                          <h4>可折抵價格多於剩餘價格</h4>
                        </div>
                      );
                    } else if (
                      (item.point_exchange === false ||
                        item.point_exchange === undefined) &&
                      item.product_point * props.inCart[index].amount <=
                        leftPoint
                    ) {
                      return (
                        <div className="cart-use-point d-flex justify-content-end align-items-center">
                          <h4>
                            使用
                            {item.product_point * props.inCart[index].amount}
                            點兌換此商品嗎?
                          </h4>
                          <button
                            className={
                              item.point_exchange
                                ? "cart-use-point-ivory"
                                : "cart-use-point-orange"
                            }
                            onClick={() =>
                              pointExchange(
                                index,
                                item.product_point * props.inCart[index].amount
                              )
                            }
                          >
                            {item.point_exchange ? "取消" : "使用"}
                          </button>
                        </div>
                      );
                    } else if (
                      (item.point_exchange === false ||
                        item.point_exchange === undefined) &&
                      item.product_point * props.inCart[index].amount >
                        leftPoint
                    ) {
                      return (
                        <div className="cart-use-point d-flex justify-content-end align-items-center">
                          <h4>您的點數只有{leftPoint}點，不足兌換</h4>
                        </div>
                      );
                    } else {
                      return (
                        <div className="cart-use-point d-flex justify-content-end align-items-center">
                          <h4>
                            您使用
                            {item.product_point * props.inCart[index].amount}
                            點兌換此商品
                          </h4>
                          <button
                            className={
                              item.point_exchange
                                ? "cart-use-point-ivory"
                                : "cart-use-point-orange"
                            }
                            onClick={() =>
                              pointExchange(
                                index,
                                item.product_point * props.inCart[index].amount
                              )
                            }
                          >
                            {item.point_exchange ? "取消" : "使用"}
                          </button>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
              <div className="cart-dividing-line-medium"></div>
            </React.Fragment>
          );
        })}
      </div>

      {/* 總和結帳 */}
      {/* <ShoppingCartSum /> */}
      <div className="cart-dividing-line-full"></div>
      <div className="row cart-total-block">
        <div className="col">
          <form>
            <h4>有折扣碼嗎?</h4>
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
            <h4>商品總額</h4>
            <h4>NT${total}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <h4>運費</h4>
            <h4>NT${deliveryCharge}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <h4>折扣碼</h4>
            <h4>－NT${discount}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <h4>集點兌換</h4>
            <h4>－NT${exchangedMoney}</h4>
            {/* 兌換後不能改數量 */}
          </div>
          <div className="cart-dividing-line-short"></div>
          <div className="d-flex justify-content-between">
            <h4>訂單總額</h4>
            <h4>NT${finalTotal}</h4>
          </div>
          <div>
            <Link to="/p_orders/payment">
              <button className="cart-checkout-btn" onClick={() => checkout()}>
                <h3>結帳</h3>
              </button>
            </Link>
          </div>
          <div>
            <button className="cart-continue-btn">
              <h3>繼續購物</h3>
            </button>
          </div>
          <div className="cart-point-this-time d-flex justify-content-between">
            <h4>您的本次使用集點：</h4>
            <h4>{pointDiscount} 點</h4>
          </div>
          <div className="cart-point-rest d-flex justify-content-between">
            <h4>您的剩餘集點：</h4>
            <h4>{leftPoint} 點</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProducts;
