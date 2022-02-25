import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../style/CampDetail.scss";
import ProductReview from "./ProductReview";
import SimilarProduct from "./SimilarProduct";
import PicSlider from "./PicSlider";
import Test2 from "../components/Test2";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
//圖片
import meal from "../img/meal.svg";
import car from "../img/car.svg";
import wind from "../img/wind.svg";
import wifi from "../img/wifi.svg";
import phone from "../img/phone.svg";
import bed from "../img/bed.svg";
import tent2 from "../img/tent2.jpg";
import tent3 from "../img/tent3.jpg";
import tent4 from "../img/tent4.jpg";
import sakura from "../img/sakura.jpg";
import tungflower from "../img/tungflower.jpg";

function CampDetail() {
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
      {data.map((item) => {
        return (
          <>
            <div className="container">
              <div>
                <PicSlider />
                <div className="campName">
                  <h1>{item.camp_name}</h1>
                </div>
                <div className="line" />
                <div className="labelGroup">
                  <div className="labelA">
                    <h5>{item.camp_county}</h5>
                  </div>
                  <div className="labelB">
                    <h5>草地</h5>
                  </div>
                  <div className="labelC">
                    <h5>TEEPEE</h5>
                  </div>
                </div>
                <div className="address">
                  <h5>{item.camp_add}</h5>
                </div>
                <div className="campIntro">
                  <h5>{item.camp_intro}</h5>
                </div>
                <div className="B row">
                  <div className="col-6">
                    <div className="A">
                      <ul
                        className="nav nav-tabs nav-fill"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Home
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Profile
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="d-flex">
                            <div className="facGroup">
                              <div>
                                <img src={meal} width={30} height={30} alt="" />
                                含早餐
                              </div>
                              <div>
                                <img src={car} width={30} height={30} alt="" />
                                可租停車場
                              </div>
                              <div>
                                <img src={wind} width={30} height={30} alt="" />
                                冷氣
                              </div>
                              <div>
                                <img src={wifi} width={30} height={30} alt="" />
                                全域快速wifi
                              </div>
                              <div>
                                <img
                                  src={phone}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                中華電信有收訊
                              </div>
                              <div>
                                <img src={bed} width={30} height={30} alt="" />
                                最多4人
                              </div>
                            </div>
                            <div className="facDetialGroup">
                              <div>內含裝備</div>
                              <div>
                                /全套免搭拆服務 /營地費 /帳篷/天幕 /戶外桌椅
                                /高密度海棉床 »床120X190CMX2 /睡袋/枕頭
                                /帳內外照明/延長線
                              </div>
                              <div>餐食 不含餐食 看加購餐食菜單</div>
                              <div>
                                炊具擇一 烤肉架含網1片 / 卡式爐含瓦斯1罐
                                每帳二擇一
                              </div>
                              <div>帳篷尺寸 直徑270公分</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="note">
                            我們也提供露營場地租借服務。
                            輕裝簡便、收拾行囊，讓您享受自給自足的露營樂趣！
                            烤肉代訂服務：烤肉架100元，卡式爐150元；詳細代訂物品請點擊下方按鈕查看，歡迎加Line：@908gowqr或來電預訂。
                            若需加人請事先告知，每房限加一位大人及一位小孩。
                            加人需另外依年紀收費。4~11歲收費$1,200元；12歲(含)以上收費$1,500元；3歲以下一位不收費。
                            農曆春節期間，大人收費為$2,000元。
                            為確保住客安全及設施完備，本莊園營帳區及客廳區頂棚、陽傘等設備，本莊園有權視風力情況予以解除不予提供。另因應颱風前後，營區設備之解除及組裝，本莊園有權請預訂之客人提前或延期，客人不得異議。
                            本莊園除導盲犬外，暫不接待寵物。
                            天候預測如入住日風速超過30km以上，建議客人可做延期。
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mapA">
                      <Test2 />
                    </div>
                    <div className="dateTable">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                      />
                    </div>
                  </div>
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
                    <div className="count">數量</div>
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
                    <div className="count">數量</div>
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
                    <div className="count">數量</div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger btn-lg reserveBtn"
                    type="submit"
                  >
                    立即預定
                  </button>
                </div>
                <div className="addAct">
                  <h3>加購活動</h3>
                </div>
                <div className="C">
                  <div className="row">
                    <div className="col">
                      <div
                        className="card"
                        style={{ width: "382px", height: "545px" }}
                      >
                        <img
                          className="card-img-top sakura"
                          src={sakura}
                          alt=""
                        />
                        <div className="card-body">
                          <h3>櫻花祭</h3>
                          <p className="card-text">
                            目黑川是東京賞櫻景點很知名且排行前面的櫻花盛地，搭乘地鐵到中目黑站出站就可看到，每年會舉辦「目黑川櫻花季」（中目黑櫻花節）...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        className="card"
                        style={{ width: "382px", height: "545px" }}
                      >
                        <img
                          className="card-img-top tungFlower"
                          src={tungflower}
                          alt=""
                        />
                        <div className="card-body">
                          <h3>客家桐花季</h3>
                          <p className="card-text">
                            賞雪啦！每年一到了4-5月，就是全台油桐花的最佳季節，如白雪紛飛般的桐花遍佈整個台灣，除了賞花之外，還能體驗濃濃的客家氣息，這篇...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}

      <ProductReview />
      <SimilarProduct />
    </>
  );
}
export default CampDetail;
