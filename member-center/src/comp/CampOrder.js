import React from "react";
import { List, Avatar } from "antd";

import "../App.less";
import "../style/campOrder.less";

const data = [
  {
    id: "1",
    camp: "綠色生活露營",
    county: "桃園縣",
    href: "",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "1",
  },
  {
    id: "2",
    camp: "綠色生活露營",
    county: "新北市",
    href: "",
    pic: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    orderdate_start: "2022/5/1",
    orderdate_end: "2022/5/3",
    order_status: "2",
  },
  { title: "Ant Design Title 3" },
  { title: "Ant Design Title 4" },
];

const CampOrder = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">給予評論</a>,
            <a key="list-loadmore-more">訂單詳細</a>,
          ]}
          key={item.id}
          //   extra={          }
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.camp}</a>}
            description={
              <>
                <span>{item.orderdate_start}</span>~
                <span>{item.orderdate_end}</span>
                <br />
                <span>{item.county}</span>
              </>
            }
          />
          {/* -------status--tag-------------- */}
          <div className="statusTag">{item.order_status}</div>
          {/* ---------pic-------------------- */}
              <div className="orderPicBox">
                  
            <div className="tagWord">特價</div>
                  <div className="tag"></div>
                  
            <div className="tagWord">主打</div>
                  <div className="tagStar"></div>
                  
            <div className="list_item">
              <img className="pic" src={item.pic} alt="camp-pic" />
            </div>
          </div>
          {/* ----------------------------- */}
        </List.Item>
      )}
    />
  );
};
export default CampOrder;
