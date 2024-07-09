import React from 'react';
import logo from '../../public/images/PiinCode.png';
import Category from '../../components/admin/categories/categories.interface';
import { Link } from 'react-router-dom';
import { BellOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { GetCategories } from '../../services/category.services';
import '../styles/Scss/navbar.scss';
import { Dropdown, MenuProps, Space } from 'antd';

const NarbarHome: React.FC = () => {
    const categories: Category[] = GetCategories();

    const items: MenuProps['items'] = categories.map((category: Category) => ({
        key: category.slug,
        label: <Link to={`http://localhost:3000/home/film/${category.slug}`}>{category.name}</Link>
    }));

    const itemsuser: MenuProps['items'] = [
        {
            label: 'Detail',
            key: '1'
        },
        {
            label: 'Sign out',
            key: '2'
        }
    ];

    console.log(items);

    return (
        <>
            <div className="navbar-home">
                <div className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="navbar-menu">
                    <ul>
                        <li>
                            <h1>Home</h1>
                        </li>
                        <li>
                            <Dropdown menu={{ items }}>
                                <Space>
                                    <h1>Categories</h1>
                                </Space>
                            </Dropdown>
                        </li>
                    </ul>
                </div>

                <div className="navbar-info">
                    <SearchOutlined />
                    <BellOutlined />
                    <div className="info-user">
                        <Dropdown menu={{ items: itemsuser }}>
                            <Space>
                                <img src="#" alt="avatar" />
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NarbarHome;
