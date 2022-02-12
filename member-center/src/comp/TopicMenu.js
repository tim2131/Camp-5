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
import { Link, NavLink } from "react-router-dom";

import "antd/dist/antd.less";
import Text from "../img/Text.svg";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;

function TopicMenu({
  linkTo,
  index,
  topics,
  menuIcons,
  selectedKey,
  changeSelectedKey,
}) {
  const styledTopics = [];

  topics.forEach(
    ( topic, index) =>
      styledTopics.push(
        <Menu.Item key={index} onClick={changeSelectedKey}>
          <Link to={linkTo[index]}>
            <span>{menuIcons[index]}</span>
            <span className="nav-text">{topic}</span>
          </Link>
        </Menu.Item>
      )
  );

  return (
    <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
}

export default TopicMenu;
