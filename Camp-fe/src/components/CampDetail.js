import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "../style/CampDetail.scss";
import ProductReview from "./ProductReview";
import SimilarProduct from "./SimilarProduct";
import PicSlider from "./PicSlider";
import Map from "./Map";

//日曆
import "react-date-range/src/styles.scss"; // main style file
import "react-date-range/src/theme/default.scss"; // theme css file
import { DateRange } from "react-date-range";
//圖片
import meal from "../img/meal.svg"; //
import car from "../img/car.svg"; //
import wind from "../img/wind.svg"; //
import wifi from "../img/wifi.svg"; //
import phone from "../img/phone.svg"; //
import bed from "../img/bed.svg";

import bike from "../img/bike.jpg";
import diy from "../img/diy.jpg";
import pet from "../img/pet.jpg";
import TentSelect from "./TentSelect";

function CampDetail() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [data, setData] = useState([]);
  const [tentdata, setTentData] = useState([]);
  const { campId } = useParams();
  useEffect(() => {
    let getCamp = async () => {
      let response = await axios.get(
        `http://localhost:3002/api/camp/${campId}`
      );
      let response1 = await axios.get(
        `http://localhost:3002/api/tentcate/${campId}`
      );

      setData(response.data);
      setTentData(response1.data);
    };
    getCamp();
  }, []);
  //日期加入localStorage
  useEffect(() => {
    localStorage.setItem("myDate", JSON.stringify(state));
  }, [state]);

  //檢視日期
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("myDate"));
    console.log(a);
    console.log(localStorage.key(0));
  }, []);

  //加入立即按鈕
  // 全部資料都寫入，要用時再挑出需要的特定資料
  async function handleSumbit(e) {
    // e.preventDefault();
    console.log("state", state);
  }

  return (
    <>
      {data.map((item) => {
        return (
          <>
            <div className="container">
              <div>
                <PicSlider data={data} />
                <div className="campName">
                  <h1>{item.camp_name}</h1>
                </div>
                <div className="line" />
                <div className="labelGroup">
                  <div className="labelA">
                    <h5>{item.camp_county}</h5>
                  </div>
                  <div className="labelB">
                    <h5>{item.camp_item}</h5>
                  </div>
                  <div className="labelC">
                    <h5>{item.tent_item}</h5>
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
                            設施介紹
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
                            入住須知
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
                              <br />
                              <br />
                              <div>
                                <img
                                  src={meal}
                                  width={30}
                                  height={30}
                                  alt=""
                                  className="imgMargin"
                                />
                                含早餐
                              </div>
                              <br />
                              <br />
                              <div>
                                <img
                                  src={car}
                                  width={30}
                                  height={30}
                                  alt=""
                                  className="imgMargin"
                                />
                                可租停車場
                              </div>
                              <br />
                              <br />
                              <div>
                                <img
                                  src={wind}
                                  width={30}
                                  height={30}
                                  alt=""
                                  className="imgMargin"
                                />
                                冷氣
                              </div>
                              <br />
                              <br />
                              <div>
                                <img
                                  src={wifi}
                                  width={30}
                                  height={30}
                                  alt=""
                                  className="imgMargin"
                                />
                                全域快速wifi
                              </div>
                              <br />
                              <br />
                              <div>
                                <img
                                  src={phone}
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                中華電信有收訊
                              </div>
                              <br />
                              <br />
                              <div>
                                <img
                                  src={bed}
                                  width={30}
                                  height={30}
                                  alt=""
                                  className="imgMargin"
                                />
                                最多4人
                              </div>
                              <br />
                              <br />
                            </div>
                            <div className="facDetialGroup">
                              <br />
                              <br />
                              <div>
                                <h5>內含裝備</h5>
                              </div>

                              <br />
                              <div>
                                <h5>
                                  /全套免搭拆服務 /營地費 /帳篷/天幕 /戶外桌椅
                                  /高密度海棉床 »床120X190CMX2 /睡袋/枕頭
                                  /帳內外照明/延長線
                                </h5>
                              </div>

                              <br />
                              <div>
                                <h5>餐食 不含餐食 看加購餐食菜單</h5>
                              </div>

                              <br />
                              <div>
                                <h5>
                                  炊具擇一 烤肉架含網1片 / 卡式爐含瓦斯1罐
                                  每帳二擇一
                                </h5>
                              </div>

                              <br />
                              <div>
                                <h5>帳篷尺寸 直徑270公分</h5>
                              </div>

                              <br />
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
                            <h4>
                              我們也提供露營場地租借服務。
                              輕裝簡便、收拾行囊，讓您享受自給自足的露營樂趣！
                              烤肉代訂服務：烤肉架100元，卡式爐150元；詳細代訂物品請點擊下方按鈕查看，歡迎加Line：@908gowqr或來電預訂。
                              若需加人請事先告知，每房限加一位大人及一位小孩。
                              加人需另外依年紀收費。4~11歲收費$1,200元；12歲(含)以上收費$1,500元；3歲以下一位不收費。
                              農曆春節期間，大人收費為$2,000元。
                              為確保住客安全及設施完備，本莊園營帳區及客廳區頂棚、陽傘等設備，本莊園有權視風力情況予以解除不予提供。另因應颱風前後，營區設備之解除及組裝，本莊園有權請預訂之客人提前或延期，客人不得異議。
                              本莊園除導盲犬外，暫不接待寵物。
                              天候預測如入住日風速超過30km以上，建議客人可做延期。
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mapA">
                      <Map />
                    </div>
                    <div className="dateTable">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        rangeColors={["#6a6842"]}
                        className="dateranger"
                      />
                    </div>
                  </div>
                </div>
                <TentSelect />
                <div className="d-flex justify-content-center">
                  <Link to={`/booking/${item.Cid}`}>
                    <button
                      className="btn btn-danger btn-lg reserveBtn orangeBtn"
                      type="submit"
                      onClick={handleSumbit}
                    >
                      立即預定
                    </button>
                  </Link>
                </div>
                <div className="addAct">
                  <h3>加購活動</h3>
                </div>
                <div className="C">
                  <div className="row">
                    <div className="col-4">
                      <div
                        className="card cardC"
                        style={{ width: "382px", height: "545px" }}
                      >
                        <img className="card-img-top pet" src={pet} alt="" />
                        <div className="card-body">
                          <h3>寵物</h3>
                          <p className="card-text">
                            帶寵物一起來寵物野餐吧，提供鮮食、玩具，讓主人同時一起與寵物在陽光、草地的包圍下，享受大自然的懷抱。
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="card cardC"
                        style={{ width: "382px", height: "545px" }}
                      >
                        <img className="card-img-top diy" src={diy} alt="" />
                        <div className="card-body">
                          <h3>手作體驗</h3>
                          <p className="card-text">
                            專業手作家飾職人及美編教學指導，體驗創意DIY。
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="card cardC"
                        style={{ width: "382px", height: "545px" }}
                      >
                        <img className="card-img-top bike" src={bike} alt="" />
                        <div className="card-body">
                          <h3>自行車</h3>
                          <p className="card-text">
                            騎乘自行車享受迎風吹拂並欣賞湖畔風光環湖欣賞美景
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
