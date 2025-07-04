import React, { useState } from 'react';
import {  MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: <Link to={"/"}>Home Page</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to={"/user"}>Users</Link>,
            key: 'user',
            icon: <MailOutlined />,
        },


        {
            label: 'Welcome Wang',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Login</Link>,
                    key: 'login',
                },
                {
                    label: <span onClick={() => {localStorage.clear('accessToken');
                    navigate('/');
                    }}>Đăng xuất</span>,
                    key: 'logout',
                }

            ],
        },
    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;