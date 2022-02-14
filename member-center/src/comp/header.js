import { Layout,  Button, Drawer,Space } from "antd";

import { MenuOutlined } from "@ant-design/icons";
import React, {  useState } from "react";
import "antd/dist/antd.less";
import Logo from "../img/logo.svg";
import "../App.less";
const { Header } = Layout;


function Header1({menu}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Header>
          <Button
            className="barsMenu"
            type="primary"
            onClick={() => setVisible(true)}
            style={{ marginBottom: "50%" }}
          >
            <span className="barsBtn">
              <MenuOutlined />
            </span>
          </Button>
          <span
            style={{
              color: "#fff",
              paddingLeft: "10%",
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
        width="200"
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
