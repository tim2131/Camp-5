import productBig from "../img/product-big.jpg";
import "../style/hotcamp.scss";
import "../style/camplist.css";
import { Link } from "react-router-dom";

const Hotproduct = (props) => {
  const hotcamptagWords = {
    1: "主打",
    2: "促銷",
  };

  const hotcamptagcolor = {
    1: "hotcamptagStar",
    2: "hotcamptag",
  };
  return (
    <>
      {/* 側邊空位 */}
      <div className="col-3"></div>
      {/* 主打營地 */}
      <div className="col-9">
        <div class="card hotcamp">
          <div className="movebadge d-flex justify-content-end">
            {/* <span class="badge badge1size">新竹縣</span> */}
            <span class="badge badge2size">水壺</span>
            <span class="badge badge3size">環保餐具</span>
          </div>
          <div className="hotcampPicBox">
            <div className="hotcamptagWord">{hotcamptagWords[1]}</div>
            <div className={hotcamptagcolor[1]}></div>
            <div className="hotcamplist_item">
              <img className="hotcamppic " src={productBig} alt="camp-pic" />
              <div class="card-body">
                <p class="card-text text-center hotcampName">隨身咖啡套組</p>

                <p class="card-text text-center hotcampPrice">$1600元</p>

                <Link to="" class="btn hotbookingBtn">
                  立即購買
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotproduct;
