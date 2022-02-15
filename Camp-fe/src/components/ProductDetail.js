import React, { useState } from 'react';

import '../style/ProductDetail.scss';
import ProductReview from './ProductReview';
import SimilarProduct from './SimilarProduct';
import ProductSizeSelect from './ProductSizeSelect';
// 數量加減元件
import NumericInput from 'react-numeric-input';
import '../style/NumericInput.scss';

// 圖片
import productDetailTriangle from '../img/icon/product-detail-triangle.svg';
import heartEmpty from '../img/icon/heart-empty.svg';
import heartFull from '../img/icon/heart-full.svg';
import productPic1 from '../img/product1.jpeg';
import productPic2 from '../img/product2.jpeg';
import productPic3 from '../img/product3.jpeg';
import productPic4 from '../img/product4.jpeg';

function ProductDetail() {
  // 點愛心
  const [heart, setHeart] = useState(false);
  const toggleSwitch = () => setHeart((previousState) => !previousState);

  const clickHeart = heart ? heartFull : heartEmpty;

  return (
    <>
      <main className="product-detail-main w-100%">
        <div className="container">
          {/* 主圖&標題 */}
          <div className="row product-main-info">
            <div className="col">
              <div className="main-pic">
                <img
                  src="https://images.pexels.com/photos/7055327/pexels-photo-7055327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt=""
                ></img>
              </div>
            </div>
            <div className="col product-main-info d-flex flex-column">
              <div className="product-main-info-title mb-auto">
                <h1>OCEAN BOTTLE 時尚環保水壺</h1>
                <div className="d-flex product-detail-price">
                  <h3>NT$1,680</h3>
                  <h5>或</h5>
                  <h3>10點兌換</h3>
                </div>
              </div>
              <div className="product-main-info-choise">
                <div className="d-flex">
                  <div className="choose-color product-color-1"></div>
                  <div className="choose-color product-color-2"></div>
                  <div className="choose-color product-color-3"></div>
                </div>
                <div>
                  <ProductSizeSelect />
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="product-amount">
                    <NumericInput
                      // style={false}
                      min={1}
                      max={100}
                      value={1}
                      mobile
                    />
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
                  <button className="btn-buy add-to-cart">加入購物車</button>
                </div>
                <div>
                  <button className="btn-buy buy-right-now">立即購買</button>
                </div>
              </div>
            </div>
          </div>

          {/* 介紹 */}
          <div className="horizontal-line"></div>
          <div className="product-intro">
            <p>
              環保也能很時尚！OCEAN
              BOTTLE時尚環保水壺是每日喝水最佳夥伴，採用不鏽鋼及海洋再生塑料材質，減少使用一次性塑料瓶。搭配高質感啞光漆層及方便的手握提環，提升造型精緻度。一起為我們所生活的土地盡一份心力，降低地球資源的浪費。
            </p>
          </div>
          <div className="product-pic-banner">
            <img src={productPic2} alt="" />
          </div>

          {/* 商品特色 */}
          <div className="row product-intro-2 first">
            <div className="col product-pic-small">
              <img src={productPic3} alt="" />
              <div className="product-pic-fram"></div>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <div className="product-special">
                <div className="triangle-left">
                  <img src={productDetailTriangle} alt="" />
                </div>
                <h4>商品特色</h4>
                <div className="horizontal-line-short"></div>
                <p>
                  底部防震墊片設計。
                  <br />
                  可放置洗碗機清洗。
                  <br />
                  雙層瓶口設計，便於清潔。
                  <br />
                  180°旋轉防漏式瓶蓋設計。
                  <br />
                  不含雙酚A (BPA Free)，使消費者能喝的安心。
                  <br />
                </p>
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
                  重量：230 g<br />
                  尺寸：500 ml
                  <br />
                  材質：304不銹鋼、海洋再生塑料材質
                  <br />
                  貨號：9319905295-30-00
                  <br />
                </p>
              </div>
            </div>
            <div className="col product-pic-small">
              <img src={productPic3} alt="" />
              <div className="product-pic-fram"></div>
            </div>
          </div>
          {/* 大圖*2 */}
          <div className="product-pic-large first">
            <img src={productPic3} alt="" />
          </div>
          <div className="product-pic-large second">
            <img src={productPic3} alt="" />
          </div>
        </div>
      </main>
      <ProductReview />
      <SimilarProduct />
    </>
  );
}

export default ProductDetail;
