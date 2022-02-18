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

const OrderDetails12 = ({ ppl, tent, act }) => {
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
        <Divider orientation="left">
          <div className="subtitle2">訂單詳細資訊</div>
        </Divider>
        <br />
        {tent.map((item) => (
          <>
            <List itemLayout="vertical" size="small">
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.item}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">帳篷類型</span> <br />
                      <span className="subname2">{item.item}</span>
                      <br />
                      <span className="subnote2">帳篷數</span> <br />
                      <span className="subname2">{item.item}</span>
                    </>
                  }
                />
              </List.Item>
            </List>
          </>
        ))}
        {/* //----tent資訊--end--------------- */}
        <br />
        <Divider orientation="left">
          <div className="subtitle2">加購活動</div>
        </Divider>
        <br />
        {/* //----加購資訊----------------- */}
        {act.map((item) => (
          <>
            <List className="" itemLayout="vertical" size="small">
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">活動描述</span> <br />
                      <span className="subname2">{item.intro}</span>
                      <br />
                      <span className="subnote2">加購人數</span> <br />
                      <span className="subname2">{item.number_people}</span>
                      <br />
                    </>
                  }
                />
              </List.Item>
            </List>
            {/* //----加購資訊--end--------------- */}
          </>
        ))}

        <Divider orientation="left">
          <div className="subtitle2">訂單金額</div>
        </Divider>
        <br />
        {/* //----總金額資訊----------------- */}
        <div className="totalBlockEnd">
          <div className="totalItemBlock">
            <div className="totalItem">營地每晚單價(共4晚)</div>
            <div className="totalItem">營地折扣完單價(共1晚)</div>
            {act.map((item) => (
              <>
                <div className="totalItem">
                  {item.name}(共{item.number_people}人)
                </div>
              </>
            ))}

            <div className="totalItem">折扣碼</div>
            <div className="totalItem">折扣總額</div>
            <Divider />
            <div className="totalItemE">訂單總額</div>
          </div>

          <div className="totalmoney">
            {/* TODO: 帳篷沒有單價 */}
            {ppl.map((item) => (
              <>
                <div className="total">{item.item}1</div>
                <div className="total">{item.item}2</div>
              </>
            ))}
            {act.map((item) => (
              <>
                <div className="total">{item.price}3</div>
              </>
            ))}

            {ppl.map((item) => (
              <>
                <div className="total">-{item.discount}</div>
              </>
            ))}

            <div className="total">-100(用算的)</div>
            <Divider />
            {ppl.map((item) => (
              <>
                <div className="totalE">{item.total}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails12;
