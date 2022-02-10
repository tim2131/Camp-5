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
} from "antd";
import {
    UserOutlined,
    BorderlessTableOutlined,
    FileSearchOutlined,
    HeartOutlined,
    CompassOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import "antd/dist/antd.less";

import "../navi/navi.css";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;


class leftSideBar extends Component {

    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="sidebar">
            <img className="text" src={Text} alt=""/>
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
        )
    }
}

export default leftSideBar;
