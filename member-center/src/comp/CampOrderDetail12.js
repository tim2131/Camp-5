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
const { Meta } = Card;

const OrderDetails12 = ({ ppl }) => {
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
      <div style={style}>
        <Divider orientation="left">
          <div className="subtitle2">訂購人資訊</div>
        </Divider>
        <div className="btnclaster">
          <button className="orderlinks">取消訂單</button>
          <button className="orderlinks">填寫評價</button>
          <button className="orderlinks">聯繫客服</button>
        </div>
        <div className="">
          <br />
          {ppl.map((item) => (
            <>
              <span className="subnote2">訂購人姓名:</span>
              <span className="subname2">{item.name}</span>
              <br />
              <span className="subnote2">訂購人電話:</span>

              <span className="subname2">{item.phone}</span>
              <br />
              <span className="subnote2">訂購人信箱:</span>
              <span className="subname2">{item.user_name}</span>
            </>
          ))}
          <br />
        </div>
      </div>
    </>
  );
};

export default OrderDetails12;
