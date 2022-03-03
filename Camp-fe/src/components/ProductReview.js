import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../style/ProductReview.scss";

// 圖片
import reviewBackgroundTop from "../img/background/review-background-top.svg";
import reviewBackgroundBottom from "../img/background/review-background-bottom.svg";
import starFull from "../img/icon/star-full.svg";
import starEmpty from "../img/icon/star-empty.svg";

function ProductReview() {
  const [data, setData] = useState([]);
  // 總共有幾頁
  const [lastPage, setLastPage] = useState();
  // 平均星星
  const [avarageStar, setAvarageStar] = useState();

  // 取網址中的 productId
  const { productId } = useParams();

  // const { currentPage } = useParams();
  const [page, setPage] = useState(1);
  let currentPage = page;

  // 取後端資料(主要)
  useEffect(async () => {
    let response = await axios.get(
      `http://localhost:3002/api/products/review/${productId}?page=${currentPage}`
    );
    setData(response.data.data); // 第一個data是內建的，跟自己設定的data不同
    setLastPage(response.data.pagination.lastPage);
  }, [page]);

  // 取後端資料(平均星星)
  useEffect(async () => {
    let response = await axios.get(
      `http://localhost:3002/api/products/reviw/${productId}/avarage-star`
    );
    setAvarageStar(response.data[0]["stars"]);
  }, []);

  // 頁碼
  const getPage = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <button
          className="page-number"
          onClick={(e) => {
            setPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // 星星
  const getStar = (star) => {
    let stars = [];
    for (let i = 0; i < star; i++) {
      stars.push(<img src={starFull} alt="" />);
    }
    for (let i = 0; i < 5 - star; i++) {
      stars.push(<img src={starEmpty} alt="" />);
    }
    return stars;
  };

  return (
    <>
      <main className="customer-review-main w-100%">
        {/* 背景圖_上 */}
        <div className="review-background top">
          <img src={reviewBackgroundTop} alt="" />
        </div>
        <div className="container custom-container-width">
          <div className="d-flex subtitle-block">
            <div className="review-subtitle-space"></div>
            <h3>商品評價</h3>
            <div className="customer-rate d-flex">
              <div className="total-rate-number text-center">{avarageStar}</div>
              {getStar(avarageStar)}
            </div>
          </div>
          {data.map((item) => {
            return (
              <>
                <div className="customer-review">
                  <div className="customer-info d-flex align-items-center">
                    <div className="customer-avatar">
                      <img
                        src={`http://localhost:3002/product-pic/${item.img}`}
                        alt=""
                      />
                    </div>
                    <div>
                      <h5 className="user-name">{item.user_name}</h5>
                      <div className="customer-rate">
                        {getStar(item.product_stars)}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="space"></div>
                    <div className="customer-review-content">
                      <p>{item.product_comment}</p>
                      <div className="review-date">{item.comment_time}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {/* 頁碼 */}
          <div className="pagination d-flex">{getPage()}</div>
        </div>
        {/* 背景圖_下 */}
        <div className="review-background bottom">
          <img src={reviewBackgroundBottom} alt="" />
        </div>
      </main>
    </>
  );
}
export default ProductReview;
