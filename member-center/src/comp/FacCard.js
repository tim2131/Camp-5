import { Card, Col, Row, Avatar } from "antd";
import Ellipsis from "ant-design-pro/lib/Ellipsis";
import React from "react";
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



const FavCard = ({ favData }) => {
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
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Row gutter={[{ xs: 2, sm: 2, md: 4, lg: 4 }, 40]} justify="center">
          <Col xs={20} sm={12} md={12} lg={12} xl={10} xxl={7}>
            {favData.map((fav) => {
              return (
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
                            src="http://localhost:3005/images/camp1.jpg"
                            // src={`${IMAGE_URL}${item.img1}`}
                            // http://localhost:3005/images/camp1.jpg
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
                        className="favBtn"
                        onClick={(e) => console.log(favData)}
                      >
                        <HeartOutlined key="heart" />{" "}
                        <div className="favBtnWords">Like</div>
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
                  <Meta
                    title={fav.camp_name}
                    description={
                      <>
                        <Ellipsis tooltip lines={3}>
                          {fav.camp_intro}
                        </Ellipsis>
                      </>
                    }
                  />
                </Card>
              );
            })}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FavCard;
