import { Select, Typography, Divider, Tabs } from "antd";

import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import "antd/dist/antd.less";
// import CampOrder from "../comp/CampOrder";
import ProductOrder from "../comp/ProductOrder";
const { Option } = Select;
const { Title } = Typography;

// ---------------for Tabs---------------
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
// ---------------for Tabs end---------------

const MemberOrder = () => {
  // const [data, setData] = useState([]);
  // let getAllPO = async () => {
  //   try {
  //     let response = await axios.post(`${API_URL}/campAllPO`, data);
  //     console.log(response.data);
  //     console.log(response.data[0].id);
  //     // setData(response.data);
  //   } catch (e) {
  //     console.error("error", e.response.data);
  //   }
  // };

  // useEffect(() => {
  //   getAllPO();
  // }, []);
  const data = [
    {
      id: "1",
      camp: "綠色生活露營",
      county: "桃園縣",
      href: "/orderDetails",
      pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      orderdate_start: "2022/5/1",
      orderdate_end: "2022/5/3",
      order_status: "1",
      tag_status: "1",
      tent_type: "",
    }
  ];
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
          訂單資料
        </Title>
      </Divider>
      {/*---------------for Tabs--------------- */}
      <Tabs onChange={callback} type="card">
        <TabPane tab="營地訂單" key="1">
          {/* <CampOrder
            data={data}
          /> */}
        </TabPane>
        <TabPane tab="商品訂單" key="2">
          <ProductOrder />
        </TabPane>
      </Tabs>
      {/*---------------Tabs end--------------- */}
    </>
  );
};

export default MemberOrder;
