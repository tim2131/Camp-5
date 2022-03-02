import productslist from "../img/productslistpic.png";
import "../style/ProductsList.css";
import "../style/camplist.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PFilterbar from "./PFilterbar";
import { Navigate, Link } from "react-router-dom";
import starFull from "../img/icon/star-full.svg";
import starEmpty from "../img/icon/star-empty.svg";
import Pagination from "./Pagination";
import Footer from "./Footer";
import Hotcamp from "./Hotcamp";

const CampList = () => {
  const [productdata, setProductdata] = useState([]); //原始資料
  const [showdata, setShowdata] = useState([]); //畫面顯示資料
  const [searchWord, setSearchWord] = useState(""); //搜尋
  const [sortBy, setSortBy] = useState(""); //價格排序
  const [cate, setCate] = useState([]); //分類
 
  const [currentPage, setCurrentPage] = useState(1); //當前頁面
  const [postsPerPage, setPostsPerPage] = useState(12); //一頁顯示幾筆
  const [productcate, setProductCate] = useState([]); //環保餐具分類
  const [productcate2, setProductCate2] = useState([]); //環保家具分類
  const [productcate3, setProductCate3] = useState([]); //露營裝備分類


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
      let responseproductslist = await axios.get(
        "http://localhost:3002/productslist"
      );
      let responseproductscate = await axios.get(
        "http://localhost:3002/productscate"
      );
      let responseproductscate2 = await axios.get(
        "http://localhost:3002/productscate2"
      );
      let responseproductscate3 = await axios.get(
        "http://localhost:3002/productscate3"
      );
      setProductCate(responseproductscate.data);
      setProductdata(responseproductslist.data);
      setShowdata(responseproductslist.data);
      setProductCate2(responseproductscate2.data)
      setProductCate3(responseproductscate3.data)
      
      
      
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

  const handleSearch = (productdata, searchWord) => {
    let newCampdata = [...productdata];

    if (searchWord.length) {
      newCampdata = productdata.filter((v, i) => {
        
        return v.product_name.indexOf(searchWord) >= 0;
      });
    }

    return newCampdata;
  };

  //價錢排序
  const handleSort = (productdata, sortBy) => {
    let newCampdata = [...productdata];

    if (sortBy === "1") {
      newCampdata = [...newCampdata].sort((a, b) => a.product_price - b.product_price);
    }

    if (sortBy === "2") {
      newCampdata = [...newCampdata].sort((a, b) => b.product_price - a.product_price);
    }

    // 預設用id 小至大
    if (sortBy === "" && newCampdata.length > 0) {
      newCampdata = [...newCampdata].sort((a, b) => a.Pid - b.Pid);
    }

    return newCampdata;
  };

  //商品分類
  const handleCate = (productdata, cate) => {
    let newCampdata = [...productdata];
   
    if (cate.length > 0) {
      newCampdata = [...newCampdata].filter((v, i) => {
        let isFound = false;

        //字串轉陣列
        const campcate = v.item.split(",");

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

  
 

  //呈現篩選後資料
  useEffect(() => {
    let newCampdata = [...productdata];

    // 處理搜尋

    newCampdata = handleSearch(newCampdata, searchWord);

    // 處理排序
    newCampdata = handleSort(newCampdata, sortBy);

    // 處理勾選標記
    newCampdata = handleCate(newCampdata, cate);

   

    setShowdata(newCampdata);
  }, [searchWord,sortBy,cate]);

  return (
    <>
      <div className="bodybg">
        {/* 橫幅圖片 */}
        <div>
          <img src={productslist} className="img1" />
        </div>

        <div className="backgroundPic">
          <h1 className="camplisth1 text-center">優質環保餐具</h1>

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
          </div>

          <div className="row">
            <div className="col-3 asideheight">
              {/* 營地分類 */}
              <PFilterbar cate={cate} setCate={setCate} productcate={productcate}  productcate2={productcate2}   productcate3={productcate3}/>
            </div>
          </div>

          <div className="container movecontent">
            <div className="row">
              <Hotcamp />
              {/* 側邊空位 */}
              <div className="col-3 "></div>

              {/* 營地列表Card */}
              <div className="col-9 movelist">
                <div className="row">
                  {showdata.map((v) => {
                    return (
                      <div className="col-4">
                        <div key={v.id} class="card content">
                          <div className="movebadge d-flex justify-content-end">
                            <span class="badge badge1size">
                              {v.camp_county}
                            </span>
                            <span class="badge badge2size">{v.item}</span>
                            <span class="badge badge3size">{v.name}</span>
                          </div>
                          <div className="camplistPicBox">
                            <div className="camptagWord">
                              {camptagWords[v.product_tag]}
                            </div>
                            <div className={camptagcolor[v.product_tag]}></div>
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
                              {v.product_name}
                            </p>
                            <p class="card-text text-center campPrice">
                              ${v.product_price}元起
                            </p>

                            <div className="d-flex star">
                              <div className="avgnumber">{v.stars}</div>
                              {getStar(v.stars)}
                            </div>

                            <Link to={`/products/${v.Pid}`} class="btn bookingBtn">
                              加入購物車
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
