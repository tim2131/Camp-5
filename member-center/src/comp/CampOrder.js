import React from "react";
import { List, Avatar } from "antd";

import "../App.less";

const data = [
  { id:"1",
    title: "Ant Design Title 1",
    des: "hello1",
    pic: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
  },
  { title: "Ant Design Title 2" },
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
          key={item.id}
          extra={
            <img
              width={272}
              alt="camp-pic"
              src={item.pic}
            />
          }
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.des}
          />
        </List.Item>
      )}
    />
  );
};
export default CampOrder;
