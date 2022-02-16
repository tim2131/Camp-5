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
 

  useEffect(() => {
    let getMemberInfo = async () => {
      //http://localhost:3002/api/memberInfo
      //http://localhost:3002
      let res = await axios.get(`${API_URL}/memberInfo`);
      setData(res.data);
      // console.log(res.data[0].name)
    };
    getMemberInfo();
  }, []);
//------------------------------------------------------------------------

  
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
 
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
    };
  }

//-------button submit---------------------------------------------------------------------
// function handleChange(e) {
//   setData({ ...data, [e.target.name]: e.target.value });
// }
// async function handleSubmit(e) {
//   e.preventDefault();
//   try {
//     let response = await axios.post(`${API_URL}/auth/register`, data);
//     console.log(response.data);
//   } catch (e) {
//     console.error("error", e.response.data);
//   }
// }

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
      <Form {...formItemLayout} form={form} onFinish={onFinish} initialValues={{name:'tannt'}}>
        {data.map((member) => {
          return (
            <div key={member.id}>
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
                <Input  />
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
                <Input defaultValue={member.user_name} />
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
                <Input.Password />
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
                <Input.Password />
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
                <Select
                  placeholder="請選擇"
                  onChange={onGenderChange}
                  defaultValue={member.gender}
                  allowClear
                >
                  <Option value="1">男</Option>
                  <Option value="0">女</Option>
                </Select>
              </Form.Item>
              <Form.Item name="date-picker" label="DatePicker" {...config}>
                <DatePicker defaultValue={moment("2015-01-01", dateFormat)} />
              </Form.Item>

              <Form.Item
                name="phone"
                label="聯繫號碼"
                rules={[{ required: true, message: "請輸入聯繫號碼" }]}
              >
                <Input style={{ width: "100%" }} defaultValue={member.phone} />
              </Form.Item>

              <Form.Item label="地址">
                <Form.Item
                  name={["address", "street"]}
                  rules={[{ required: true, message: "請填寫地址" }]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="請填寫地址"
                    defaultValue={member.address}
                  />
                </Form.Item>
              </Form.Item>
            </div>
          );
        })}

        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit" 
            // onClick={handleSubmit}
            >
              送出
            </Button>
            <Button>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}




export default MemberProfile;