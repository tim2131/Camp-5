import { Card, Col, Row, Tag } from "antd";
import React from "react";
import { IMAGE_URL } from "../utils/config";
import { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  HeartOutlined,
  ShareAltOutlined,
  ZoomInOutlined,
  HeartFilled,
} from "@ant-design/icons";
// --------less or css-------------------------
import "../style/FavCard.less";

const { Meta } = Card;

const FavCard = ({ favData, setFavData, setLikeData, likeData }) => {
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "card_tagStar",
    2: "card_tag",
    3: "card_tagNoStock",
  };
  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
    4: "statusTagPODone",
  };
  const orderStatus = {
    1: "未付款",
    2: "已付款",
    3: "已取消",
    4: "已完成",
  };

  function goCampPage(idx) {
    console.log(`idx: ${idx}`);
    let clickedFav = favData[idx];
    let campID=clickedFav.FAV_CAMPID
    console.log(campID);
    window.location.href = `http://localhost:3000/camp/${campID}`;
  }
  const handleToggle = (idx) => {
    console.log(`idx: ${idx}`);

    let clickedFav = favData[idx];
    console.log(clickedFav.FAV_CAMPID);

    let newData = [...favData];
    if (newData[idx].like === undefined) {
      newData[idx].like = false;
    } else {
      newData[idx].like = !newData[idx].like;
    }
    setFavData(newData);
    
    


  };
  return (
    <React.Fragment>
      <div className="site-card-border-less-wrapper">
        <Row gutter={[{ xs: 2, sm: 2, md: 4, lg: 4 }, 40]} justify="center">
          {favData.map((fav, index) => {
            return (
              <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
                <Card
                  key={fav.camp_id}
                  className="Scard"
                  bordered={false}
                  // style={{ width: 400 }}
                  cover={
                    <>
                      <div className="cardOrderPicBox">
                        <div className="card_tagWord">
                          {tagWords[fav.camp_tag]}
                        </div>
                        <div className={tagcolor[fav.camp_tag]}></div>
                        <div className="card_list_item">
                          <img
                            className="card_pic"
                            // src="http://localhost:3005/images/camp1.jpg"
                            src={`${IMAGE_URL}/images/${fav.img1}`}
                            alt="camp-pic"
                          />
                          <img />
                        </div>
                      </div>
                    </>
                  }
                  actions={[
                    <>
                      <div
                        key={fav.camp_id}
                        className="favBtn"
                        onClick={(e) => handleToggle(index)}
                      >
                        <HeartFilled
                          className={
                            fav.like === undefined || fav.like === true
                              ? " filledheart"
                              : "filledheart heartdisplaynone"
                          }
                          key="filledHeart"
                        />
                        <HeartOutlined
                          className={
                            fav.like === false
                              ? "filledheart "
                              : "filledheart heartdisplaynone"
                          }
                          key="heart"
                        />
                        <div className="favBtnWords">
                          {likeData ? " Like" : "Unlike"}
                        </div>
                      </div>
                    </>,

                    <>
                      <div
                        className="favBtn"
                        onClick={() => goCampPage(index)}
                      >
                        <ZoomInOutlined key="zoom" />
                        <div className="favBtnWords"> 
                        {/* <a href={`http://localhost:3000/camp/${fav.camp_id}`}>*/}
                        看詳細
                        {/* </a> */}
                        </div>
                      </div>
                    </>,
                    <>
                      <div className="favBtn">
                        <ShareAltOutlined key="share" />{" "}
                        <div className="favBtnWords">分享</div>
                      </div>
                    </>,
                  ]}
                >
                  <Meta
                    title={<span className="campName">{fav.camp_name}</span>}
                    description={
                      <>
                        <Tag color="#C15F2E">{fav.camp_county}</Tag>
                        <Tag color="#FCF9F5" className="tagFCF9F5">
                          {fav.camp_item}
                        </Tag>
                        <Tag color="#6A6842">{fav.tent_item}</Tag>
                        <div className="trancate"> {fav.camp_intro}</div>
                      </>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FavCard;
