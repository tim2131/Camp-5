import '../style/BookingSum.scss';

function BookingSum() {
  return (
    <>
      <div className="cart-dividing-line-full"></div>
      <div className="row cart-total-block">
        <div className="col">
          <div>有促銷碼嗎?</div>
          <div className="cart-discount-input d-flex">
            <input></input>
            <button>加入</button>
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-between">
            <div>帳篷平日定價*3晚</div>
            <div>NT$2700</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>帳篷假日定價*10晚</div>
            <div>NT$10000</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>手做聖誕吊飾*2人</div>
            <div>NT$800</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>溫泉門票*1人</div>
            <div>NT$400</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>折扣</div>
            <div>－NT$1000</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>促銷碼</div>
            <div>－NT$600</div>
          </div>
          <div className="cart-dividing-line-short"></div>
          <div className="d-flex justify-content-between">
            <div>訂單總額</div>
            <div>NT$11000</div>
          </div>
          <div>
            <button className="cart-checkout-btn">下一步填寫資料</button>
          </div>
          <div>
            <button className="cart-continue-btn">返回列表</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingSum;
