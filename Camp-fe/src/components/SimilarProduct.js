import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// import AliceCarousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

import "../style/SimilarProduct.scss";

// 圖片
// import productPic1 from "../img/product1.jpeg";
import arrowL from "../img/icon/pic-arrow-left.svg";
import arrowR from "../img/icon/pic-arrow-right.svg";

function SimilarProduct() {
  // ---------- AliceCarousel start ----------

  const [similar1, setSimilar1] = useState([]);
  const [similar2, setSimilar2] = useState([]);
  const [similar3, setSimilar3] = useState([]);
  const [similar4, setSimilar4] = useState([]);
  const [similar5, setSimilar5] = useState([]);

  // 取網址中的 productId
  const { productId } = useParams();

  let thisId = Number(productId);
  let num1;
  let num2;
  let num3;
  let num4;
  let num5;

  function check(thisId) {
    switch (thisId) {
      case 1:
        num1 = 1;
        num2 = 2;
        num3 = 3;
        num4 = 4;
        num5 = 5;
        break;
      case 2:
        num1 = -1;
        num2 = 1;
        num3 = 2;
        num4 = 3;
        num5 = 4;
        break;
      default:
        num1 = -2;
        num2 = -1;
        num3 = 1;
        num4 = 2;
        num5 = 3;
    }
  }
  check(thisId);

  const similarProductId1 = thisId + num1;
  const similarProductId2 = thisId + num2;
  const similarProductId3 = thisId + num3;
  const similarProductId4 = thisId + num4;
  const similarProductId5 = thisId + num5;
  //   console.log("similarProductId1", similarProductId1);

  // 取後端資料
  useEffect(async () => {
    let response1 = await axios.get(
      `http://localhost:3002/api/products/${similarProductId1}`
    );
    setSimilar1(response1.data);

    let response2 = await axios.get(
      `http://localhost:3002/api/products/${similarProductId2}`
    );
    setSimilar2(response2.data);

    let response3 = await axios.get(
      `http://localhost:3002/api/products/${similarProductId3}`
    );
    setSimilar3(response3.data);

    let response4 = await axios.get(
      `http://localhost:3002/api/products/${similarProductId4}`
    );
    setSimilar4(response4.data);

    let response5 = await axios.get(
      `http://localhost:3002/api/products/${similarProductId5}`
    );
    setSimilar5(response5.data);
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const Card1 = () => {
    return (
      <>
        {similar1.map((item) => {
          return (
            <>
              <div className="similar-product-card">
                <Link to={`/products/${similarProductId1}`} target="_top">
                  <div className="similar-product-pic m-auto">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      onDragStart={handleDragStart}
                      role="presentation"
                    />
                  </div>
                  <div className="text-center similar-product-name">
                    {item.product_name}
                  </div>
                  <div className="text-center similar-product-price">
                    NT${item.product_price}
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const Card2 = () => {
    return (
      <>
        {similar2.map((item) => {
          return (
            <>
              <div className="similar-product-card">
                <Link to={`/products/${similarProductId2}`} target="_top">
                  <div className="similar-product-pic m-auto">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      onDragStart={handleDragStart}
                      role="presentation"
                    />
                  </div>
                  <div className="text-center similar-product-name">
                    {item.product_name}
                  </div>
                  <div className="text-center similar-product-price">
                    NT${item.product_price}
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const Card3 = () => {
    return (
      <>
        {similar3.map((item) => {
          return (
            <>
              <div className="similar-product-card">
                <Link to={`/products/${similarProductId3}`} target="_top">
                  <div className="similar-product-pic m-auto">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      onDragStart={handleDragStart}
                      role="presentation"
                    />
                  </div>
                  <div className="text-center similar-product-name">
                    {item.product_name}
                  </div>
                  <div className="text-center similar-product-price">
                    NT${item.product_price}
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const Card4 = () => {
    return (
      <>
        {similar4.map((item) => {
          return (
            <>
              <div className="similar-product-card">
                <Link to={`/products/${similarProductId4}`} target="_top">
                  <div className="similar-product-pic m-auto">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      onDragStart={handleDragStart}
                      role="presentation"
                    />
                  </div>
                  <div className="text-center similar-product-name">
                    {item.product_name}
                  </div>
                  <div className="text-center similar-product-price">
                    NT${item.product_price}
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const Card5 = () => {
    return (
      <>
        {similar5.map((item) => {
          return (
            <>
              <div className="similar-product-card">
                <Link to={`/products/${similarProductId5}`} target="_top">
                  <div className="similar-product-pic m-auto">
                    <img
                      src={`http://localhost:3002/product-pic/${item.img1}`}
                      onDragStart={handleDragStart}
                      role="presentation"
                    />
                  </div>
                  <div className="text-center similar-product-name">
                    {item.product_name}
                  </div>
                  <div className="text-center similar-product-price">
                    NT${item.product_price}
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const items = [<Card1 />, <Card2 />, <Card3 />, <Card4 />, <Card5 />];

  const responsive = {
    0: { items: 1 },
    800: { items: 2 },
    1200: { items: 3 },
  };

  const ArrowL = () => {
    return (
      <>
        <img src={arrowL} />
      </>
    );
  };

  const ArrowR = () => {
    return (
      <>
        <img src={arrowR} />
      </>
    );
  };

  // ---------- AliceCarousel end ----------

  return (
    <>
      <main className="similar-product-main w-100%">
        <div className="container custom-container-width">
          <h3 className="text-center similar-product-subtitle">你可能也喜歡</h3>
          <div className="carousel">
            <AliceCarousel
              mouseTracking
              responsive={responsive}
              controlsStrategy="responsive"
              infinite="true"
              disableDotsControls="true"
              renderPrevButton={ArrowL}
              renderNextButton={ArrowR}
              items={items}
            />
          </div>
          <div className="text-center">
            <button className="back-to-product-list">回到商品列表頁</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default SimilarProduct;
