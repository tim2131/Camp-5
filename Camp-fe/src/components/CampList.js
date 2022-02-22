import camplist from "../img/camplist.jpg";
import "../style/camplist.css";
import { Dropdown } from "react-bootstrap";
import camp from "../img/loing.png";
import searchicon from "../img/search.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CampList = () => {
  const [campdata, setCampdata] = useState([]); //原始資料
  const [showdata, setShowdata] = useState([]); //畫面顯示資料
  const [searchWord, setSearchWord] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [cate, setCate] = useState([]); //主題分類
  const [cate2, setCate2] = useState([]); //地點分類
  const [cate3, setCate3] = useState([]); //帳篷分類

  useEffect(() => {
    let getData = async () => {
      let response = await axios.get("http://localhost:3002/camplist");

      setCampdata(response.data);
      setShowdata(response.data);
      //console.log(campdata);
    };
    getData();
  }, []);

  //搜尋功能

  const handleSearch = (campdata, searchWord) => {
    let newCampdata = [...campdata];

    if (searchWord.length) {
      newCampdata = campdata.filter((v, i) => {
        console.log(v.camp_name, searchWord, v.camp_name.indexOf(searchWord));
        return v.camp_name.indexOf(searchWord) >= 0;
      });
    }

    return newCampdata;
  };

  //價錢排序
  const handleSort = (campdata, sortBy) => {
    let newCampdata = [...campdata];

    if (sortBy === "1") {
      newCampdata = [...newCampdata].sort(
        (a, b) => a.camp_price - b.camp_price
      );
    }

    if (sortBy === "2") {
      newCampdata = [...newCampdata].sort(
        (a, b) => b.camp_price - a.camp_price
      );
    }

    // 預設用id 小至大
    if (sortBy === "" && newCampdata.length > 0) {
      newCampdata = [...newCampdata].sort((a, b) => a.id - b.id);
    }

    return newCampdata;
  };

  //環境分類功能
  const handleChecked = (e) => {
    let value = e.target.value;
    console.log(value);
    console.log(cate.includes(value));
    if (!cate.includes(value)) {
      setCate([...cate, value]);
    }

    if (cate.includes(value)) {
      const newCate = cate.filter((v) => v !== value);

      setCate(newCate);
      console.log("Cate", newCate);
    }
  };

  //環境分類
  const handleCate = (campdata, cate) => {
    let newCampdata = [...campdata];

    // cate = 代表使用者目前勾選的標籤陣列
    //console.log("cate",cate);

    // 處理勾選標記
    if (cate.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;
        const campcate = v.item1.split(",");

        for (let i = 0; i < cate.length; i++) {
          if (campcate.includes(cate[i])) {
            isFound = true;
          }
        }
        //return v.item1.includes(cate);
        return isFound;
      });
    }
    // console.log(newCampdata)
    return newCampdata;
  };

  //地點分類
  const handleChecked2 = (e) => {
    let value = e.target.value;
    console.log(value);
    console.log(cate2.includes(value));
    if (!cate2.includes(value)) {
      setCate2([...cate2, value]);
    }

    if (cate2.includes(value)) {
      const newCate = cate2.filter((v) => v !== value);

      setCate2(newCate);
    }
  };

  //地點分類
  const handleCate2 = (campdata, cate2) => {
    let newCampdata = [...campdata];

    // cate = 代表使用者目前勾選的標籤陣列
    console.log("cate2", cate2);

    // 處理勾選標記
    if (cate2.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;

        const countycate = v.camp_county.split(",");

        for (let i = 0; i < cate2.length; i++) {
          if (countycate.includes(cate2[i])) {
            isFound = true;
          }
        }
        // return v.camp_county.includes(cate2);
        return isFound;
      });
    }
    // console.log(newCampdata)
    return newCampdata;
  };

  //帳篷分類
  const handleChecked3 = (e) => {
    let value = e.target.value;
    // console.log(value);
    // console.log(cate3.includes(value));
    if (!cate3.includes(value)) {
      setCate3([...cate3, value]);
    }

    if (cate3.includes(value)) {
      const newCate = cate3.filter((v) => v !== value);

      setCate3(newCate);
    }
  };

  //帳篷分類
  const handleCate3 = (campdata, cate3) => {
    let newCampdata = [...campdata];

    // cate = 代表使用者目前勾選的標籤陣列
    // console.log("cate3", cate3);

    // 處理勾選標記
    if (cate3.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;

        const tentcate = v.item.split(",");
        for (let i = 0; i < cate3.length; i++) {
          if (tentcate.includes(cate3[i])) {
            isFound = true;
          }
        }
        return isFound;
      });
    }

    return newCampdata;
  };

  useEffect(() => {
    let newCampdata = [...campdata];
    //搜尋字串太少不需要搜尋
    // if (searchWord.length < 3 && searchWord.length !== 0) return;

    // 處理搜尋

    newCampdata = handleSearch(newCampdata, searchWord);

    // 處理排序
    newCampdata = handleSort(newCampdata, sortBy);

    // 處理勾選標記
    newCampdata = handleCate(newCampdata, cate);

    //處理地點篩選
    newCampdata = handleCate2(newCampdata, cate2);

    //處理帳篷篩選
    newCampdata = handleCate3(newCampdata, cate3);

    setShowdata(newCampdata);
  }, [searchWord, sortBy, cate, cate2, cate3]);

  return (
    <>
      <div className="bodybg">
        {/* 橫幅圖片 */}
        <div className="img1">
          <img src={camplist} />
        </div>

        <div className="backgroundPic">
          
          <h1 className="h1 text-center">營地一覽</h1>
          <div>
            <select
              className="form-select form-select-sm Dropdown"
              aria-label=".form-select-sm example"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">依價格排序</option>
              <option value="1">由少至多</option>
              <option value="2">由多至少</option>
            </select>
          </div>

          <div>
            {/* 搜尋欄位 */}
            <input
              type="text"
              className="search"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <button>
              <img src={searchicon} />
            </button>
          </div>
          <br />
          <br />
          <br />

          <div>
            {/* 營地分類 */}
            <div className="aside sticky-top">
              <h2 className="h2">營地分類</h2>
              <label className="sidenav">露營設備</label>
              <ul className="filter1">
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="露營車"
                      checked={cate3.includes("露營車")}
                      onChange={handleChecked3}
                    />
                    <label>露營車</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="鐘形帳篷"
                      checked={cate3.includes("鐘形帳篷")}
                      onChange={handleChecked3}
                    />
                    <label>鐘形帳篷</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="蒙古包"
                      checked={cate3.includes("蒙古包")}
                      onChange={handleChecked3}
                    />
                    <label>蒙古包</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="狩獵帳"
                      checked={cate3.includes("狩獵帳")}
                      onChange={handleChecked3}
                    />
                    <label>狩獵帳</label>
                  </div>
                </li>
              </ul>
              <label className="sidenav">營地環境</label>
              <ul className="filter2">
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c1"
                      value="山間秘境"
                      checked={cate.includes("山間秘境")}
                      onChange={handleChecked}
                    />
                    <label>山間秘境</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c2"
                      value="自然森林"
                      checked={cate.includes("自然森林")}
                      onChange={handleChecked}
                    />
                    <label>自然森林</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c3"
                      value="溪邊戲水"
                      checked={cate.includes("溪邊戲水")}
                      onChange={handleChecked}
                    />
                    <label>溪邊戲水</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c4"
                      value="蔚藍海景"
                      checked={cate.includes("蔚藍海景")}
                      onChange={handleChecked}
                    />
                    <label>蔚藍海景</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c5"
                      value="浪漫夜景"
                      checked={cate.includes("浪漫夜景")}
                      onChange={handleChecked}
                    />
                    <label>浪漫夜景</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c6"
                      value="仙境雲海"
                      checked={cate.includes("仙境雲海")}
                      onChange={handleChecked}
                    />
                    <label>仙境雲海</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      name="c7"
                      value="賞花海景"
                      checked={cate.includes("賞花海景")}
                      onChange={handleChecked}
                    />
                    <label>賞花海景</label>
                  </div>
                </li>
              </ul>
              <label className="sidenav">營地地點</label>
              <ul className="filter3">
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="臺北市"
                      checked={cate2.includes("臺北市")}
                      onChange={handleChecked2}
                    />
                    <label>臺北市</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="新北市"
                      checked={cate2.includes("新北市")}
                      onChange={handleChecked2}
                    />
                    <label>新北市</label>
                  </div>
                </li>

                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="新竹縣"
                      checked={cate2.includes("新竹縣")}
                      onChange={handleChecked2}
                    />
                    <label>新竹縣</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="苗栗縣"
                      checked={cate2.includes("苗栗縣")}
                      onChange={handleChecked2}
                    />
                    <label>苗栗縣</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="南投縣"
                      checked={cate2.includes("南投縣")}
                      onChange={handleChecked2}
                    />
                    <label>南投縣</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="屏東縣"
                      checked={cate2.includes("屏東縣")}
                      onChange={handleChecked2}
                    />
                    <label>屏東縣</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="臺東縣"
                      checked={cate2.includes("臺東縣")}
                      onChange={handleChecked2}
                    />
                    <label>臺東縣</label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      type="checkbox"
                      value="花蓮縣"
                      checked={cate2.includes("花蓮縣")}
                      onChange={handleChecked2}
                    />
                    <label>花蓮縣</label>
                  </div>
                </li>
              </ul>
            </div>
            <div className="container movecontent">
              <div className="row">
                {/* 側邊空位 */}
                <div className="col-3"></div>
                {/* 主打營地 */}
                <div className="col-9">
                  <div class="card hotcamp">
                    <div className="movebadge d-flex justify-content-end">
                      <span class="badge badge1size">新竹縣</span>
                      <span class="badge badge2size">草地</span>
                      <span class="badge badge3size">狩獵帳</span>
                    </div>
                    <img src={camp} class="card-img-top" />
                    <div class="card-body">
                      <p class="card-text text-center">新竹五峰</p>
                      <p class="card-text text-center hotcampName">
                        樂哈山營地
                      </p>
                      <p class="card-text text-center hotcampPrice">
                        $3000元起
                      </p>
                      <a href="#" class="btn hotbookingBtn">
                        立即預約
                      </a>
                    </div>
                  </div>
                </div>
                {/* 側邊空位 */}
                <div className="col-3 "></div>
                {/* 營地列表Card */}
                <div className="col-9">
                  <div className="row">
                    {showdata.map((v, id) => {
                      return (
                        <div key={id} className="col-4">
                          <div class="card content">
                            <div className="movebadge d-flex justify-content-end">
                              <span class="badge badge1size">
                                {v.camp_county}
                              </span>
                              <span class="badge badge2size">{v.item1}</span>
                              <span class="badge badge3size">{v.item}</span>
                            </div>
                            <img
                              src={`http://localhost:3002/static/${v.img1}`}
                              class="card-img-top content-img"
                              alt="..."
                            />
                            <div class="card-body">
                              <h5 class="h5 card-title text-center">
                                新竹五峰
                              </h5>
                              <p class="card-text text-center campName">
                                {v.camp_name}
                              </p>
                              <p class="card-text text-center campPrice">
                                ${v.camp_price}元起
                              </p>
                              <a href="#" class="btn bookingBtn">
                                立即預約
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CampList;
