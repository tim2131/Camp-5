import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";
import axios from "axios";

import "../style/ProductDetail.scss";
import ProductReview from "./ProductReview";
import SimilarProduct from "./SimilarProduct";
// 數量加減元件
import NumericInput from "react-numeric-input";
import "../style/NumericInput.scss";

// 圖片
import productDetailTriangle from "../img/icon/product-detail-triangle.svg";
import heartEmpty from "../img/icon/heart-empty.svg";
import heartFull from "../img/icon/heart-full.svg";

function ProductDetail() {
  const [data, setData] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  // 取網址中的 productId
  const { productId } = useParams();

  // 要輸入購物車的資料
  const [product, setProduct] = useState({});

  let alreadyInCart = JSON.parse(localStorage.getItem("cartProduct"));
  const [cart, setCart] = useState(alreadyInCart);

  // 取後端資料
  useEffect(async () => {
    let responseAll = await axios.get(
      `http://localhost:3002/api/products/${productId}`
    );
    let responseColor = await axios.get(
      `http://localhost:3002/api/products/${productId}/color`
    );
    let responseSize = await axios.get(
      `http://localhost:3002/api/products/${productId}/size`
    );
    setData(responseAll.data);
    setColor(responseColor.data);
    setSize(responseSize.data);
    setProduct({ ...product, ...responseAll.data[0] });
  }, []);
  // 在外面console.log取不到東西的原因是還沒set好，因為不知道react什麼時候會把它處理好，在處理好之前就抓不到資料
  // 所以才會有console.log了好幾次才有資料的情況

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  // 加入購物車按鈕
  // 全部資料都寫入，要用時再挑出需要的特定資料
  async function handleSubmit1(e) {
    e.preventDefault();
    await cart.push(product);
    let cartString = await JSON.stringify(cart);
    await localStorage.setItem("cartProduct", cartString);
  }

  // 立即購買按鈕
  // async function handleSubmit2(e) {
  //   e.preventDefault();
  //   let response = await axios.post(
  //     "http://localhost:3002/api/products/buynow",
  //     product
  //   );
  //   console.log(response.data);
  // }

  // 點愛心
  const [heart, setHeart] = useState(false);
  const toggleSwitch = () => setHeart((previousState) => !previousState);

  const clickHeart = heart ? heartFull : heartEmpty;

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
      {data.map((item) => {
        return (
          <>
            <main className="product-detail-main w-100%">
              <div className="container">
                {/* 主圖&標題 */}
                <div className="row product-main-info">
                  <div className="col ">
                    <div className="main-pic embed-responsive embed-responsive-1by1">
                      <div className="  embed-responsive-item ">
                        <div className="orderPicBox">
                          <div className="tagWord">{tagWords[1]}</div>
                          <div className={tagcolor[1]}></div>
                          <div className="list_item1">
                            <img
                              className="pic1"
                              src={`http://localhost:3002/product-pic/${item.img1}`}
                              alt="camp-pic"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col product-main-info d-flex flex-column">
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
                        {/* <div className="d-flex">
                        <div className="choose-color product-color-1"></div>
                        <div className="choose-color product-color-2"></div>
                        <div className="choose-color product-color-3"></div>
                      </div> */}
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
                            {/* <NumericInput
                              min={1}
                              max={item.product_stock}
                              value={product.amount}
                              name="amount"
                              mobile
                              onClick={handleChange}
                            /> */}
                            <input
                              type="number"
                              min="1"
                              max={item.product_stock}
                              value={product.amount}
                              name="amount"
                              onChange={handleChange}
                            ></input>
                          </div>
                          <button
                            className="product-heart-number"
                            onClick={() => toggleSwitch()}
                          >
                            <img src={clickHeart} alt="" />
                            150
                          </button>
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
                          <button
                            className="btn-buy buy-right-now"
                            // onClick={handleSubmit2}
                          >
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
                  <div className="col product-pic-small embed-responsive embed-responsive-4by3">
                    <div className="embed-responsive-item">
                      <img
                        src={`http://localhost:3002/product-pic/${item.img3}`}
                        alt=""
                      />
                    </div>
                    <div className="product-pic-fram"></div>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center">
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
                  <div className="col d-flex justify-content-center align-items-center">
                    <div className="product-special">
                      <div className="triangle-right">
                        <img src={productDetailTriangle} alt="" />
                      </div>
                      <h4>尺寸規格</h4>
                      <div className="horizontal-line-short"></div>
                      <p>
                        重量：{item.weight} g<br />
                        尺寸：{item.size} ml
                        <br />
                        材質：{item.material}
                        <br />
                        貨號：{item.number}
                        <br />
                      </p>
                    </div>
                  </div>
                  <div className="col product-pic-small embed-responsive embed-responsive-4by3">
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
          </>
        );
      })}
    </>
  );
}

export default ProductDetail;
