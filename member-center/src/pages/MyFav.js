import { Select, Typography, Divider, Tabs } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import "antd/dist/antd.less";
import FavCard from "../comp/FacCard";
const { Option } = Select;
const { Title } = Typography;

// ---------------for Tabs---------------
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
// -------------for Tabs end---------------

//---------------從後端拿資料----------------------------
const MyFav = () => {
  const [favData, setFavData] = useState([]);
  async function MyFav() {
    try {
      //TODO: memberid
      let result = await axios.post(`${API_URL}/favAll`, {});
      console.log(result.data);
      // console.log(response.data[0].id);
      setFavData(result.data);
      return test;
    } catch (e) {
      console.error("error");
    }
  }

  useEffect(() => {
    MyFav();
  }, []);

  //----------BTN------------------------------
  const [likeData, setLikeData] = useState(true);

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
          <FavCard
            favData={favData}
            likeData={likeData}
            setLikeData={setLikeData}
          />
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
