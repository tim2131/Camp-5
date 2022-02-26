import { Card, Col, Row,  Tag } from "antd"; 
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

  function deleteTask(id) {
    console.log(id);
  }
  const handleToggle = () => {
    //ASK how to change state for only one item?
    // console.log(index)
    // setLikeData({...likeData,[index]:!likeData})
    //  console.log(e.currentTarget.getAttribute.key);
    // if (e.currentTarget.dataset.index=1){setLikeData(!likeData)}
    // console.log(e);
    //   setLikeData(e.target.className.likeData);
    // console.log(e.target.className)
    setLikeData(!likeData);
  };
  return (
    <React.Fragment>
      <div className="site-card-border-less-wrapper">
        <Row gutter={[{ xs: 2, sm: 2, md: 4, lg: 4 }, 40]} justify="center">
          {favData.map((fav, index) => {
            return (
              <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
                <Card
                  deleteTask={deleteTask}
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
                        onClick={(e) => handleToggle(e)}
                      >
                        <HeartFilled
                          className={
                            likeData
                              ? " filledheart"
                              : "filledheart heartdisplaynone"
                          }
                          key="filledHeart"
                        />
                        <HeartOutlined
                          className={
                            likeData
                              ? "filledheart heartdisplaynone"
                              : "filledheart "
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
                        onClick={() => deleteTask(fav.camp_id)}
                      >
                        <ZoomInOutlined key="zoom" />
                        <div className="favBtnWords">看詳細</div>
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
          {/* -------------------------------------------- */}
          <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
            <Card
              key="55"
              className="Scard"
              bordered={false}
              // style={{ width: 400 }}
              cover={
                <>
                  <div className="cardOrderPicBox">
                    <div className="card_tagWord">{tagWords[1]}</div>
                    <div className={tagcolor[1]}></div>
                    <div className="card_list_item">
                      <img
                        className="card_pic"
                        src="http://localhost:3005/images/camp1.jpg"
                        // src={`${IMAGE_URL}${item.img1}`}
                        // http://localhost:3005/images/camp1.jpg
                        alt="camp-pic"
                      />
                      <img />{" "}
                    </div>
                  </div>{" "}
                </>
              }
              actions={[
                <>
                  <div className="favBtn" onClick={() => handleToggle()}>
                    test
                    <HeartFilled
                      className={
                        likeData
                          ? " filledheart"
                          : "filledheart heartdisplaynone"
                      }
                      key="filledHeart"
                    />
                    <HeartOutlined
                      className={
                        likeData
                          ? "filledheart heartdisplaynone"
                          : "filledheart "
                      }
                      key="heart"
                    />
                  </div>
                </>,
                // TODO: 實心狀態
                //   <>
                //     <HeartFilled key="filledHeart" />
                //   </>,
                <>
                  <div className="favBtn">
                    <ZoomInOutlined key="zoom" />{" "}
                    <div className="favBtnWords">看詳細</div>
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
              <Meta title="Card title" description="This is the description" />
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default FavCard;
