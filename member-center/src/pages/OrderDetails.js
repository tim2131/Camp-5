import React from "react";
import { Col, Row, Divider, Typography, Card, List } from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import { ERR_MSG } from "../utils/error";
import OrderDetails6 from "../comp/CampOrderDetail6";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };
const { Meta } = Card;

const data = [
  {
    id: "1",
    camp: "綠色dddd生活露營",
    county: "桃園縣",
    add: "桃園縣",
    phone: "0355555555",
    href: "/orderDetails",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
    tag_status: "1",
    tent_type: "",
    name: "Tammy Chen",
    orderdate: "2022/1/30",
    tent_name: "環保A障",
    tent_type: "TEE PEE",
    tent_num: "4",
    add_act: "加購活動一",
    add_act_ppl: "4",
    order_total: "8000",
    act_total: "600",
    tent_unitPrice: "600",
    tent_salePrice: "600",
    order_coupon: "200",
    order_discount: "800",
  },
  {
    id: "2",
    camp: "綠色dddd生活露營",
    county: "桃園縣",
    add: "桃園縣",
    phone: "0355555555",
    href: "/orderDetails",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
    tag_status: "1",
    tent_type: "",
    name: "Tammy Chen",
    orderdate: "2022/1/30",
    tent_type: "TEE PEE",
    tent_num: "4",
    add_act: "加購活動一",
    add_act_ppl: "4",
  },
];
//console.log(data[0].id)
const tentData = [
  { tent_name: "環保A障", tent_type: "TEE PEE", tent_num: "4" },
  {
    tent_name: "環保B障",
    tent_type: "TEE PEE",
    tent_num: "3",
    tent_des:
      "是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動",
  },
];

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
  //----------後端----------------------------------------------
  const [data, setData] = useState([]);
  async function getCampPOCamp(e) {
    try {
      let result = await axios.post(`${API_URL}/campPOCamp`, [1, 1], {
        withCredentials: true,
      });
      console.log(result.data);
      setData(result.data);

      
    } catch (e) {
      console.error("錯誤");
    }
  }
  useEffect(() => {
    getCampPOCamp();
  }, []);
  console.log(data);

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
          
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
