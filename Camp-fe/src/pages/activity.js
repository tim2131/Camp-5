import React from "react";
import "../style/activity.scss";
import Navbar from "../components/navbar";

// 圖片
import image29 from "../img/image 29.png";
import image30 from "../img/image 30.png";
import image31 from "../img/image 31.png";
import image34 from "../img/image 34.png";

import arrow from "../img/arrow-right 4.png";
import arrow1 from "../img/Union.png";
import arrow2 from "../img/Union1.png";
import polygon from "../img/Polygon 14.png";
import polygon1 from "../img/Polygon 15.png";

import group1638 from "../img/Group 1638.png";
import group1639 from "../img/Group 1639.png";



const Activity = () => {
  return (
    <>
      <div className="activitypage">
        <div className="subtract">
          <h2>舉手做環保，青山綠水才有保。</h2>
        </div>
      </div>

      <div className="container">
        <div className="row page3"></div>

        <div className="row page4">
          <h2>落實做環保，地球永不老</h2>
          <p>節能減排，保護環境，促進再生資源回收利用。</p>
          <div className="row arrow">
            <img src={arrow} alt="Arrow" />
            <img src={arrow} alt="Arrow" />
            <img src={arrow} alt="Arrow" />
          </div>
          <div className="row icon">
            <img src={image29} alt="image29" />
            <img src={image34} alt="image34" />
            <img src={image30} alt="image30" />
            <img src={image31} alt="image31" />
          </div>
          <div className="text">
            <p className="p1 col-md-3">1.至配合營地露營</p>
            <p className="p2 col-md-3">2.維護環境清潔，撿回收</p>
            <p className="p3 col-md-3">3.將回收成果提交營主審核</p>
            <p className="p4 col-md-3">4.獲得回收點數</p>
          </div>
        </div>

        <div className="row page5">
          <h2>環保點數兌換</h2>
          <p className="slogan">環保點數可兌換全站環保商品!</p>
          <h3>推薦商品</h3>
          <div className="icon">
            <img src={group1638} alt="group1638" />
            <img src={group1639} alt="group1639" />
            <img src={group1638} alt="group1638" />
          </div>
          <div className="arrow">
            <img src={arrow1} alt="arrow1" />
            <img src={arrow2} alt="arrow2" />
          </div>
          <div className="polygon">
            <img src={polygon} alt="polygon" />
            <img src={polygon1} alt="polygon1" />
          </div>
          <div className="text">
              <p className="col-md-4 product-text">關谷空氣壺</p>
              <p className="col-md-4 product-text">關谷空氣壺</p>
              <p className="col-md-4 product-text">關谷空氣壺</p>
          </div>

          <div className="button">
          <button type="button" className="btn btn-lg">兌換去</button>
          <button type="button" className="btn btn-lg">兌換去</button>
          <button type="button" className="btn btn-lg">兌換去</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
