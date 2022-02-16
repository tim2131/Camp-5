import React from "react";
import { List} from "antd";
import { Link } from "react-router-dom";

import "../App.less";
import "../style/campOrder.less";

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
  },
  {
    id: "2",
    camp: "綠色生dddddddd活露營",
    county: "新北市",
    href: "/orderDetails",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
    tag_status: "2"
  },
  {
    id: "3",
    camp: "綠色綠色綠色生活露營",
    county: "新北市",
    href: "",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "3",
    tag_status: "3"
  },
  {
    id: "4",
    camp: "綠色生活露營",
    county: "桃園縣",
    href: "",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "1",
    tag_status: "1"
  },
  {
    id: "5",
    camp: "綠色生活露營",
    county: "新北市",
    href: "",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
    tag_status: "2"
  },
  {
    id: "6",
    camp: "綠色生活露營",
    county: "新北市",
    href: "",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "3",
    tag_status: "3"
  },
];



const CampOrder = () => {

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
    <List

      size="small"
      itemLayout="horizontal"
      dataSource={data}
      pagination={{
        position: "bottom",
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      renderItem={(item) => (
        <Link to={item.href}>
        <div className="list" >
          <List.Item

            actions={[
            ]}
            key={item.id}
          //   extra={          }
          >
            <List.Item.Meta
              title={<>
                <div className={orderStatuscolor[item.order_status]}>
                  {orderStatus[item.order_status]}
                </div>
                <a className="campTitle" href={item.href}>
                  {item.camp}
                </a>

              </>

              }
              description={
                <>
                  <span className="campdate">{item.orderdate_start}</span>~
                  <span className="campdate">{item.orderdate_end}</span>
                  <br />
                  <span className="campdate">{item.county}</span>
                  
                  <div className="orderlinkbox">
                  <Link to={item.href}>
                  <button className="orderlinks" key="list-loadmore-edit" >
                  訂單詳細
                  </button>   
                  </Link>
                  </div>
                </>
              }
            />

            {/* --------------pic-------------------- */}
            <div className="orderPicBox">
              <div className="tagWord">
                {tagWords[item.order_status]}
              </div>
              <div className={tagcolor[item.order_status]}></div>
              <div className="list_item">
                <img className="pic" src={item.pic} alt="camp-pic" />
              </div>
            </div>
            {/* ----------------------------- */}
          </List.Item>
        </div>
        </Link>
      )}
    />
  );
};
export default CampOrder;
