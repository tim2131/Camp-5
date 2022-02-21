import React from "react";
import {

  Divider,
  Typography,
  Card,
  List,
  Modal,
  Button,
  Result,
  Comment,
  Avatar,
  Form,
  Input,
} from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import { ERR_MSG } from "../utils/error";
// import {commentOnPop} from "./CommentOnCampop"
import moment from "moment";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };
const { Meta } = Card;
const { TextArea } = Input;

const OrderDetails12 = ({ ppl, tent, act, data }) => {
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visible1, setvisible1] = useState(false);
  const [POStatus, setPOStatus] = useState([]);
  const [Cbtn, setCbtn] = useState(false);

//TODO 利用訂單狀態去更改按鈕的disable/ useEffect第一渲染沒辦法拿到prop
  // useEffect(() => {
  //   // after every render,
  //   return () => {
  //     // exec before running the effects next time
  //   };
  // }, []);
  

  const handleOk = (e) => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      setvisible(false);
      //TODO: 送出更改SQL的句法，寫進評論
    }, 1500);
  };
  const handleOkCANCEL = (e) => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      setvisible1(false);
      setCbtn(true);
      //TODO: 送出更改SQL的句法，改camp order狀態
    }, 1500);
  };

  // -----for thumbnail---------------------------------
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
          <button
            disabled={Cbtn}
            className="orderlinks"
            onClick={() => setvisible1(true)}
          >
            取消訂單
          </button>

          <button
            disabled={Cbtn}
            className="orderlinks"
            onClick={() => setvisible(true)}
          >
            填寫評價
          </button>
          <button
            className="orderlinks"
            // onClick={statusPOFinish}
          >
            聯繫客服
          </button>
        </div>
        <div className="orderppl">
          <br />
          {ppl.map((item) => (
            <React.Fragment key={item.id}>
              <span className="subnote2">訂購人姓名:</span>
              <span className="subname2">{item.name}</span>
              <br />
              <span className="subnote2">訂購人電話:</span>

              <span className="subname2">{item.phone}</span>
              <br />
              <span className="subnote2">訂購人信箱:</span>
              <span className="subname2">{item.user_name}</span>
            </React.Fragment>
          ))}
          <br />
        </div>
        <Divider orientation="left">
          <div className="subtitle2">訂單詳細資訊</div>
        </Divider>
        <br />
        {tent.map((item) => (
          <React.Fragment key={item.id}>
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
          </React.Fragment>
        ))}
        {/* //----tent資訊--end--------------- */}
        <br />
        <Divider orientation="left">
          <div className="subtitle2">加購活動</div>
        </Divider>
        <br />
        {/* //----加購資訊----------------- */}
        {act.map((item) => (
          <React.Fragment key={item.id}>
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
          </React.Fragment>
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
              <React.Fragment key={item.id}>
                <div className="totalItem">
                  {item.name}(共{item.number_people}人)
                </div>
              </React.Fragment>
            ))}

            <div className="totalItem">折扣碼</div>
            <div className="totalItem">折扣總額</div>
            <Divider />
            <div className="totalItemE">訂單總額</div>
          </div>

          <div className="totalmoney">
            {/* TODO: 帳篷沒有單價 */}
            {ppl.map((item) => (
              <React.Fragment key={item.id}>
                <div className="total">{item.item}1</div>
                <div className="total">{item.item}2</div>
              </React.Fragment>
            ))}
            {act.map((item) => (
              <React.Fragment key={item.id}>
                <div className="total">{item.price}3</div>
              </React.Fragment>
            ))}

            {ppl.map((item) => (
              <React.Fragment key={item.id}>
                <div className="total">-{item.discount}</div>
              </React.Fragment>
            ))}

            <div className="total">-100(用算的)</div>
            <Divider />
            {ppl.map((item) => (
              <React.Fragment key={item.id}>
                <div className="totalE">{item.total}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* ------------MODAL FOR COMMENT----------------- */}
      <Modal
        visible={visible}
        title="填寫評論"
        // onOk={this.handleOk}
        //onCancel 這樣X跟點背景就會消失
        onCancel={() => setvisible(false)}
        footer={[
          <Button key="back" onClick={() => setvisible(false)}>
            返回
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOk()}
          >
            送出
          </Button>,
        ]}
      >
        <p>填寫評論填寫評論填寫評論填寫評論填寫評論填寫評論</p>
      </Modal>
      {/* --------------------------------- */}
      {/* ------------MODAL FOR CANCEL----------------- */}
      <Modal
        visible={visible1}
        title="取消訂單"
        // onOk={this.handleOk}
        onCancel={() => setvisible1(false)}
        footer={[
          <Button key="back" onClick={() => setvisible1(false)}>
            返回
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOkCANCEL()}
          >
            取消
          </Button>,
        ]}
      >
        <p>您確定要取消訂單嗎?</p>
      </Modal>
      {/* --------------------------------- */}
    </>
  );
};

export default OrderDetails12;
