import React from "react";
import { List} from "antd";
import { Link } from "react-router-dom";


import "../App.less";
import "../style/campOrder.less";





const CampOrder = ({ data}) => {
  //-----for thumbnail-------------
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
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
          <div className="list">
            <List.Item
              actions={[]}
              key={item.id}
              //   extra={          }
            >
              <List.Item.Meta
                title={
                  <>
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
                        <button className="orderlinks" key="list-loadmore-edit">
                          訂單詳細
                        </button>
                      </Link>
                    </div>
                  </>
                }
              />

              {/* --------------pic-------------------- */}
              <div className="orderPicBox">
                <div className="tagWord">{tagWords[item.order_status]}</div>
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
