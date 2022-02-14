import '../style/ProductReview.scss';

// 圖片
import userAvatar from "../img/user.png";
import reviewBackgroundTop from "../img/background/review-background-top.svg";
import reviewBackgroundBottom from "../img/background/review-background-bottom.svg";
import starFull from "../img/icon/star-full.svg";
import starEmpty from "../img/icon/star-empty.svg";

function ProductReview() {
    return (
        <>
          <main className="customer-review-main w-100%">
            {/* 背景圖_上 */}
            <div className='review-background top'>
              <img src={reviewBackgroundTop} alt='' />
            </div>
            <div className="container custom-container-width">
              <div className='d-flex subtitle-block'>
                <div className='review-subtitle-space'></div>
                <h3>商品評價</h3>
                <div className='customer-rate d-flex'>
                  <div className='total-rate-number'>4.8</div>
                  <img src={starFull} alt='' />
                  <img src={starFull} alt='' />
                  <img src={starFull} alt='' />
                  <img src={starFull} alt='' />
                  <img src={starEmpty} alt='' />
                </div>
              </div>
              {/* 01 */}
              <div className='customer-review'>
                <div className='customer-info d-flex align-items-center'>
                  <div className='customer-avatar'>
                    <img src={userAvatar} alt='' />
                  </div>
                  <div>
                    <h5 className='user-name'>h****i</h5>
                    <div className='customer-rate'>
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starEmpty} alt='' />
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <div className='space'></div>
                  <div className='customer-review-content'>
                    <p>茶很好喝，白天喝，精神特別好，晚上也就好睡些，我不愛喝水但是使用了漢方茶後每天都可以以健康的方式補足水分</p>
                    <div className='review-date'>January 7, 2022</div>
                  </div>
                </div>
              </div>
              {/* 02 */}
              <div className='customer-review'>
                <div className='customer-info d-flex align-items-center'>
                  <div className='customer-avatar'>
                    <img src={userAvatar} alt='' />
                  </div>
                  <div>
                    <h5 className='user-name'>h****i</h5>
                    <div className='customer-rate'>
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starEmpty} alt='' />
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <div className='space'></div>
                  <div className='customer-review-content'>
                    <p>茶很好喝，白天喝，精神特別好，晚上也就好睡些，我不愛喝水但是使用了漢方茶後每天都可以以健康的方式補足水分</p>
                    <div className='review-date'>January 7, 2022</div>
                  </div>
                </div>
              </div>
              {/* 03 */}
              <div className='customer-review'>
                <div className='customer-info d-flex align-items-center'>
                  <div className='customer-avatar'>
                    <img src={userAvatar} alt='' />
                  </div>
                  <div>
                    <h5 className='user-name'>h****i</h5>
                    <div className='customer-rate'>
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starFull} alt='' />
                      <img src={starEmpty} alt='' />
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <div className='space'></div>
                  <div className='customer-review-content'>
                    <p>茶很好喝，白天喝，精神特別好，晚上也就好睡些，我不愛喝水但是使用了漢方茶後每天都可以以健康的方式補足水分</p>
                    <div className='review-date'>January 7, 2022</div>
                  </div>
                </div>
              </div>
              {/* 頁碼 */}
              <div className='pagination d-flex'>
                <div className='page-number'>1</div>
                <div className='page-number'>2</div>
                <div className='page-number'>3</div>
              </div>
            </div>
            {/* 背景圖_下 */}
            <div className='review-background bottom'>
              <img src={reviewBackgroundBottom} alt='' />
            </div>
          </main>
            
        </>
    )
}
export default ProductReview;