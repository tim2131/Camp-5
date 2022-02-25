
import React from "react";
import BookingTitle from "./BookingTitle";
import "../style/Booking.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";

// 數量加減元件
import NumericInput from "react-numeric-input";
import "../style/NumericInput.scss";

//圖片
import BookingBanner from "../img/BookingBanner.jpg";
import starFull from "../img/icon/star-full.svg";
import starEmpty from "../img/icon/star-empty.svg";
import tent2 from "../img/tent2.jpg";
import tent3 from "../img/tent3.jpg";
import tent4 from "../img/tent4.jpg";
import xamsHandMade from "../img/xamsHandMade.jpg";
import hotSpring from "../img/hotSpring.jpg";

function Booking() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <>
      <div className="container">
        {/*上半*/}
        <BookingTitle />
        <div className="banner">
          <div className="a">
            <img className="picB" src={BookingBanner} alt=""></img>
          </div>
        </div>
        <div className="bookingInfo">
          <h2>訂房資訊</h2>
        </div>
        <div className="row justify-content-between">
          <div className="col-7">
            <div className="d-flex subtitle-Block">
              <p>訂購營地: 滾草坪營滾草坪營地</p>
              <div className="customer-rate d-flex">
                <div className="total-rate-Number">
                  <p>4.1</p>
                </div>
                <img src={starFull} alt="" />
                <img src={starFull} alt="" />
                <img src={starFull} alt="" />
                <img src={starFull} alt="" />
                <img src={starEmpty} alt="" />
              </div>
            </div>
            <p>
              詳細地址: 205
              台灣省台中市北屯區大鵬路陳平里１２之３巷５之１弄３之２鄰５８號６樓之３
            </p>
            <p>
              訂房須知:※ 住宿日前3日內不得延期(除人力不可抗拒因素外),
              延期訂金保留3個月(僅限延期一次)， 並請重新訂房，恕不另行通知。 ※
              當日不接受退房,如欲更改帳型、人數、延期請於一週前通知。旅客於住宿日當天取消或怠於通知者沒收訂金總金額100
              %。 旅客於住宿日前1天取消訂房扣訂金總金額80 %。
            </p>
          </div>
          <div className="col-5 map">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
          <div className="tentBlockA row">
            <div className="col-2">
              <div className="tentSmall">
                <img className="tentSmallPic" src={tent2} alt="" />
              </div>
            </div>
            <div className="col-1 align-self-center">
              <div>
                <h5>tent1</h5>
              </div>
            </div>
            <div className="col-3 align-self-center">
              <div>
                <h3>鐘型帳</h3>
              </div>
            </div>

            <div className="tentTextBlock col-4 align-self-center">
              <div className="d-flex justify-content-center">
                <h5>
                  假日定價:1,000元/帳
                  <br />
                  平日定價:900元/帳 <br />
                  最大入住人:2人
                </h5>
              </div>
            </div>
            <div className="col-2 align-self-center">
              <NumericInput min={1} max={100} value={1} mobile />
            </div>
          </div>
          <div className="tentBlockB row">
            <div className="col-2">
              <div className="tentSmall">
                <img className="tentSmallPic" src={tent3} alt="" />
              </div>
            </div>
            <div className="col-1 align-self-center">
              <div>
                <h5>tent1</h5>
              </div>
            </div>
            <div className="col-3 align-self-center">
              <div>
                <h3>鐘型帳</h3>
              </div>
            </div>

            <div className="tentTextBlock col-4 align-self-center">
              <div className=" d-flex justify-content-center">
                <h5>
                  假日定價:1,000元/帳
                  <br />
                  平日定價:900元/帳 <br />
                  最大入住人:2人
                </h5>
              </div>
            </div>
            <div className="col-2 align-self-center">
              <NumericInput min={1} max={100} value={1} mobile />
            </div>
          </div>
          <div className="tentBlockC row">
            <div className="col-2">
              <div className="tentSmall">
                <img className="tentSmallPic" src={tent4} alt="" />
              </div>
            </div>
            <div className="col-1 align-self-center">
              <div>
                <h5>tent1</h5>
              </div>
            </div>
            <div className="col-3 align-self-center">
              <div>
                <h3>鐘型帳</h3>
              </div>
            </div>

            <div className="tentTextBlock col-4 align-self-center">
              <div className=" d-flex justify-content-center">
                <h5>
                  假日定價:1,000元/帳
                  <br />
                  平日定價:900元/帳 <br />
                  最大入住人:2人
                </h5>
              </div>
            </div>
            <div className="col-2 align-self-center">
              <NumericInput min={1} max={100} value={1} mobile />
            </div>
          </div>
        </div>
        <div className="cart-dividing-line-full"></div>

        <div className="addActs">
          <h2>加購活動</h2>
        </div>
        <div className="addActsBlockA row">
          <div className="col-4">
            <div className="actsSmall">
              <img className="actsSmallPic" src={xamsHandMade} alt="" />
            </div>
          </div>
          <div className="tentTextBlock col-4 align-self-center">
            <div className="text-align-center">
              <h3>手做聖誕吊飾</h3>
              <h5>
                目黑川是東京賞櫻景點很知名且排行前面的櫻花盛地，搭乘地鐵到中目黑站出站就可看到，每年會舉辦「目黑川櫻花季」（中目黑櫻花節）...
              </h5>
            </div>
          </div>
          <div className="col-2 align-self-center">
            <NumericInput min={0} max={4} value={1} mobile />
          </div>
          <div className="col-2 align-self-center">
            <button className="addButton">加購</button>
          </div>
        </div>
        <div className="addActsBlockB row">
          <div className="col-4">
            <div className="actsSmall">
              <img className="actsSmallPic" src={hotSpring} alt="" />
            </div>
          </div>
          <div className="tentTextBlock col-4 align-self-center">
            <div className="text-align-center">
              <h3>溫泉特區</h3>
              <h5>
                賞雪啦！每年一到了4-5月，就是全台油桐花的最佳季節，如白雪紛飛般的桐花遍佈整個台灣，除了賞花之外，還能體驗濃濃的客家氣息，這篇...
              </h5>
            </div>
          </div>
          <div className="col-2 align-self-center">
            <NumericInput min={0} max={4} value={1} mobile />
          </div>
          <div className="col-2 align-self-center">
            <button className="addButton">加購</button>
          </div>
        </div>
        <div className="cart-dividing-line-full"></div>
      </div>
    </>
  );
}

export default Booking;
