
import camp from "../img/hotcamp.jpg";
import "../style/hotcamp.scss";
import "../style/camplist.css";
import { Link } from "react-router-dom";

const Hotcamp = (props) => {
  
  const {getStar} = props
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
            <span class="badge badge1size">桃園市</span>
            <span class="badge badge2size">浪漫夜景</span>
            <span class="badge badge3size">狩獵帳</span>
          </div>
          <div className="hotcampPicBox">
            <div className="hotcamptagWord">{hotcamptagWords[1]}</div>
            <div className={hotcamptagcolor[1]}></div>
            <div className="hotcamplist_item">
              <img className="hotcamppic " src={camp} alt="camp-pic" />
              <div class="card-body">
                <p class="card-text text-center hotcampName">芘雅尚露營區</p>

                <p class="card-text text-center hotcampPrice">$3500元起</p>
               
                <Link to="" class="btn hotbookingBtn">
                  立即預約
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotcamp;
