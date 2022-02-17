import React from "react";
import { Col, Row, Divider, Typography, Card } from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };
const { Meta } = Card;

const data = [
  {
    id: "1",
    camp: "綠色dddd生活露營",
    county: "桃園縣",
    href: "/orderDetails",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "1",
    tag_status: "1",
    tent_type: "",
  },
];
//console.log(data[0].id)

const OrderDetails = () => {
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "tagStar",
    2: "tag",
  };
  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
  };
  const orderStatus = {
    1: "未完成",
    2: "完成",
    3: "取消",
  };

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
          訂單詳細
        </Title>
      </Divider>
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 20, lg: 24 }}>
        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
        >
          <div style={style}>
            <div className={orderStatuscolor[data[0].order_status]}>
              {orderStatus[data[0].order_status]}
            </div>
            <Divider />
            <div className="orderPicBox">
              <div className="tagWord">{tagWords[data[0].order_status]}</div>
              <div className={tagcolor[data[0].order_status]}></div>
              <div className="list_item">
                <img className="pic" src={data[0].pic} alt="camp-pic" />
              </div>
            </div>

            <div className="subtitle">{data[0].camp}</div>
            <div className="infobox">
              <span>入住時間</span>
              <br />
              <span>退房時間</span>
              <br />
              <span>地址</span>
              <span>電話</span>
            </div>
          </div>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 12, offset: 0 }}
          xl={{ span: 12, offset: 0 }}
        >
          <div style={style}>
            <div>訂購資訊</div>
            <span>訂購人姓名:</span>
            <span>訂購人電話:</span>
            <br />
            <span>訂單成立時間</span> <br />
            <div>訂單詳細資訊</div> <br />
            <span>帳篷類型</span> <br />
            <span>帳篷數</span> <br />
            <span>加購活動</span> <br />
            <span>加購人數</span> <br />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
