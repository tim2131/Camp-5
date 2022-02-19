import React from "react";
import { List} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

import "../App.less";
import "../style/campOrder.less";





const CampOrder = ({data}) => {
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
    1: "statusTagTBD1",
    2: "statusTagDone1",
    3: "statusTagCancel1",
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
      renderItem={item => (
        <Link to="/">
          <div className="list">
          <List.Item
              actions={[]}
              key={item.id}
              //   extra={          }
            >
              <List.Item.Meta
                title={
                  <div>
                    <div className={orderStatuscolor[item.orderstatus_id]}>
                      {orderStatus[item.orderstatus_id]}
                    </div>
                    <a className="campTitle" 
                    href={item.href}
                    >
                      {item.camp_name}
                    </a>
                  </div>
                }
                description={
                  <>
                    <span className="campdate">
                    {/* TODO:moment失敗 */}
                    {item.orderdate_start}
                    {/* {moment(`${item.orderdate_start}`, "YYYY-MM-DD")} */}
                    </span>~
                    <span className="campdate">{item.orderdate_end}</span>
                    <br />
                    <span className="campdate">{item.campcounty_id}</span>
                    <div className="orderlinkbox">
                    {/* TODO: link連到指定PO */}
                      <Link to="/"  >
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
                <div className="tagWord">{tagWords[item.orderstatus_id]}</div>
                <div className={tagcolor[item.orderstatus_id]}></div>
                <div className="list_item">
                  <img className="pic" 
                  // src={item.pic}
                   alt="camp-pic" />
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
