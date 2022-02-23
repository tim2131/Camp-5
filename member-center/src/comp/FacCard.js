import { Card, Col, Row, Avatar } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined,HeartOutlined } from '@ant-design/icons';
// --------less or css-------------------------
import "../style/FavCard.less";

const { Meta } = Card;

const FavCard = ({ }) => {

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Row gutter={ [{ xs: 1, sm: 2, md: 4, lg: 4 }, 40]} justify="center">
                    <Col  xs={24} sm={12} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    src="http://localhost:3005/images/camp1.jpg"
                                    //TODO: put real img
                                    // src={`${IMAGE_URL}/images/${item.img1}`}
                  // src={`${IMAGE_URL}${item.img1}`} 
                  // http://localhost:3005/images/camp1.jpg
                                />
                            }
                            actions={[
                                <HeartOutlined key="heart" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    {/* //--------------------------------------------------------------------- */}
                    <Col  xs={24} sm={12} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col><Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col><Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col><Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col><Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col><Col  xs={24} sm={24} md={12} lg={12} xl={10} xxl={7}>
                        <Card className="Scard"
                            bordered={false}
                            // style={{ width: 400 }}
                            cover={
                                <img
                                    className="imgInCard"
                                    alt="example"
                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    {/* //--------------------------------------------------------------------- */}
                </Row>
            </div>
        </>
    );
};

export default FavCard;
