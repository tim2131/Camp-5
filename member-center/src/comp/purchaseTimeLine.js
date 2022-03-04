import React, { useState } from 'react';
import { Timeline, Radio } from 'antd';
import moment from 'moment';
import { SmileOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Navigate, Link } from "react-router-dom";
import "antd/dist/antd.less";
import "../style/purchaseTime.less";


const TimelimeLabelDemo = (purData) => {

    console.log("pur", purData.purData)
    return (
        <React.Fragment>

            <Timeline mode="left"
                pendingDot={<CaretDownOutlined />}
                pending={true}
            >

                <Timeline.Item
                    dot={<SmileOutlined />}
                    label={moment().format('YYYY-MM-DD')}>
                    今天
                </Timeline.Item>
                {purData.purData.map((item) => (

                    <>
                        <Timeline.Item label={item.delivery_time}>
                            <Link to={`/orderDetails/${item.POId}`}>
                            <p className='productPOtitle'>訂單{item.POId}即將寄出!</p>
                            </Link>
                            <p className='timeItem'>預計三日可抵達超商</p>
                        </Timeline.Item>



                        {/* <Timeline.Item 
                        label={moment(item.delivery_time).add(7,'d')} //ASK: 沒辦法讓moment+7D
                        //label={item.delivery_time}
                        >
                        <p>訂單{item.POId}即將寄出!</p>
                        <p>預計三日可抵達超商</p>
                        </Timeline.Item> */}
                    </>

                ))}

            </Timeline>
        </React.Fragment>
    )
}


export default TimelimeLabelDemo;