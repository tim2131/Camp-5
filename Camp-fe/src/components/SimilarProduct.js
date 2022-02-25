import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";
import axios from "axios";

// import AliceCarousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

import "../style/SimilarProduct.scss";

// 圖片
import productPic1 from "../img/product1.jpeg";
import arrowL from "../img/icon/pic-arrow-left.svg";
import arrowR from "../img/icon/pic-arrow-right.svg";

function SimilarProduct() {
  // ---------- AliceCarousel start ----------

  const [similar1, setSimilar1] = useState([]);
  const [similar2, setSimilar2] = useState([]);
  const [similar3, setSimilar3] = useState([]);

  // 取網址中的 productId
  const { productId } = useParams();
  // for (let i = 1; i <= 5; i++) {
  //   const SPId[i] = Number(productId) + i;
  // }
  const SPId1 = Number(productId) + 1;
  const SPId2 = Number(productId) + 2;
  const SPId3 = Number(productId) + 3;

  // 取後端資料(主要)
  useEffect(async () => {
    let response = await axios.get(
      `http://localhost:3002/api/products/${SPId1}`
    );
    setSimilar1(response.data);
  }, []);

  // 取後端資料(主要)
  useEffect(async () => {
    let response = await axios.get(
      `http://localhost:3002/api/products/${SPId2}`
    );
    setSimilar2(response.data);
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const Card1 = () => {
    return (
      <>
        {similar1.map((item) => {
          return (
            <>
              <div className="similar-product-card">
                <div className="similar-product-pic m-auto">
                  <img
                    src={productPic1}
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
                <div className="similar-product-pic m-auto">
                  <img
                    src={productPic1}
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
              </div>
            </>
          );
        })}
      </>
    );
  };

  const items = [<Card1 />, <Card2 />];

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
