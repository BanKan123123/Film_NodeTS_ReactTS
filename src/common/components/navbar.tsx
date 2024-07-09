import { AppstoreOutlined, HomeOutlined, QqOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { GetCategories } from '../../services/category.services';
import Category from '../../components/admin/categories/categories.interface';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    const [current, setCurrent] = useState('home');

    const categories: Category[] = GetCategories();

    const childrenCategories = categories.map((category: Category) => ({
        label: <Link to={`http://localhost:3000/home/film/${category.slug}`}>{category.name}</Link>,
        key: category.id
    }));

    const items: MenuItem[] = [
        {
            label: "",
            key: "logo",
            icon: <QqOutlined />
        },
        {
            label: 'Home',
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: 'Categories',
            key: 'category',
            icon: <UnorderedListOutlined />,
            children: childrenCategories
        },
        {
            label: 'Navigation Two',
            key: 'app',
            icon: <AppstoreOutlined />
        }
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <section>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </section>
        </>
    );
};

export default Navbar;
