import {
  Layout,
  Select,
  Typography,
} from "antd";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,
  HeartOutlined,
  CompassOutlined,

} from "@ant-design/icons";
import React, {useState } from "react";
import { Routes, Route } from "react-router-dom";

// --------less or css-------------------------
import "antd/dist/antd.less";
import "./App.less";

// -------router comp--------------------------
import MemberProfile from "./pages/Member-profile";
import MemberOrder from './pages/Member-order';

// -------page comp----------------------------
import LeftSideBar from "./comp/leftSideBar";
import TopicMenu from './comp/TopicMenu';
import Header1 from "./comp/header";
import OrderDetails from "./pages/OrderDetails";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;


function App() {
  // ----導入menu context---------------------
  const topics = ["首頁", "個人資料", "訂單", "我的最愛", "露營地圖"];
  const menuIcons = [
    <BorderlessTableOutlined />,
    <UserOutlined />,
    <FileSearchOutlined />,
    <HeartOutlined />,
    <CompassOutlined />,
  ];
  const linkTo = ["/dashboard", "/profile", "/orders", "/favorites", "/map"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (
    <TopicMenu
      linkTo={linkTo}
      topics={topics}
      menuIcons={menuIcons}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  // -------------------------

  return (
    <Layout style={{ height: "100vh" }}>
      <LeftSideBar menu={Menu} />
      <Layout>
        <Header1 menu={Menu} />
        <Content
          style={{
            margin: "0 16px",
            overflow: "scroll",
          }}
        >
          <Routes>
            <Route path="/profile" element={<MemberProfile />} />
            <Route path="/orders" element={<MemberOrder />} />
            <Route path="/orderDetails" element={<OrderDetails/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}


export default App;
