import {
  Avatar,
  Image,
  PageHeader,
  Button,
  Card,
  Row,
  Col,
  Divider,
  Dropdown,
  Menu,
  Modal,
  List,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { UserOutlined,NotificationOutlined,NotificationFilled  } from "@ant-design/icons";
import "../style/dashBoardMember.less";
import axios from "axios";
import { API_URL } from "../utils/config";
import { IMAGE_URL } from "../utils/config";
import CouponList from '../comp/couponList';
import AllCouponList from "../comp/allCouponList";

const DashBoard = ({}) => {
  //----------------------------
  const [couponVisible, setCouponVisible] = useState(false);
  // ----be-----User基本資料:名字,點數,照片,跟等級=消費金額------
  const [rankData, setRankData] = useState([]);
  async function Rank() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/user`, {
        withCredentials: true,
      });
      console.log("rank", result.data);
      // console.log(response.data[0].id);
      setRankData(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----到期coupon------
  const [couponData, setCoupon] = useState([]);
  async function Coupon() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/coupon`, {
        withCredentials: true,
      });
      console.log("coupon", result.data[0]);
      // console.log(response.data[0].id);
      setCoupon(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----allcoupon------
  const [allCouponData, setAllCoupon] = useState([]);
  async function AllCoupon() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/allCoupon`, {
        withCredentials: true,
      });
      console.log("allcoupon", result.data[0]);
      // console.log(response.data[0].id);
      setAllCoupon(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  useEffect(() => {
    Rank();
    Coupon();
    AllCoupon();
  }, []);

  //--------------------------------
  const menu = (
    <Menu>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  //-----------------------

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
                  <Dropdown overlay={menu} trigger={["contextMenu"]}>
                    <div
                      className="site-dropdown-context-menu"
                      style={{
                        textAlign: "center",
                        height: 200,
                        lineHeight: "200px",
                      }}
                    >
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
                    </div>
                  </Dropdown>

                  <Button className="changePicMember" key="4" size="small">
                    更改大頭貼 TODO: 更換大頭貼
                  </Button>
                </div>
              </Divider>
            </PageHeader>
            TODO: 點數{rank.point}/累積購買金額{rank.acc_total}
          </React.Fragment>
        );
      })}

      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">預定行程</h3>}
              bordered={false}
            >
              Card content TODO:預定行程
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">購買提醒</h3>}
              bordered={false}
            >
              Card content TODO:購買提醒
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">待用Coupon</h3>}
              bordered={false}
              actions={[
                <Button type="primary" onClick={() => setCouponVisible(true)}>
                  查看所有coupon
                </Button>,
              ]}
            >
              {couponData && couponData.length >= 3 && couponData.length > 0 ? (
                <>
                  <div className="pastdueAlert">
                    <NotificationFilled />
                    您有Coupon即將到期!
                  </div>
                </>
              ) : (
                ""
              )}
              <CouponList couponData={couponData} />
            </Card>
          </Col>
        </Row>
      </div>

   <AllCouponList setCouponVisible={setCouponVisible} allCouponData={allCouponData} couponVisible={couponVisible} />
    </>
  );
};

export default DashBoard;
