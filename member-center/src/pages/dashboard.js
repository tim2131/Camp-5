import {
  Avatar,
  Image,
  PageHeader,
  Button,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import "../style/dashBoardMember.less";
import axios from "axios";
import { API_URL } from "../utils/config";
import { IMAGE_URL } from "../utils/config";




const DashBoard = ({}) => {
// --------------------------------------
const [rankData, setRankData] = useState([]);
async function Rank() {
  try {
    let result = await axios.get(`${API_URL}/dashboard/user`, {
      withCredentials: true,
    });
    console.log(result.data);
    // console.log(response.data[0].id);
    setRankData(result.data[0]);
  } catch (e) {
    console.error("error");
  }
  }
    useEffect(() => {
      Rank();
    }, []);

//--------------------------------
  
  return (
    <>
      {rankData.map((rank) => {
        return (
          <React.Fragment>
            <PageHeader
              className="site-page-header"
              title={`歡迎!! ${rank.name.slice(1, 5)}`}
              //subTitle={rank.name.slice(1, 5)}
              // extra={"test"}
              //footer={"test"}
            >
              <Divider style={{ marginBottom: 60, marginTop: "-3em" }}>
                <div className="memberpicBox">
                  <Avatar
                    className="avatarMember"
                    src={<Image src={`${IMAGE_URL}/images/${rank.img}`} />}
                    size={{
                      xs: 48,
                      sm: 64,
                      md: 80,
                      lg: 128,
                      xl: 160,
                      xxl: 200,
                    }}
                    icon={<UserOutlined />}
                  />
                  <Button className="changePicMember" key="4" size="small">
                    更改大頭貼 TODO: 更換大頭貼
                  </Button>
                </div>
              </Divider>
            </PageHeader>
            TODO: 點數/累積購買金額
          </React.Fragment>
        );
      })}
      
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card className="rowCard" title="預定行程" bordered={false}>
              Card content TODO:預定行程
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card className="rowCard" title="購買提醒" bordered={false}>
              Card content TODO:購買提醒
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card className="rowCard" title="待用Coupon" bordered={false}>
              Card content TODO:coupon顯示
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashBoard;
