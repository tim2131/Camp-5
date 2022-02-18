import {
  Layout,
  Select,
  Typography,
} from "antd";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,
  ProfileOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import React, {useState } from "react";
import { Routes, Route } from "react-router-dom";

// --------less or css-------------------------
import "antd/dist/antd.less";
import "./App.less";

// -------router comp--------------------------
import MemberProfile from "./pages/Member-profile";
import MemberOrder from './pages/Member-order';
import Tent from './pages/TentCRUD'

// -------page comp----------------------------
import LeftSideBar from "./comp/leftSideBar";
import TopicMenu from './comp/TopicMenu';
import Header1 from "./comp/header";


const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;


function App() {
  // ----導入menu context---------------------
  const topics = ["首頁", "營地資料", "管理訂單", "帳篷管理", "會員評價"];
  const menuIcons = [
    <BorderlessTableOutlined />,
    <ProfileOutlined />,
    <FileSearchOutlined />,
    <AppstoreOutlined />,
    <UserOutlined />,
  ];
  const linkTo = ["/dashboard", "/campfile", "/camporders", "/tentCRUD", "/member"];
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
            <Route path="/campfile" element={<MemberProfile />} />
            <Route path="/camporders" element={<MemberOrder />} />
            <Route path="/tentCRUD" element={<Tent />}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}


export default App;
