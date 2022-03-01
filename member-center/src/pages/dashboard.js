import {
  Avatar,
  Image,
  PageHeader,
  Button,
  TabPane,
  Tabs,
  Card,
  Row,
  Col,
  Title,
  Divider,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import "../style/dashBoardMember.less";
import axios from "axios";



const DashBoard = ({logData ,setLogData}) => {
// -------------------------------------------------

//--------------------------------
  
  return (
    <>
  
      <PageHeader
        className="site-page-header"
        title="歡迎!"
        subTitle="會員名字"
        extra={[]}
        // footer={}
      >
        <Divider style={{ marginBottom: 60 }}>
          <div className="memberpicBox">
            <Avatar
              className="avatarMember"
              src={
                <Image
                  src="https://joeschmoe.io/api/v1/random"
                  fallback={<UserOutlined />}
                />
              }
              size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
              icon={<UserOutlined />}
            />
            <Button className="changePicMember" key="4" size="small">
              更改大頭貼
            </Button>
          </div>
        </Divider>
      </PageHeader>

      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card className="rowCard" title="預定行程" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card className="rowCard" title="購買提醒" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card className="rowCard" title="待用Coupon" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashBoard;
