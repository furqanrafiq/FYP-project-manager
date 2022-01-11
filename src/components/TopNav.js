import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';



const TopNav = () => {
    const [userName,setUserName] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('instructor')){
            setUserName(JSON.parse(localStorage.getItem('instructor'))?.name)
        }else if(localStorage.getItem('student')){
            setUserName(JSON.parse(localStorage.getItem('student'))?.name + '-' + JSON.parse(localStorage.getItem('student'))?.roll_no)
        }else if(localStorage.getItem('admin')){
            setUserName('Admin')
        }else if(localStorage.getItem('jury')){
            setUserName(JSON.parse(localStorage.getItem('jury'))?.jury_name)
        }
    },[userName])

    function logout() {
        localStorage.removeItem('instructor')
        navigate('/')
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <p onClick={() => logout()}>
                    Logout
                </p>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="top-nav d-flex align-items-center justify-content-between pl-2 pr-2" style={{background:'#355c7d'}}>
            <h2>
                <Link to="/dashboard" style={{ color: 'white' }}>
                    FYP Manager
                </Link>
            </h2>
            <Dropdown overlay={menu}>
                <h6 className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ cursor: 'pointer',color:'white' }}>
                    Hello , {userName} <DownOutlined />
                </h6>
            </Dropdown>
        </div>
    )
}

export default TopNav
