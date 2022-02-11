import {
  Form,
  Select,
  Button,
  Typography,
  Space,
  Divider,
  Input,
} from "antd";

import React, { Component } from "react";
import {useForm} from 'react-hook-form'
import "antd/dist/antd.less";
const { Option } = Select;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    lg:{
      span:8
    }
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    lg:{
      span:8
    }
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
    lg:{
      span:8
    },
  },
};



const MemberProfile = () => {
  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue();
        return;

      case 'female':
        form.setFieldsValue();
        return;
    }
  };

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
      <Form {...formItemLayout} form={form} >

      <Form.Item
        name="email"
        label="您的信箱"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="您的密碼"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('密碼不相同，請確認'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="gender"
        label="性別"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="請選擇"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">男</Option>
          <Option value="female">女</Option>
        </Select>
      </Form.Item>
        <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={['address', 'county']}
            noStyle
            rules={[{ required: true, message: '請選擇縣市' }]}
          >
            <Select placeholder="請選擇縣市">
              <Option value="1">台北</Option>
              <Option value="2">新北</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['address', 'dist']}
            rules={[{ required: true, message: '請選擇鄉鎮市區' }]}
          >
            <Select placeholder="請選擇鄉鎮市區">
              <Option value="1">淡水</Option>
              <Option value="2">石門</Option>
            </Select>
          </Form.Item>
          </Input.Group>
          <Form.Item
            name={['address', 'street']}
            rules={[{ required: true, message: '請填寫地址' }]}
          >
            <Input style={{ 
              width: '100%'
              }} placeholder="請填寫地址" />
          </Form.Item>
      
      </Form.Item>


      <Form.Item {...tailFormItemLayout} >
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




export default MemberProfile;