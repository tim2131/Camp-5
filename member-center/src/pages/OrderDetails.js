import React from "react";
import { Col, Row, Divider, Typography,Card } from "antd";
const { Title } = Typography;
const style = { background: '#0092ff', padding: '8px 0' };
const { Meta } = Card;


const data = [
    {
        id: "1",
        camp: "綠色生活露營",
        county: "桃園縣",
        href: "/orderDetails",
        pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        orderdate_start: "2022/5/1",
        orderdate_end: "2022/5/3",
        order_status: "1",
        tag_status: "1",
        tent_type: "",
    },]
    console.log(data.id)

const OrderDetails = () => {
    const tagWords = {
        1: "主打",
        2: "促銷",
      }
    
      const tagcolor = {
        1: "tagStar",
        2: "tag",
      };
    
      const orderStatus = {
        1: "未完成",
        2: "完成",
        3: "取消",
      };
      const orderStatuscolor = {
        1: "statusTagTBD",
        2: "statusTagDone",
        3: "statusTagCancel",
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
            <Row gutter={{ xs: 8, sm: 16, md: 20, lg: 24 }}>

                <Col className="gutter-row" span={6} offset={3}>
                    <div style={style}>
                        
                    <img src={data.pic} ></img>

                    </div>
                </Col>
                <Col className="gutter-row" span={12} >
                    <div style={style}>col-12</div>
                </Col>

            </Row>
        </>
    )
}


export default OrderDetails;