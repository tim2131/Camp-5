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
  ArrowUpOutlined,
  AimOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import "antd/dist/antd.less";
import Logo from '../img/Logo.svg'
import Text from '../img/Text.svg'
import "./navi.css";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;


class SiderDemo extends Component {
  state = {
    collapsed: false,
    mode: "inline",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
      
      <Drawer
              title="Basic Drawer"
              placement="left"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >

            </Drawer>

        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <img className="text" src={Text} alt=""/>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <BorderlessTableOutlined />

              <span className="nav-text">首頁</span>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span className="nav-text">營地管理</span>
            </Menu.Item>
            <Menu.Item key="3">
            <ArrowUpOutlined/>
              <span className="nav-text">帳篷上架</span>
            </Menu.Item>
            <Menu.Item key="4">
            <FileSearchOutlined/>
              <span className="nav-text">訂單資訊</span>
            </Menu.Item>
            <Menu.Item key="5">
            <AimOutlined />
              <span className="nav-text">檢視</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
          // style={{ background: '#000', padding: 0 }}
          >
<Button className="barsMenu" type="primary" onClick={this.showDrawer}>
              <span className="barsBtn"><MenuOutlined /></span>
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
                color: '#fff',
                // paddingLeft: "2%",
                fontSize: "1.8em",
              }}
            >
              營主管理
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
            <div
              style={{
                padding: 24,
                // background: '#fff',
                minHeight: 780,
              }}
            >
              <section
                style={{ textAlign: "center", marginTop: 48, marginBottom: 40 }}
              >
                <Space align="start">
                  <img
                    style={{ width: 40, height: 40 }}
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    alt="Ant Design"
                  />
                  <Title level={2} style={{ marginBottom: 0 }}>
                    Ant Design
                  </Title>
                </Space>
              </section>
              <Divider style={{ marginBottom: 60 }}>Form</Divider>
              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                <Form.Item label="数字输入框">
                  <InputNumber min={1} max={10} defaultValue={3} />
                  <span className="ant-form-text"> 台机器</span>
                  <a href="https://ant.design">链接文字</a>
                </Form.Item>
                <Form.Item label="开关">
                  <Switch defaultChecked />
                </Form.Item>
                <Form.Item label="滑动输入条">
                  <Slider defaultValue={70} />
                </Form.Item>
                <Form.Item label="选择器">
                  <Select defaultValue="lucy" style={{ width: 192 }}>
                    <Option value="jack">jack</Option>
                    <Option value="lucy">lucy</Option>
                    <Option value="disabled" disabled>
                      disabled
                    </Option>
                    <Option value="yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="日期选择框">
                  <DatePicker />
                </Form.Item>
                <Form.Item label="日期范围选择框">
                  <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item label="评分">
                  <Rate defaultValue={5} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button>Cancel</Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>森活營家．live green to save green</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
