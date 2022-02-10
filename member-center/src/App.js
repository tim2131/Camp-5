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
import React, { Component } from "react";
import "antd/dist/antd.less";
import Logo from "./img/logo.svg";
import Text from "./img/Text.svg";

import Test from "./comp/test";
import LeftSideBar from "./comp/leftSideBar";
import LeftDrawer from "./comp/leftDrawer";
import "./App.less";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

class App extends Component {
  state = {
    collapsed: false,
    mode: "inline",
  };

  render() {
    return (
      <Layout>
        <LeftDrawer></LeftDrawer>
        <LeftSideBar></LeftSideBar>
        <Layout>
          <Header >
            <Button
              className="barsMenu"
              type="primary"
              onClick={this.showDrawer}
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
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "12px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Test></Test>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            森活營家．live green to save green
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
