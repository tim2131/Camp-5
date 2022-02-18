import {
  Form,
  Select,
  Button,
  Typography,
  Space,
  Divider,
  Input,
  DatePicker,
} from "antd";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../utils/config";
import { useForm } from 'react-hook-form'
import "antd/dist/antd.less";
const { Option } = Select;
const { Title } = Typography;
const { MonthPicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

//-------表格RWD縮放---------------------
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    lg: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    lg: {
      span: 8
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
    lg: {
      span: 8
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
  //-----後端連線----得到資料----------------------------------

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  //在這邊一進來的時候就去資料庫抓檔案，但是data的初值應該還是空陣列
  let getMemberInfo = async () => {
    //http://localhost:3002/api/memberInfo
    //http://localhost:3002
    let res = await axios.get(`${API_URL}/memberInfo`);
    setData(res.data);
    // console.log(res.data[0].name)
  };

  useEffect(() => { getMemberInfo(); }, []);
  //------------------------------------------------------------------------
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
    };
  }
  //----------日期相關---------------------------------------------------------
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "請選擇日期",
      },
    ],
  };


  //-------button submit------送資料給後端---------------------------------------------------
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(`${API_URL}/memberInfo`, data);
      console.log(response.data);
    } catch (e) {
      console.error("error", e.response.data);
    }
  }

  return (
    <>
      <Divider style={{ marginBottom: 60 }}>
        <Title
          level={3}
          style={{
            marginBottom: 0,
            marginTop: 10,
          }}
        >
          會員資料
        </Title>
      </Divider>
      {error && <div>{error}</div>}
      {data.map((member) => {
        return (
          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            key={member.id}
            initialValues={{
              email: member.user_name,
              name: member.name,
              gender: member.gender,
              //日期TBD
              datePicker:moment(`${member.bday}`, dateFormat),
              phone: member.phone,
              address: member.address,
            }}
          >
            <Form.Item
              name={"name"}
              label="名字"
              rules={[
                {
                  required: true,
                  message: "請輸入姓名",
                },
              ]}
            >
              <Input onChange={handleChange} />
            </Form.Item>
            <Form.Item
              name="email"
              label="您的信箱"
              rules={[
                {
                  type: "email",
                  message: "這不是正確的信箱格式",
                },
                {
                  required: true,
                  message: "請輸入你的信箱",
                },
              ]}
            >
              <Input onChange={handleChange} />
            </Form.Item>

            <Form.Item
              name="password"
              label="您的密碼"
              rules={[
                {
                  required: true,
                  message: "請輸入你的密碼",
                },
              ]}
              hasFeedback
            >
              <Input.Password onChange={handleChange} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="再次輸入密碼"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "請確認你的密碼",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("密碼不相同，請確認"));
                  },
                }),
              ]}
            >
              <Input.Password onChange={handleChange} />
            </Form.Item>

            <Form.Item
              name="gender"
              label="性別"
              rules={[
                {
                  required: true,
                  message: "請選擇性別",
                },
              ]}
            >
              <Select placeholder="請選擇" onChange={onGenderChange} allowClear>
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form.Item>
            <Form.Item name="datePicker" label="您的生日" {...config}>
              <DatePicker onChange={handleChange} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="聯繫號碼"
              rules={[{ required: true, message: "請輸入聯繫號碼" }]}
            >
              <Input style={{ width: "100%" }} onChange={handleChange} />
            </Form.Item>

            <Form.Item label="地址">
              <Form.Item
                name="address"
                rules={[{ required: true, message: "請填寫地址" }]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="請填寫地址"
                  onChange={handleChange}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Space>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  送出
                </Button>
                <Button>取消</Button>
              </Space>
            </Form.Item>
          </Form>
        );
      })}
    </>
  );
}




export default MemberProfile;
