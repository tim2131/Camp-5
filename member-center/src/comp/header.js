import { Layout, Select, Button, Typography, Drawer } from "antd";

import { MenuOutlined } from "@ant-design/icons";
import React, { Component, useState } from "react";
import "antd/dist/antd.less";
import Logo from "../img/logo.svg";
import "../App.less";
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

function Header1({menu}) {
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
      <Drawer
        // title="Basic Drawer"
        placement="left"
        closable={false}
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        bodyStyle={{
          backgroundColor: "#6A6842",
          color: "#fff",
          height: "calc(100vh - 55px)",
          overflow: "auto",
          width: 200,
        }}
      >
        {menu}
      </Drawer>
    </>
  );
}

export default Header1;
