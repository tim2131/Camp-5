import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined,BorderlessTableOutlined,FileSearchOutlined,HeartOutlined,CompassOutlined } from '@ant-design/icons'
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import './navi.css'

const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                        <BorderlessTableOutlined />
                        
                            <span className="nav-text">首頁</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <UserOutlined />
                            <span className="nav-text">個人資料</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <FileSearchOutlined />
                            <span className="nav-text">訂單</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <HeartOutlined />
                        <span className="nav-text">我的最愛</span>

                        </Menu.Item>
                        <Menu.Item  key="5">
                        <CompassOutlined />
                        <span className="nav-text">露營地圖</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>
                            
                        </span>
                        <span style={{ color: '#fff', paddingLeft: '2%', fontSize: '1.4em' }}>會員中心</span>
                        <span style={{ color: '#fff', float: 'right', paddingRight: '1%' }}>
                            <img className="App-logo" alt="logo" />
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo;