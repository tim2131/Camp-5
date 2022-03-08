import React from "react";
import { Col, Row, Divider, Typography, Card, List } from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import { useState, useEffect } from "react";
import { API_URL,IMAGE_URL } from "../utils/config";
import axios from "axios";
import { ERR_MSG } from "../utils/error";
import OrderDetails6 from "../comp/CampOrderDetail6";
import OrderDetails12 from "../comp/CampOrderDetail12";
import { useParams } from "react-router-dom";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };


const OrderDetails = () => {
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
  const {orderId} = useParams();
  //----------後端-----getCampPOCamp--------------------------
  const [data, setData] = useState([]);
  async function getCampPOCamp(e) {
    try {
      let result = await axios.get(`${IMAGE_URL}/campData/${orderId}`);
      console.log('result.data',result.data);
      setData(result.data);
    } catch (e) {
      console.error("錯誤");
    }
  }
  useEffect(() => {
    getCampPOCamp();
  }, []);
  // console.log(data);
  //----------後端-----campPOpplRouter--------------------------
  const [ppl, setPpl] = useState([]);
  async function getCampPOPpl(e) {
    try {
      let result = await axios.get(`${IMAGE_URL}/Ppl/${orderId}`);
      console.log('ppl',result.data);
      setPpl(result.data);
    } catch (e) {
      console.error("錯誤");
    }
  }
  useEffect(() => {
    getCampPOPpl();
  }, []);
  // console.log(ppl);
  // //----------後端-----getCampPOTent--------------------------
  const [tent, setTent] = useState([]);
  async function getCampPOTent(e) {
    try {
      let result = await axios.get(`${IMAGE_URL}/Tent/${orderId}`);
      console.log(result.data);
      setTent(result.data);
    } catch (e) {
      console.error("錯誤");
    }
  }
  useEffect(() => {
    getCampPOTent();
  }, []);
  console.log(tent);
  //----------後端-----getCampPOAct--------------------------
  const [act, setAct] = useState([]);
  async function getCampPOAct(e) {
    try {
      let result = await axios.get(`${IMAGE_URL}/OrderDetailsAct/${orderId}`);
      console.log('Act',result.data);
      setAct(result.data);
    } catch (e) {
      console.error("錯誤");
    }
  }
  useEffect(() => {
    getCampPOAct();
  }, []);
  // console.log(act);

  return (
    <>
      <Divider style={{ marginBottom: 60 }}>
        <Title
          level={3}
          style={{
            marginBottom: 0,
            marginTop: 10,
          }}
        >
          訂單詳細
        </Title>
      </Divider>
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 20, lg: 24 }}>
        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
        >
          <OrderDetails6 data={data} />
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 12, offset: 0 }}
        >
          <OrderDetails12 data={data} ppl={ppl} tent={tent} act={act} />
        </Col>
      </Row>
     
    </>
  );
};

export default OrderDetails;
