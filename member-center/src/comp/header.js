import {
    Layout,
    Select,
    Button,
    Typography,

  } from "antd";
  
  import {
    MenuOutlined,
  } from "@ant-design/icons";
  import React, { Component, useState } from "react";
  import "antd/dist/antd.less";
  import Logo from "../img/logo.svg";
import "../App.less";
import LeftDrawer from "./LeftDrawer";
  const { Header, Content, Footer, Sider } = Layout;
  const { Option } = Select;
const { Title } = Typography;
  
  
function Header1 () {
  const[collapsed, setCollapse]=useState(false)
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Header>
        <Button
          className="barsMenu"
          type="primary"
          onClick={() => setVisible(true)}
        >
          <span className="barsBtn">
            <MenuOutlined />
          </span>
        </Button>

        <span
          style={{
            // color: '#fff',
            paddingLeft: "2%",
            fontSize: "1.4em",
          }}
        ></span>
        <span
          style={{
            color: "#fff",
            // paddingLeft: "2%",
            fontSize: "1.8em",
          }}
        >
          會員中心
        </span>
        <span
          style={{
            // color: '#fff',
            float: "right",
            paddingRight: "1%",
          }}
        >
          <img className="logo-left" src={Logo} alt="logo" />
        </span>
      </Header>
      <LeftDrawer
        onClick={() => setVisible(true)}
      />
    </>
  );
    }
  
  export default Header1;
  