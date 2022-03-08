import React from "react";
import BookingTitle from "./BookingTitle";
import "../style/Booking.scss";
import "react-date-range/src/styles.scss"; // main style file
import "react-date-range/src/theme/default.scss"; // theme css file
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TentSelect from "./TentSelect";

import axios from "axios";

//圖片
import BookingBanner from "../img/BookingBanner.jpg";
import starFull from "../img/icon/star-full.svg";
import starEmpty from "../img/icon/star-empty.svg";
import AddAct from "./AddAct";
import BookingSum from "./BookingSum";

function Booking() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [data, setData] = useState([]);
  const { campId } = useParams();

  useEffect(() => {
    let getCamp = async () => {
      let response = await axios.get(
        `http://localhost:3002/api/camp/${campId}`
      );

      setData(response.data);
    };
    getCamp();
  }, []);
  return (
    <>
      {data.map((v, i) => {
        return (
          <>
            <div className="container">
              {/*上半*/}
              <BookingTitle />
              <div className="bannerB">
                <div className="a">
                  <img className="picB" src={BookingBanner} alt=""></img>
                </div>
              </div>
              <div className="bookingInfo">
                <h2>訂房資訊</h2>
              </div>
              <div className="row justify-content-between">
                <div className="col-6">
                  <div className="d-flex subtitle-Block">
                    <h4>訂購營地:{v.camp_name}</h4>
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
                  <h4>詳細地址:{v.camp_add}</h4>
                  <h4>訂房須知:</h4>
                  <h5>
                    ※ 住宿日前3日內不得延期(除人力不可抗拒因素外),
                    延期訂金保留3個月(僅限延期一次)，
                    並請重新訂房，恕不另行通知。 ※
                    當日不接受退房,如欲更改帳型、人數、延期請於一週前通知。旅客於住宿日當天取消或怠於通知者沒收訂金總金額100
                    %。 旅客於住宿日前1天取消訂房扣訂金總金額80 %。
                  </h5>
                </div>
                <div className="col-4 map">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </div>
              </div>
              <TentSelect />
              <div className="cart-dividing-line-full"></div>

              <div className="addActs">
                <h2>加購活動</h2>
              </div>
              <AddAct />
              <BookingSum />
              <div className="cart-dividing-line-full"></div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Booking;
