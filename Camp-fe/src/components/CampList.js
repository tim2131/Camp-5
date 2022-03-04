import camplist from "../img/camplist.jpg";
import "../style/camplist.css";
import "../style/camplist.scss";

import searchicon from "../img/search.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Filterbar from "./Filterbar";
import { Navigate, Link } from "react-router-dom";
import starFull from "../img/icon/star-full.svg";
import starEmpty from "../img/icon/star-empty.svg";
import Pagination from "./Pagination";
import Footer from "./Footer";
import Hotcamp from "./Hotcamp";

const CampList = () => {
  const [campdata, setCampdata] = useState([]); //原始資料
  const [showdata, setShowdata] = useState([]); //畫面顯示資料
  const [searchWord, setSearchWord] = useState(""); //搜尋
  const [sortBy, setSortBy] = useState(""); //價格排序
  const [cate, setCate] = useState([]); //主題分類
  const [cate2, setCate2] = useState([]); //地點分類
  const [cate3, setCate3] = useState([]); //帳篷分類
  const [currentPage, setCurrentPage] = useState(1); //當前頁面
  const [postsPerPage, setPostsPerPage] = useState(12); //一頁顯示幾筆
  const [countydata, setCountydata] = useState([]); //縣市資料
  const [catedata, setCatedata] = useState([]); //營利環境資料
  const [tentdata, setTentdata] = useState([]); //帳篷資料
  const [region1data, setRegion1data] = useState([]); //北區資料
  const [region2data, setRegion2data] = useState([]); //中區資料
  const [region3data, setRegion3data] = useState([]); //南區資料
  const [region4data, setRegion4data] = useState([]); //東區資料
  const camptagWords = {
    1: "主打",
    2: "促銷",
  };

  const camptagcolor = {
    1: "camptagStar",
    2: "camptag",
  };

  const indexOfLastPosts = currentPage * postsPerPage; //每一頁的最後一筆資料
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage; //每一頁的第一筆資料

  //從陣列中抓每一頁的第一筆到最後一筆資料
  const currentPost = showdata.slice(indexOfFirstPosts, indexOfLastPosts);

  //抓後台資料
  useEffect(() => {
    let getAllData = async () => {
      let responsecounty = await axios.get("http://localhost:3002/county");
      let responsecate = await axios.get("http://localhost:3002/cate");
      let responsetent = await axios.get("http://localhost:3002/tent");
      let responsecamplist = await axios.get("http://localhost:3002/camplist");
      let responseregion1 = await axios.get("http://localhost:3002/region1");
      let responseregion2 = await axios.get("http://localhost:3002/region2");
      let responseregion3 = await axios.get("http://localhost:3002/region3");
      let responseregion4 = await axios.get("http://localhost:3002/region4");

      setCountydata(responsecounty.data);
      setCatedata(responsecate.data);
      setTentdata(responsetent.data);
      setCampdata(responsecamplist.data);
      setShowdata(responsecamplist.data);
      setRegion1data(responseregion1.data);
      setRegion2data(responseregion2.data);
      setRegion3data(responseregion3.data);
      setRegion4data(responseregion4.data);

      window.scrollTo({
        top: 0,
      });
    };
    getAllData();
  }, []);

  //星星
  const getStar = (star) => {
    let stars = [];
    for (let i = 0; i < star; i++) {
      stars.push(<img src={starFull} alt="" />);
    }
    for (let i = 0; i < 5 - star; i++) {
      stars.push(<img src={starEmpty} alt="" />);
    }

    return stars;
  };

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
      newCampdata = [...newCampdata].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "2") {
      newCampdata = [...newCampdata].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "3") {
      newCampdata = [...newCampdata].sort((a, b) => a.stars - b.stars);
    }
    if (sortBy === "4") {
      newCampdata = [...newCampdata].sort((a, b) => b.stars - a.stars);
    }

    // 預設用id 小至大
    if (sortBy === "" && newCampdata.length > 0) {
      newCampdata = [...newCampdata].sort((a, b) => a.Cid - b.Cid);
    }

    return newCampdata;
  };

  //環境分類 處理勾選標記 開始篩選
  const handleCate = (campdata, cate) => {
    let newCampdata = [...campdata];

    if (cate.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;

        //字串轉陣列
        const campcate = v.camp_item.split(",");

        for (let i = 0; i < cate.length; i++) {
          //只要找到一筆符合的資料 就停止
          if (campcate.includes(cate[i])) {
            isFound = true;
          }
        }
        return isFound;
      });
    }
    return newCampdata;
  };

  //地點分類  處理勾選標記 開始篩選
  const handleCate2 = (campdata, cate2) => {
    let newCampdata = [...campdata];

    if (cate2.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;

        //字串轉陣列
        const countycate = v.camp_county.split(",");

        for (let i = 0; i < cate2.length; i++) {
          //只要找到一筆符合的資料 就停止
          if (countycate.includes(cate2[i])) {
            isFound = true;
          }
        }

        return isFound;
      });
    }

    return newCampdata;
  };

  //帳篷分類  處理勾選標記 開始篩選
  const handleCate3 = (campdata, cate3) => {
    let newCampdata = [...campdata];

    if (cate3.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;
        //字串轉陣列
        const tentcate = v.tent_item.split(",");
        for (let i = 0; i < cate3.length; i++) {
          //只要找到一筆符合的資料 就停止
          if (tentcate.includes(cate3[i])) {
            isFound = true;
          }
        }
        return isFound;
      });
    }

    return newCampdata;
  };

  //呈現篩選後資料
  useEffect(() => {
    let newCampdata = [...campdata];

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
        <div>
          <img src={camplist} className="img1" />
        </div>

        <div className="backgroundPic">
          <h1 className="camplisth1 text-center">營地一覽</h1>

          <div>
            <select
              className="form-select form-select-sm Dropdown"
              aria-label=".form-select-sm example"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">依價格或星星數排序</option>
              <option value="1">價格由少至多</option>
              <option value="2">價格由多至少</option>
              <option value="3">星星數由少至多</option>
              <option value="4">星星數由多至少</option>
            </select>
          </div>

          <div>
            {/* 搜尋欄位 */}
            <input
              type="text"
              className="search"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="搜尋營地"
            />
            {/* <button>
              <img src={searchicon} />
            </button> */}
          </div>

          <div className="row">
            <div className="col-3 asideheight">
              {/* 營地分類 */}
              <Filterbar
                cate={cate}
                cate2={cate2}
                cate3={cate3}
                tentdata={tentdata}
                countydata={countydata}
                catedata={catedata}
                setCate2={setCate2}
                setCate={setCate}
                setCate3={setCate3}
                region1data={region1data}
                region2data={region2data}
                region3data={region3data}
                region4data={region4data}
              />
            </div>
          </div>

          <div className="container movecontent">
            <div className="row">
              <Hotcamp getStar={getStar}/>
              {/* 側邊空位 */}
              <div className="col-3 "></div>

              {/* 營地列表Card */}
              <div className="col-9 movelist">
                <div className="row">
                  {currentPost.map((v) => {
                    return (
                      <div className="col-4">
                        <div key={v.id} class="card content">
                          <div className="movebadge d-flex justify-content-end">
                            <span class="badge badge1size">
                              {v.camp_county}
                            </span>
                            <span class="badge badge2size">{v.camp_item}</span>
                            <span class="badge badge3size">{v.tent_item}</span>
                          </div>
                          <div className="camplistPicBox">
                            <div className="camptagWord">
                              {camptagWords[v.camp_tag]}
                            </div>
                            <div className={camptagcolor[v.camp_tag]}></div>
                            <div className="camplist_item">
                              <img
                                className="camppic"
                                src={`http://localhost:3002/static/${v.img1}`}
                                alt=""
                              />
                            </div>
                          </div>

                          <div class="card-body">
                            <p class="card-text text-center campName">
                              {v.camp_name}
                            </p>
                            <p class="card-text text-center campPrice">
                              ${v.price}元起
                            </p>

                            <div className="d-flex star">
                              <div className="avgnumber">{v.stars}</div>
                              {getStar(v.stars)}
                            </div>

                            <Link to={`/camp/${v.Cid}`} class="btn bookingBtn">
                              立即預約
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 頁碼 */}
          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            showdata={showdata}
            setCurrentPage={setCurrentPage}
          />

          <div className="footerbox">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampList;
