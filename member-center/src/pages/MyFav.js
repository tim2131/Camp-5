import { Select, Typography, Divider, Tabs } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import "antd/dist/antd.less";
const { Option } = Select;
const { Title } = Typography;

// ---------------for Tabs---------------
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
// ---------------for Tabs end---------------

const MyFav = ({ setSelectedKey }) => {
  // const [data, setData] = useState([]);
  // async function getAllPO() {
  //   try {
  //     let response = await axios.post(`${API_URL}/campAllPO`, data);
  //     console.log(response.data);
  //     // console.log(response.data[0].id);
  //     setData(response.data);
  //   } catch (e) {
  //     console.error("error");
  //   }
  // }

  useEffect(() => {
    // getAllPO();
  }, []);

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
          我的收藏
        </Title>
      </Divider>
      {/*---------------for Tabs--------------- */}
      <Tabs onChange={callback} type="card">
        <TabPane tab="營地最愛" key="1">
          {/* //插入組件 */}
        </TabPane>
        <TabPane tab="商品最愛" key="2">
         {/* //插入組件 */}
        </TabPane>
      </Tabs>
      {/*---------------Tabs end--------------- */}
    </>
  );
};

export default MyFav;
