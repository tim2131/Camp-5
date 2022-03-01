import {
  Form,
  Select,
  Button,
  Typography,
  Space,
  Divider,
  Input,
  DatePicker,
  Spin,
  message,
  BackTop,
  bcrypt,
  Image,
} from "antd";

import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { IMAGE_URL,API_URL } from "../utils/config";
import { useForm } from 'react-hook-form'
import "antd/dist/antd.less";
import "../style/camp-profile.less";
import "../style/camp-profile.css"
// import { log } from "npmlog";
const { Option } = Select;
const { Title } = Typography;




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


const CampProfile = ({ }) => {

  //------------------------------------------------
  const [form] = Form.useForm();
  //-----後端連線----得到資料----------------------------------
  const [loading, setLoading] = useState(true);

  const [campPic, setCampPic] = useState([]);

  const [data, setData] = useState([]);
  //在這邊一進來的時候就去資料庫抓檔案，但是data的初值應該還是空陣列
  let getMemberInfo = async () => {
    //http://localhost:3002/api/memberInfo
    //http://localhost:3002
    let res = await axios.get(`${IMAGE_URL}/TentProfile`);
    setData(res.data);
    setLoading(false);
    console.log(res.data);
    //TODO: 沒辦法從資料庫抓資料時 空陣列要顯現錯誤
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getMemberInfo();
    }, 1500);

    axios.get('http://localhost:3005/camp_pic').then(res=>{
      setCampPic(res)
    })
  }, []);

  useEffect(()=>{
    console.log('campPic',campPic);
  },[campPic])
  //---------------------------------------------------------------------------
 
  //---表格變更---------------------------------------------------------------------
  function getFormData(value) {
    console.log("formData:", form.getFieldValue());
  }

  //---reset表格
  function resetBtn(e) {
    form.resetFields();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return;
  }
  //---表格送出---------------------------------------------------------------------

  const onFinish = (fieldsValue) => {
    let data = form.getFieldValue();
    console.log(data);

    // e.preventDefault();
    async function test() {
      try {
        let response = await axios.post(`${IMAGE_URL}/TentProfile`, data);
        console.log(response.data);
        success();
      } catch (e) {
        message.error("更新失敗，請稍後嘗試");
        console.log("error");
      }
    }
    test();
  };
  //----------------------------

  //-------------------------------
  function success() {
    const suc = message.success("更新成功");
    setTimeout(suc, 7000);
  }


  return (
    <>
      {loading ? (
        <Spin className="spinner" />
      ) : (
        <>
          <Divider style={{ marginBottom: 60 }}>
            <Title
            id="titleTest2"
              level={3}
              style={{
                marginBottom: 0,
                marginTop: 10,
              }}
            >
              營地資料
            </Title>
          </Divider>

          {data.map((camp) => {
            return (
              <Form
                
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                key={camp.id}
                initialValues={{
                  id:camp.id,
                  email: camp.email,
                  name: camp.company_name,
                  phone: camp.phone,
                  address: camp.address,
                }}
              >
               <Form.Item
                  name="id"
                  label=""
                  rules={[
                    {
                      required: false,
                      message: "",
                    },
                  ]}
                  hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="營地名稱"
                  rules={[
                    {
                      required: true,
                      message: "請輸入營地名稱",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="營地信箱"
                  rules={[
                    {
                      type: "email",
                      message: "這不是正確的信箱格式",
                    },
                    {
                      required: true,
                      message: "請輸入營地電子信箱",
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
                      validator: async (_, password) => {
                        if (
                          password &&
                          !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/.test(
                            password
                          )
                        ) {
                          return Promise.reject(
                            new Error(
                              "密碼為數字，小寫字母，大寫字母，特殊符號 至少包含三種，長度為 8 - 16位"
                            )
                          );
                        }
                      },
                    },
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
                  name="phone"
                  label="營地電話"
                  rules={[{ required: true, message: "請輸入營地電話" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="營地地址">
                  <Form.Item
                    name="address"
                    rules={[{ required: true, message: "請填寫營地地址" }]}
                  >
                    <Input
                      style={{
                        width: "100%",
                      }}
                      placeholder="請填寫營地地址"
                    />
                  </Form.Item>
                </Form.Item>
                
                      <div className="campPic-wrap">
                      <h4>營地圖片:</h4>
                      {campPic&&<Image.PreviewGroup>
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img1}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img2}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img3}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img4}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img5}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img6}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img7}`} />
                        <Image width={100} height={100} src={`http://localhost:3005/images/${campPic.data[camp.id-1].img8}`} />
                        </Image.PreviewGroup>}
                        
                      
                      </div>
                     
                      
              
               
               

                <Form.Item {...tailFormItemLayout}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      送出
                    </Button>
                    <Button onClick={resetBtn}>取消</Button>
                  </Space>
                </Form.Item>
              </Form>
            );
          })}
          
        </>
      )}
      
    </>
  );
};




export default CampProfile;