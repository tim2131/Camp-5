import {
  Select,
  Typography,
  Divider,
  Tabs,
} from "antd";

import React from "react";
import "antd/dist/antd.less";
import CampOrder from '../comp/CampOrder';
import ProductOrder from "../comp/ProductOrder";
const { Option } = Select;
const { Title } = Typography;



// ---------------for Tabs---------------
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
// ---------------for Tabs end---------------

const MemberOrder = () => {

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
          訂單資料
        </Title>
      </Divider>
      {/*---------------for Tabs--------------- */}
      <Tabs onChange={callback} type="card">
        <TabPane tab="營地訂單" key="1">
          <CampOrder/>
        </TabPane>
        <TabPane tab="商品訂單" key="2">
          <ProductOrder/>
        </TabPane>
      </Tabs>
      {/*---------------Tabs end--------------- */}
    </>
  );
};

export default MemberOrder;
