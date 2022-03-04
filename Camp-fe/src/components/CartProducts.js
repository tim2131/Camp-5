import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../style/ShoppingCart.scss";
import "../style/ShoppingCartSum.scss";
// 數量加減元件
// import NumericInput from "react-numeric-input";
import "../style/NumericInput.scss";

// 圖片
// import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";
// import cartProduct from "../img/product1.jpeg";
import heartEmpty from "../img/icon/heart-empty.svg";
import heartFull from "../img/icon/heart-full.svg";

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
    // let responseFav = await axios.get(
    //   `http://localhost:3002/api/user/1/fav-product`
    // );
    // setFavData(responseFav.data);
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

  // 愛心初始------------------------------------------------
  // 要重新整理才會更新
  // 應該是要寫進localstorage再去讀他的狀態來判斷
  // const [heartDisplay, setHeartDisplay] = useState();
  // let heartState;
  // // let heartArray = [...props.inCart];
  // const heart = (id) => {
  //   // console.log(`陣列裡面的id: ${id}`);
  //   // console.log("favData", favData);
  //   let favAlready = favData.filter(function (item) {
  //     return item.product_id === id;
  //   });
  //   // console.log("favAlready", favAlready);
  //   if (favAlready.length === 0) {
  //     heartState = false;
  //   } else {
  //     heartState = true;
  //   }
  //   // console.log("heartState", id, heartState);
  //   // setHeartDisplay(heartState);
  // };
  // // 點愛心
  // const toggleHeart = async (id) => {
  //   // console.log(`陣列裡面的id: ${id}`);
  //   let favAlready = favData.filter(function (item) {
  //     return item.product_id === id;
  //   });
  //   // console.log(favAlready);
  //   // let heartInfo;
  //   if (favAlready.length === 0) {
  //     // heartInfo = false;
  //     let response = await axios.post(
  //       "http://localhost:3002/api/user/1/fav-product/add",
  //       { id: id }
  //     );
  //     heartState = true;
  //   } else {
  //     // heartInfo = true;
  //     let response = await axios.post(
  //       "http://localhost:3002/api/user/1/fav-product/remove",
  //       { id: id }
  //     );
  //     heartState = false;
  //   }
  //   setHeartDisplay(heartState);
  // };
  // 愛心放棄-----------------------------------------------------

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
  let deliveryCharge = 60;

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

  // console.log("inCart", props.inCart);

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
                      {/* <button
                        className="cart-product-heart"
                        id={heart(item.id)}
                        onClick={() => toggleHeart(item.id)}
                      >
                        <img
                          src={heartDisplay ? heartFull : heartEmpty}
                          alt=""
                        />
                      </button> */}
                    </div>
                  </div>
                  <div className="cart-use-point d-flex justify-content-end align-items-center">
                    <h3>
                      {item.point_exchange
                        ? `您使用${
                            item.product_point * props.inCart[index].amount
                          }點兌換此商品`
                        : `使用${
                            item.product_point * props.inCart[index].amount
                          }點兌換此商品嗎?`}
                    </h3>
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
            <div>商品總額</div>
            <div>NT${total}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>運費</div>
            <div>NT${deliveryCharge}</div>
          </div>
          {/* <div className="d-flex justify-content-between">
            <div>折扣</div>
            <div>－NT$60</div>
          </div> */}
          <div className="d-flex justify-content-between">
            <div>折扣碼</div>
            <div>－NT${discount}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>集點兌換</div>
            <div>－NT${exchangedMoney}</div>
            {/* 不要這樣寫，要嘛兌換後不能改數量，要嘛改數量後跳掉 */}
          </div>
          <div className="cart-dividing-line-short"></div>
          <div className="d-flex justify-content-between">
            <div>訂單總額</div>
            <div>NT${finalTotal}</div>
          </div>
          <div>
            <Link to="/p_orders/payment">
              <button className="cart-checkout-btn" onClick={() => checkout()}>
                結帳
              </button>
            </Link>
          </div>
          <div>
            <button className="cart-continue-btn">繼續購物</button>
          </div>
          <div className="cart-point-this-time d-flex justify-content-between">
            <div>您的本次使用集點：</div>
            <div>{pointDiscount} 點</div>
          </div>
          <div className="cart-point-rest d-flex justify-content-between">
            <div>您的剩餘集點：</div>
            <div>{leftPoint} 點</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProducts;
