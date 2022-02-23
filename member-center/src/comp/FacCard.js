import { Card, Col, Row, Avatar } from "antd";
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



const FavCard = ({ }) => {
 const tagWords = {
   1: "主打",
   2: "促銷",
 };
 const tagcolor = {
   1: "tagStar",
   2: "tag",
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
              <Card
                className="Scard"
                bordered={false}
                // style={{ width: 400 }}
                cover={
                  <>
                    <div className="orderPicBox">
                      <div className="tagWord">{tagWords[1]}</div>
                      <div className={tagcolor[1]}></div>
                      <div className="list_item">
                        <img
                          className="pic"
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
                    <HeartOutlined key="heart" />
                    Like
                  </>,
                // TODO: 實心狀態
                //   <>
                //     <HeartFilled key="filledHeart" />
                //   </>,
                  <>
                    {" "}
                    <ZoomInOutlined key="zoom" /> 看詳細
                  </>,
                  <>
                    <ShareAltOutlined key="share" />分享
                  </>,
                ]}
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
};

export default FavCard;
