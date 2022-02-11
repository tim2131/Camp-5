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
  import Logo from "../img/logo.svg";
  import Text from "../img/Text.svg";
  
  import Test from "./test";
  import LeftSideBar from "./leftSideBar";
  import LeftDrawer from "./leftDrawer";

  import "../App.less";
  
  const { Header, Content, Footer, Sider } = Layout;
  const { Option } = Select;
  const { Title } = Typography;
  
  class Header1 extends Component {
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
    render() {
  
      return (
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
           
      );
    }
  }
  
  export default Header1;
  