import React from 'react';
// import AliceCarousel
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
// import AliceCarousel end
import '../style/SimilarProduct.scss';

// 圖片
import productPic1 from '../img/product1.jpeg';
import arrowL from '../img/icon/pic-arrow-left.svg';
import arrowR from '../img/icon/pic-arrow-right.svg';

// AliceCarousel start

const handleDragStart = (e) => e.preventDefault();

const Card = () => {
    return (
        <>
        <div className='similar-product-card'>
          <div className='similar-product-pic m-auto'>
            <img src={productPic1} onDragStart={handleDragStart} role="presentation" />
          </div>
            <div className='text-center similar-product-name'>
              商品名稱
            </div>
            <div className='text-center similar-product-price'>
              NT$1,680
            </div>
        </div>
        </>
    );
  }

const items = [
    <Card />,
    <Card />,
    <Card />,
    <Card />,
    <Card />,
    <Card />,
  ];

const responsive = {
    0: { items: 1 },
    800: { items: 2 },
    1200: { items: 3 },
  }

const ArrowL = () => {
  return (
    <>
      <img src={arrowL} />
    </>
  )
}

const ArrowR = () => {
  return (
    <>
      <img src={arrowR} />
    </>
  )
}

// AliceCarousel end

function SimilarProduct() {
    return (
        <>
            <main className="similar-product-main w-100%">
              <div className="container custom-container-width">
                  <h3 className='text-center similar-product-subtitle'>
                    你可能也喜歡
                  </h3>
                  <div className='carousel'>
                    <AliceCarousel 
                    mouseTracking 
                    responsive = {responsive}
                    controlsStrategy = "responsive"
                    infinite = "true"
                    disableDotsControls = "true"
                    renderPrevButton={ArrowL}
                    renderNextButton={ArrowR}
                    items={items} />
                  </div>
                  <div className='text-center'>
                    <button className='back-to-product-list'>
                      回到商品列表頁
                    </button>
                  </div>
              </div>
            </main>
        </>
    )
}

export default SimilarProduct;