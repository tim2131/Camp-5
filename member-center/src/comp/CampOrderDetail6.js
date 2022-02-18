import React from "react";
import { Col, Row, Divider, Typography, Card, List } from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import { ERR_MSG } from "../utils/error";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };

const OrderDetails6 = ({data}) => {
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
    4: "statusTagDone",
  };
  const orderStatus = {
    1: "未付款",
    2: "已付款",
    3: "已取消",
    4: "已完成",
    };
  
  return (
    <>
      {data.map((item) => (
        <>
          {/* <li key={item.camp_name}>
            <div>{item.camp_name}</div>
          </li> */}
          <div style={style}>
            <div className={orderStatuscolor[item.orderstatus_id]}>
              {orderStatus[item.status]}
            </div>
            <Divider />
            <div className="orderPicBox">
              <div className="tagWord">{tagWords[item.orderstatus_id]}</div>
              <div className={tagcolor[item.orderstatus_id]}></div>
              <div className="list_item">
                <img
                  className="pic"
                  src={require(`../images/${item.img1}`)}
                  alt="camp-pic"
                />
                <img />
              </div>
            </div>

            <div className="subtitle">{item.camp_name}</div>
            <div className="infobox">
              <span className="subnote">入住時間</span>
              <br />
              <span className="subname">{item.orderdate_start}</span>
              <br />
              <span className="subnote">退房時間</span>
              <br />
              <span className="subname">{item.orderdate_end}</span>
              <br />
              <span className="subnote">地址</span>
              <br />
              <span className="subname">{item.camp_add}</span>
              <br />
              <span className="subnote">電話</span>
              <br />
              <span className="subname">{item.phone}</span>
              <br />
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default OrderDetails6;
