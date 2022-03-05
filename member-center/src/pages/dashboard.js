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
import {
  UserOutlined,
  NotificationOutlined,
  NotificationFilled,
} from "@ant-design/icons";
import "../style/dashBoardMember.less";
import axios from "axios";
import { API_URL } from "../utils/config";
import { IMAGE_URL } from "../utils/config";
import CouponList from "../comp/couponList";
import AllCouponList from "../comp/allCouponList";
import { Navigate, Link } from "react-router-dom";

const DashBoard = ({}) => {
  const [memberPic, setMemberPic] = useState({  });
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
  // ----be-----iti------
  const [itiData, setIti] = useState([]);
  async function Iti() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/iti`, {
        withCredentials: true,
      });
      console.log("iti", result.data[0]);
      // console.log(response.data[0].id);
      setIti(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  // ----be-----pur------
  const [purData, setPur] = useState([]);
  async function Pur() {
    try {
      let result = await axios.get(`${API_URL}/dashboard/pur`, {
        withCredentials: true,
      });
      console.log("pur", result.data[0]);
      // console.log(response.data[0].id);
      setPur(result.data[0]);
    } catch (e) {
      console.error("error");
    }
  }
  useEffect(() => {
    Rank();
    Coupon();
    AllCoupon();
    Iti();
    Pur();
  }, []);
   useEffect(() => {
     handleSubmitPic();
   }, [memberPic]);


  //--------------------------------
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={(e) => {
            onFotoClick(e);
            
          }}
        />
        限定格式: .jpg, .jpeg 或 .png
      </Menu.Item>
    </Menu>
  );
  //--------------------------------

  async function onFotoClick(e) {
    try {
      setMemberPic({ ...memberPic, photo: e.target.files[0] });
    } catch (e) {
      console.error("onFotoClick Failed");
    }
  }

  async function handleSubmitPic() {
    // e.preventDefault();
    try {
      // 方法2: 要圖片上傳要用 FormData
      let formData = new FormData();
      formData.append("photo", memberPic.photo);
      console.log("formdata",formData.get("photo"))
      let response = await axios.post(`${API_URL}/changePic`, formData, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (e) {
      // console.error("error", e.response.data);
      console.error("上傳失敗");
    }
  }

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
                  <Dropdown overlay={menu} trigger={["contextMenu"]}>
                    <div
                      className="site-dropdown-context-menu"
                      style={{
                        textAlign: "center",
                        height: 200,
                        lineHeight: "200px",
                      }}
                    >
                      <div className="avaContainer">
                        <Avatar
                          className="mask"
                          size={{
                            xs: 128,
                            sm: 128,
                            md: 128,
                            lg: 160,
                            xl: 200,
                            xxl: 200,
                          }}
                        >
                          右鍵更換頭貼
                        </Avatar>
                        <Avatar
                          className="avatarMember"
                          src={`${IMAGE_URL}/images/${rank.img}`}
                          size={{
                            xs: 128,
                            sm: 128,
                            md: 128,
                            lg: 160,
                            xl: 200,
                            xxl: 200,
                          }}
                          icon={<UserOutlined />}
                        />
                      </div>
                    </div>
                  </Dropdown>
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
              <List
                itemLayout="horizontal"
                dataSource={itiData}
                renderItem={(item) => (
                  <Link to={`/orderDetails/${item.CAMPID}`}>
                    <div className="campOrder3">
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <div className="circleDate">
                              <div className="month3">
                                {item.orderdate_start.split("-")[1]}
                              </div>
                              <div className="date3">
                                {item.orderdate_start.split("-")[2]}
                              </div>
                            </div>
                          } //Date symbol?
                          title={
                            <Link
                              className="campOrder3title"
                              to={`/orderDetails/${item.CAMPID}`}
                            >
                              {item.camp_name}
                            </Link>
                          } //linkTo
                          description={`地址: ${item.camp_add}`}
                        />
                      </List.Item>
                    </div>
                  </Link>
                )}
              />
              ,
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card
              className="rowCard"
              title={<h3 className="dsCardTitle">到貨提醒</h3>}
              bordered={false}
            >
              <List
                itemLayout="horizontal"
                dataSource={purData}
                renderItem={(item) => (
                  <div className="campOrder3">
                    <List.Item key={item.POId}>
                      <List.Item.Meta
                        avatar={
                          <div className="circleDate">
                            <div className="month3">
                              {item.delivery_time.split("-")[1]}
                            </div>
                            <div className="date3">
                              {item.delivery_time.split("-")[2]}
                            </div>
                          </div>
                        }
                        title={`訂單${item.POId}即將寄出`} //linkTo
                        description={`購買品項: ${item.product_name}*${item.quantity}...等`}
                      />
                    </List.Item>
                  </div>
                )}
              />
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

      <AllCouponList
        setCouponVisible={setCouponVisible}
        allCouponData={allCouponData}
        couponVisible={couponVisible}
      />
    </>
  );
};

export default DashBoard;
