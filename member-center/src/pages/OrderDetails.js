import React from "react";
import { Col, Row, Divider, Typography, Card, List } from "antd";
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
    add: "桃園縣",
    phone: "0355555555",
    href: "/orderDetails",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
    tag_status: "1",
    tent_type: "",
    name: "Tammy Chen",
    orderdate: "2022/1/30",
    tent_name: "環保A障",
    tent_type: "TEE PEE",
    tent_num: "4",
    add_act: "加購活動一",
    add_act_ppl: "4",
    order_total: "8000",
    act_total: "600",
    tent_unitPrice: "600",
    tent_salePrice: "600",
    order_coupon: "200",
    order_discount: "800",
  },
  {
    id: "2",
    camp: "綠色dddd生活露營",
    county: "桃園縣",
    add: "桃園縣",
    phone: "0355555555",
    href: "/orderDetails",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
    tag_status: "1",
    tent_type: "",
    name: "Tammy Chen",
    orderdate: "2022/1/30",
    tent_type: "TEE PEE",
    tent_num: "4",
    add_act: "加購活動一",
    add_act_ppl: "4",
  },
];
//console.log(data[0].id)
const tentData = [
  { tent_name: "環保A障", tent_type: "TEE PEE", tent_num: "4" },
  {
    tent_name: "環保B障",
    tent_type: "TEE PEE",
    tent_num: "3",
    tent_des:
      "是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動是一個很棒的活動",
  },
];

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
              <span className="subnote">入住時間</span>
              <br />
              <span className="subname">{data[0].orderdate_start}</span>
              <br />
              <span className="subnote">退房時間</span>
              <br />
              <span className="subname">{data[0].orderdate_end}</span>
              <br />
              <span className="subnote">地址</span>
              <br />
              <span className="subname">{data[0].add}</span>
              <br />
              <span className="subnote">電話</span>
              <br />
              <span className="subname">{data[0].phone}</span>
              <br />
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
            <Divider orientation="left">
              <div className="subtitle2">訂購人資訊</div>
            </Divider>
            <div className="btnclaster">
              <button className="orderlinks">取消訂單</button>
              <button className="orderlinks">填寫評價</button>
              <button className="orderlinks">聯繫客服</button>
            </div>
            <div className="">
              <br />
              <span className="subnote3">訂購人姓名:</span>
              <span className="subname4">{data[0].name}</span>
              <br />
              <span className="subnote3">訂購人電話:</span>

              <span className="subname4">{data[0].phone}</span>
              <br />
              <span className="subnote3">訂單成立時間</span>
              <span className="subname4">{data[0].orderdate}</span>
              <br />
            </div>

            <Divider orientation="left">
              <div className="subtitle2">訂單詳細資訊</div>
            </Divider>
            <br />
            {/* 這裡要用push */}
            <List itemLayout="vertical" size="small">
              <List.Item
                key={tentData[0].tent_name}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{tentData[0].tent_name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">帳篷類型</span> <br />
                      <span className="subname2">{tentData[0].tent_type}</span>
                      <br />
                      <span className="subnote2">帳篷數</span> <br />
                      <span className="subname2">{tentData[0].tent_num}</span>
                    </>
                  }
                />
              </List.Item>
            </List>
            {/* 這裡要用push */}
            <List itemLayout="vertical" size="small">
              <List.Item
                key={tentData[0].tent_name}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{tentData[0].tent_name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">帳篷類型</span> <br />
                      <span className="subname2">{tentData[0].tent_type}</span>
                      <br />
                      <span className="subnote2">帳篷數</span> <br />
                      <span className="subname2">{tentData[0].tent_num}</span>
                    </>
                  }
                />
              </List.Item>
            </List>
            <br />
            <Divider orientation="left">
              <div className="subtitle2">加購活動</div>
            </Divider>
            <br />
            {/* 這裡要用push */}
            <List className="" itemLayout="vertical" size="small">
              <List.Item
                key={data[0].add_act}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{data[0].add_act}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">活動描述</span> <br />
                      <span className="subname2">{tentData[1].tent_des}</span>
                      <br />
                      <span className="subnote2">加購人數</span> <br />
                      <span className="subname2">{tentData[0].tent_num}</span>
                      <br />
                    </>
                  }
                />
              </List.Item>
            </List>
            <Divider orientation="left">
              <div className="subtitle2">訂單金額</div>
            </Divider>
            <br />
            <div>
              <div className="totalBlockEnd">
                <div className="totalItemBlock">
                  <div className="totalItem">營地每晚單價(4晚)</div>
                  <div className="totalItem">營地折扣完單價(1晚)</div>
                  <div className="totalItem">溫泉活動加購(4人)</div>
                  <div className="totalItem">折扣碼</div>
                  <div className="totalItem">折扣總額</div>
                  <Divider />
                  <div className="totalItemE">訂單總額</div>
                </div>

                <div className="totalmoney">
                  <div className="total">{data[0].tent_unitPrice}</div>
                  <div className="total">{data[0].tent_salePrice}</div>
                  <div className="total">{data[0].act_total}</div>
                  <div className="total">-{data[0].order_coupon}</div>
                  <div className="total">-{data[0].order_discount}</div>
                  <Divider />
                  <div className="totalE">{data[0].order_total}</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
