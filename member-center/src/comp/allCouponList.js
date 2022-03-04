import React, { useRef, createRef } from "react";
import { List, Input, Button, Tooltip,Modal,Row,Col } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "../App.less";
import "../style/coupon.less";

const AllCouponList = ({ allCouponData,couponVisible,setCouponVisible }) => {
  const color = {
    100: "couponValue1",
    200: "couponValue1",
    300: "tres1",
    400: "tres1",
    500: "cinco1",
    1000: "cinco1",
  };
  // FIXME: cannot get the right ref
  const linkRef = useRef([]);

  const copyCoupon = () => {
    linkRef.current.select();
    document.execCommand("copy", true);
  };
  return (
    <Modal
    title="你的coupon"
    centered
    visible={couponVisible}
    cancelText={"關閉"}
    onOk={() => setCouponVisible(false)}
    width={1000}
    closable={false}
    cancelText={"."}
    cancelButtonProps={{type:"text"}}
  >

 
    <List
     grid={{ gutter: 16, column: 3 }}
  className='AllcouponOuter'
  split={false}
  itemLayout="horizontal"
  dataSource={allCouponData}
  renderItem={(allCouponData) => (
    <List.Item className="couponlist" key={allCouponData.id}>
      <List.Item.Meta
        className="couponMeta"
        title={
          <div className={color[allCouponData.discount]}>
            ${allCouponData.discount}
            
            折價券
          </div>
        }
        //description={"ttttttt"}
      />
      <div className="couponContainer">
        <div className="couponDue">{allCouponData.pastdue_date}到期</div>

        <Input.Group compact>
          <Input
            key={allCouponData.id}
            style={{ width: "calc(100% - 3em)", margin: "0 0 0 0.2em" }}
            defaultValue={allCouponData.promo_code}
            ref={linkRef}
            readOnly
          />
          <Tooltip title="點擊複製">
            <Button icon={<CopyOutlined />} onClick={() => copyCoupon()} />
          </Tooltip>
        </Input.Group>
      </div>

      <br />
    </List.Item>
  )}
/>

  </Modal>
  );
};
export default AllCouponList;
