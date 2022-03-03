import React, { useRef, createRef,} from "react";
import { List, Input, Button,Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "../App.less";
import "../style/coupon.less";


const CouponList = ({ couponData }) => {
  // FIXME: cannot get the right ref
  const linkRef = useRef([]);

  const copyCoupon = () => {
    linkRef.current.select();
    document.execCommand("copy", true);
  };
  return (
    <List
      split={false}
      itemLayout="horizontal"
      dataSource={couponData}
      renderItem={(couponData) => (
        <List.Item className="couponlist" key={couponData.id}>
          <List.Item.Meta
            className="couponMeta"
            title={
              <div className="couponValue">${couponData.discount}折價券</div>
            }
            //description={}
          />
          <div className="couponDue">ddddddddddddddddddddddd</div>
          {couponData.pastdue_date}到期
          <Input.Group compact>
            <Input
              key={couponData.id}
              style={{ width: "calc(100% - 200px)" }}
              defaultValue={couponData.promo_code}
              ref={linkRef}
              readOnly
            />
            <Tooltip title="點擊複製">
              <Button icon={<CopyOutlined />} onClick={() => copyCoupon()} />
            </Tooltip>
          </Input.Group>
          <br />
        </List.Item>
      )}
    />
  );
};
export default CouponList;
