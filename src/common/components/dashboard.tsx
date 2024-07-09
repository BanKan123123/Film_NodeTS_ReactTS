import React, { useState } from 'react';
import { MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined, MessageOutlined, PlaySquareOutlined, SolutionOutlined, UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider } = Layout;

const DashBoard: React.FC = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    const itemsMenuDashBoard = [
        {
            key: '/home/admin/film',
            icon: <VideoCameraAddOutlined />,
            label: 'Films'
        },
        {
            key: '/home/admin/director',
            icon: <SolutionOutlined />,
            label: 'Directors'
        },
        {
            key: '/home/admin/episode',
            icon: <PlaySquareOutlined />,
            label: 'Episodes'
        },
        {
            key: '/home/admin/categories',
            icon: <MenuOutlined />,
            label: 'Categories'
        },
        {
            key: '/home/admin/users',
            icon: <UserOutlined />,
            label: 'Users'
        },
        {
            key: '/home/admin/comments',
            icon: <MessageOutlined />,
            label: 'Comments'
        }
    ];

    const handleMenuRoute = (e: MenuInfo) => {
        navigate(e.key);
    };

    return (
        <>
            <div className="admin-container">
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            blockSize: '100vh',
                            position: 'fixed',
                            insetInlineStart: 0,
                            insetBlockStart: 0,
                            insetBlockEnd: 0
                        }}
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                    >
                        <div className="demo-logo-vertical" />
                        <Menu onClick={(e) => handleMenuRoute(e)} theme="dark" mode="inline" selectedKeys={[location.pathname]} defaultSelectedKeys={['1']} items={itemsMenuDashBoard}></Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    inlineSize: 64,
                                    blockSize: 64
                                }}
                            />
                        </Header>
                    </Layout>
                </Layout>
            </div>
        </>
    );
};

export default DashBoard;
