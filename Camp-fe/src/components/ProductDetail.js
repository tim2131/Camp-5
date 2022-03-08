import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Footer from "./Footer";

import "../style/ProductDetail.scss";
import "../style/NumberInput.scss";
import ProductReview from "./ProductReview";
import SimilarProduct from "./SimilarProduct";
import "../style/NumericInput.scss";

// 圖片
import productDetailTriangle from "../img/icon/product-detail-triangle.svg";
import heartEmpty from "../img/icon/heart-empty.svg";
import heartFull from "../img/icon/heart-full.svg";

function ProductDetail() {
  // 判斷是否登入
  const [logData, setLogData] = useState(null);
  let loginId;
  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      let result = await axios.get(`http://localhost:3002/member`, {
        withCredentials: true,
      });
      console.log("app.js id", result.data.id);
      setLogData(result.data);
      loginId = result.data.id;
    };
    getMember();
  }, []);

  // ----------------------------------------------------
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [favData, setFavData] = useState([]);
  const [userFav, setUserFav] = useState([]);
  const [heartNumber, setHeartNumber] = useState();

  // 取網址中的 productId
  const { productId } = useParams();

  // 要輸入購物車的資料
  const [product, setProduct] = useState({});

  // 判斷localStorage是否存在，來決定購物車的初始狀態
  let cart;
  if (
    localStorage.getItem("cartProduct") === null ||
    localStorage.getItem("cartProduct").length < 3
  ) {
    cart = [];
    // console.log("空的");
  } else {
    cart = JSON.parse(localStorage.getItem("cartProduct"));
    // console.log("有東西");
  }

  // 取後端資料
  useEffect(() => {
    const getData = async () => {
      let responseAll = await axios.get(
        `http://localhost:3002/api/products/${productId}`
      );
      setData(responseAll.data);
      setProduct({ ...product, ...responseAll.data[0], amount: 1 });

      let responseColor = await axios.get(
        `http://localhost:3002/api/products/${productId}/color`
      );
      setColor(responseColor.data);

      let responseSize = await axios.get(
        `http://localhost:3002/api/products/${productId}/size`
      );
      setSize(responseSize.data);

      let responseFav = await axios.get(
        `http://localhost:3002/api/product-fav/${productId}`
      );
      setFavData(responseFav.data);
      setHeartNumber(responseFav.data.length);

      let responseUserFav = await axios.post(
        `http://localhost:3002/api/user/product-fav/${productId}`,
        []
      );
      setUserFav(responseUserFav.data);
      console.log("loginId", loginId);
    };
    getData();
  }, []);
  // 在外面console.log取不到東西的原因是還沒set好，因為不知道react什麼時候會把它處理好，在處理好之前就抓不到資料
  // 所以才會有console.log了好幾次才有資料的情況

  // 愛心初始圖片
  let heartState;
  const [heart, setHeart] = useState();
  useEffect(() => {
    console.log("userFav.length", userFav.length);
    if (userFav.length === 0) {
      heartState = false;
    } else {
      heartState = true;
    }
    setHeart(heartState);
  }, [userFav]);

  // 點愛心
  const toggleSwitch = async () => {
    if (heart === false) {
      let responseMakeHeartTrue = await axios.post(
        `http://localhost:3002/api/user/fav-product/${productId}/make-true`
      );
      console.log("heartState true");
      setHeartNumber(heartNumber + 1);
    } else {
      let responseMakeHeartFalse = await axios.post(
        `http://localhost:3002/api/user/fav-product/${productId}/make-false`
      );
      console.log("heartState false");
      setHeartNumber(heartNumber - 1);
    }
    setHeart(!heart);
  };

  // 數量加減
  function numMinus(e) {
    let inputNum;
    if (product.amount > 1) {
      inputNum = { ...product, amount: product.amount - 1 };
    } else {
      inputNum = { ...product, amount: 1 };
    }
    setProduct(inputNum);
  }
  function numPlus(e) {
    let inputNum;
    if (product.amount < product.product_stock) {
      inputNum = { ...product, amount: product.amount + 1 };
    } else {
      inputNum = { ...product, amount: product.product_stock };
    }
    setProduct(inputNum);
  }

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  // 加入購物車按鈕
  // 全部資料都寫入，要用時再挑出需要的特定資料
  async function handleSubmit1(e) {
    e.preventDefault();
    Swal.fire({
      title: "成功加入購物車！",
      confirmButtonColor: "#6A6842",
    });
    // let newCart = [...cart];
    // newCart.push(product);
    // setCart(newCart);
    cart.push(product);
    // let cartString = await JSON.stringify(newCart);
    let cartString = await JSON.stringify(cart);
    await localStorage.setItem("cartProduct", cartString);
  }
  // 有set的不能直接去push他，要let一個新的把他複製出來再去push，push完再放回去set，但剛set完拿不到值，所以要用他還是只能先用let的值

  // 圖片截角
  const tagWords = {
    1: "主打",
    2: "促銷",
  };

  const tagcolor = {
    1: "tagStar",
    2: "tag",
  };

  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <main className="product-detail-main w-100%">
              <div className="container">
                {/* 主圖&標題 */}
                <div className="row product-main-info">
                  <div className="col-lg-6 col-md-12">
                    <div className="embed-responsive embed-responsive-1by1 list_item1">
                      {/* <div className="orderPicBox"> */}
                      {/* <div className="tagWord">{tagWords[1]}</div> */}
                      {/* <div className={tagcolor[1]}></div> */}
                      {/* <div className="list_item1"> */}
                      <img
                        className="embed-responsive-item pic1"
                        src={`http://localhost:3002/product-pic/${item.img1}`}
                        alt="camp-pic"
                      />
                      {/* </div> */}
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 product-main-info d-flex flex-column">
                    <div className="product-main-info-title mb-auto">
                      <h1>{item.product_name}</h1>
                      <div className="d-flex product-detail-price">
                        <h3>NT${item.product_price}</h3>
                        <h5>或</h5>
                        <h3>{item.product_point}點兌換</h3>
                      </div>
                    </div>
                    <form>
                      <div className="product-main-info-choise">
                        <div>
                          <select
                            className="product-size-select"
                            value={product.color}
                            name="color"
                            onChange={handleChange}
                          >
                            <option value="">請選擇顏色</option>
                            {color.map((chooseColor) => {
                              return (
                                <>
                                  <option value={chooseColor.color}>
                                    {chooseColor.color}
                                  </option>
                                  ;
                                </>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <select
                            className="product-size-select"
                            value={product.size}
                            name="size"
                            onChange={handleChange}
                          >
                            <option value="">請選擇尺寸</option>
                            {size.map((chooseSize) => {
                              return (
                                <>
                                  <option value={chooseSize.size}>
                                    {chooseSize.size}
                                  </option>
                                  ;
                                </>
                              );
                            })}
                          </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-end">
                          <div className="product-amount">
                            <button
                              className="number-input-btn minus-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                numMinus();
                              }}
                            >
                              -
                            </button>
                            <input
                              className="custom-number-input"
                              disabled
                              type="number"
                              min="1"
                              max={item.product_stock}
                              value={product.amount}
                              name="amount"
                              // onChange={handleChange}
                            ></input>
                            <button
                              className="number-input-btn plus-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                numPlus();
                              }}
                            >
                              +
                            </button>
                          </div>
                          {logData && (
                            <button
                              className="product-heart-number"
                              onClick={(e) => {
                                e.preventDefault();
                                // 放在form裡的按鈕都會變傳送，所以要避免他的預設事件
                                toggleSwitch();
                              }}
                            >
                              <img
                                src={heart ? heartFull : heartEmpty}
                                alt=""
                              />
                              {heartNumber}
                            </button>
                          )}
                        </div>
                        <div>
                          <button
                            className="btn-buy add-to-cart"
                            onClick={handleSubmit1}
                          >
                            加入購物車
                          </button>
                        </div>
                        <div>
                          <button className="btn-buy buy-right-now">
                            立即購買
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 介紹 */}
                <div className="horizontal-line"></div>
                <div className="product-intro">
                  <p>{item.product_intro}</p>
                </div>
                <div className="product-pic-banner">
                  <img
                    src={`http://localhost:3002/product-pic/${item.img2}`}
                    alt=""
                  />
                </div>

                {/* 商品特色 */}
                <div className="row product-intro-2 first">
                  <div className="col-lg-6 col-md-12 product-pic-small embed-responsive embed-responsive-4by3">
                    <div className="embed-responsive-item">
                      <img
                        src={`http://localhost:3002/product-pic/${item.img3}`}
                        alt=""
                      />
                    </div>
                    <div className="product-pic-fram"></div>
                  </div>
                  <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
                    <div className="product-special">
                      <div className="triangle-left">
                        <img src={productDetailTriangle} alt="" />
                      </div>
                      <h4>商品特色</h4>
                      <div className="horizontal-line-short"></div>
                      <p>{item.product_intro2}</p>
                    </div>
                  </div>
                </div>
                {/* 尺寸規格 */}
                <div className="row product-intro-2 second">
                  <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
                    <div className="product-special">
                      <div className="triangle-right">
                        <img src={productDetailTriangle} alt="" />
                      </div>
                      <h4>尺寸規格</h4>
                      <div className="horizontal-line-short"></div>
                      <p>
                        重量：{item.weight}
                        <br />
                        尺寸：{item.size}
                        <br />
                        材質：{item.material}
                        <br />
                        貨號：{item.number}
                        <br />
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 product-pic-small embed-responsive embed-responsive-4by3">
                    <div className="embed-responsive-item">
                      <img
                        src={`http://localhost:3002/product-pic/${item.img4}`}
                        alt=""
                      />
                    </div>
                    <div className="product-pic-fram"></div>
                  </div>
                </div>
                {/* 大圖*2 */}
                <div className="product-pic-large first">
                  <img
                    src={`http://localhost:3002/product-pic/${item.img5}`}
                    alt=""
                  />
                </div>
                <div className="product-pic-large second">
                  <img
                    src={`http://localhost:3002/product-pic/${item.img6}`}
                    alt=""
                  />
                </div>
              </div>
            </main>
            <ProductReview />
            <SimilarProduct />
            <Footer />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default ProductDetail;
