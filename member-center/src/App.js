import {
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
  Drawer,
} from "antd";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,
  ArrowUpOutlined,
  AimOutlined,
  HeartOutlined,
  CompassOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import React, { Component,useState } from "react";

import { Routes, Route, Link } from "react-router-dom";

import "antd/dist/antd.less";
import "./App.less";
import Logo from "./img/logo.svg";
import Text from "./img/Text.svg";

import Test from "./comp/test";
import MemberProfile from "./pages/member-profile";
import LeftSideBar from "./comp/leftSideBar";


import TopicMenu from './comp/TopicMenu';
import Header1 from "./comp/header";

const { Header, Content, Footer, Sider } = Layout;
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
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}


export default App;
