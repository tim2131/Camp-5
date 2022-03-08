import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CampListData = (props) => {
  const { currentPost, camptagWords, camptagcolor, getStar } = props;

  return (
    <>
      {currentPost.map((v) => {
        return (
          <div className="col-4">
            <div key={v.id} class="card content">
              <div className="movebadge d-flex justify-content-end">
                <span class="badge badge1size">{v.camp_county}</span>
                <span class="badge badge2size">{v.camp_item}</span>
                <span class="badge badge3size">{v.tent_item}</span>
              </div>
              <div className="camplistPicBox">
                <div className="camptagWord">{camptagWords[v.camp_tag]}</div>
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
                <p class="card-text text-center campName">{v.camp_name}</p>
                <p class="card-text text-center campPrice">${v.price}元起</p>

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
    </>
  );
};

export default CampListData;
