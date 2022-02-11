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

import React, { Component } from "react";
import "antd/dist/antd.less";


const { Option } = Select;
const { Title } = Typography;


class MemberProfile extends Component {
  render() {
    return (
      <>
        <Divider style={{ marginBottom: 60 }}>
          <Title level={3} style={{
            marginBottom: 0,
            marginTop: 10,
          }}>
            會員資料
          </Title>
        </Divider>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>


          <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>

      </>
    )


  }
}




export default MemberProfile;