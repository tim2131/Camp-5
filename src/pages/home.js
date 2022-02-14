import React from "react";

import "../style/home.scss";
import Navbar from "../components/navbar/navbar";

//圖片
import Img01 from "../img/img01.png";
import Img02 from "../img/img02.png";
import Img03 from "../img/img03.png";
import Icon1 from "../img/page2-icon1.png";
import Icon2 from "../img/page2-icon2.png";
import Icon3 from "../img/page2-icon3.png";
import Arrow from "../img/Arrow.png";
import TextIcon from "../img/text-icon1.png";
//影片
import Video from "../img/banner.mp4";
//頁面
import Recycle from "../img/page2.png";
import Page3 from "../img/page3.png";
import Page4 from "../img/page4.png";
import Page5 from "../img/page5.png";

const Home = () => {

    return (
        <>
        <Navbar />
        <div className="homepage">
          <div className="banner">
              <video autoplay muted loop className="video">
                 <source src={Video} type="video/mp4" />
              </video>
          </div>
          <div className="recycle" style={{ backgroundImage: {Recycle} }}>
              <h2>露營很酷，但是我們讓你的露營更與眾不同。</h2>
              <div className="row page2-title">
                  <h3 className="col-md-4">露營</h3>
                  <h3 className="col-md-4">回收</h3>
                  <h3 className="col-md-4">購物</h3>
              </div>
          <div className="row page2-icon">
              <img src={Icon1} alt="Icon1" />
              <img src={Icon2} alt="Icon2" />
              <img src={Icon3} alt="Icon3" />
          </div>
              <div className="row page2-arrow">
                  <img src={Arrow} alt="Arrow" />
                  <img src={Arrow} alt="Arrow" />
          </div>
          </div>
    <div className="row page3" style={{ backgroundImage: {Page3}}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="page3-box">
                <img className="img" src={Img01} alt="pic1" />
              </div>
            </div>
            <div className="col-md-6 page-text">
              <div className="text-icon">
                <img width="70" height="70" src={TextIcon} alt="icon" />
              </div>
              <h3>優質環保營地</h3>
              <p>本網站的環保營地，根據當地特色，選用不同的環保路徑，有些人採用當地食材提供旅客用膳；有些提供環保體驗讓人了解到環境與人息息相關；有些則選用Eco-friendly的沐浴用品，不僅保護環境，也讓遊客可以試著踏出舒適圈之外。</p>
              <button type="button" className="btn btn-lg">露營去</button>
            </div>
          </div>
        </div>
    </div>
    <div className="row page4" style={{ backgroundImage: {Page4}}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 page-text">
            <div className="text-icon">
              <img width="70" height="70" src={TextIcon} alt="icon" />
            </div>
            <h3>回收兌換點數</h3>
            <p>只要本網站訂購露營營地，即可享有參加活動的資格。參加就是對環保盡一份心力，我們不要求回收的數量，不限定回收的種類，只要整理好在check-out的時候交由營主審核完畢，即可獲得點數！該點數可於本網站購物並直接兌換商品。隨手做環保！世界更美好！！</p>
            <button type="button" className="btn btn-lg">參加去</button>
          </div>
          <div className="col-md-6">
            <div className="page3-box">
              <img className="img" src={Img02} alt="pic2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row page5" style={{ backgroundImage: {Page5}}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="page3-box">
              <img className="img" src={Img03} alt="pic3" />
            </div>
          </div>
          <div className="col-md-6 page-text">
            <div className="text-icon">
              <img width="70" height="70" src={TextIcon} alt="icon" />
            </div>
            <h3>優質環保商品</h3>
            <p>本網站的商品嚴選對環境盡一份心力，無論是對水質不會造成優養化的沐浴乳，或者是每重複使用一次就少一個塑膠杯的環保杯，至使用回收塑膠做成的夾腳拖，皆是對環保有益處的商品。應有盡有。</p>
            <button type="button" className="btn btn-lg">購物去</button>
          </div>
        </div>
      </div>
    </div>
    </div>
        </>
    )
}

export default Home;


