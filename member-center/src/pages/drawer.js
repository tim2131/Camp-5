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
  import Logo from '../img/logo.svg'
  import Text from '../img/Text.svg'
  import "../navi/navi";
  import Test from "../pages/test";
  
  const { Header, Content, Footer, Sider } = Layout;
  const { Option } = Select;
  const { Title } = Typography;
  
  
  class leftDrawer extends Component {
    state = {
      collapsed: false,
      mode: "inline",
    };
  
    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
  
    render() {
      return (
          <Drawer
            // title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{
              backgroundColor: "#6A6842",
              color: "#fff",
              height: "calc(100vh - 55px)",
              overflow: "auto",
              width: 200,
              
  
            }}
          >
            {/* -------------------left side bar-in drawer----------------------------------------------------- */}
            <Sider trigger={null}
              collapsible collapsed={this.state.collapsed}
              className="drawer"
              bodyStyle={{
                backgroundColor: "#6A6842",
                color: "#fff",
                height: "calc(100vh - 55px)",
                width: 200,
  
              }}
  
            >
              <img className="text" src={Text} alt="" />
  
              <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                  <BorderlessTableOutlined />
  
                  <span className="nav-text">首頁</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <UserOutlined />
                  <span className="nav-text">個人資料</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <FileSearchOutlined />
                  <span className="nav-text">訂單</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <HeartOutlined />
                  <span className="nav-text">我的最愛</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <CompassOutlined />
                  <span className="nav-text">露營地圖</span>
                </Menu.Item>
              </Menu>
            </Sider>
            {/* ------------------------------------------------------------------------- */}
          </Drawer>
      );
    }
  }
  
  export default leftDrawer;
  