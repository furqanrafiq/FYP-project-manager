import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UsergroupAddOutlined,
    EditOutlined,
    AppstoreAddOutlined
} from '@ant-design/icons';
import { Router, Route, Routes, Redirect, NavLink, useLocation, useParams } from "react-router-dom";
import AddGroup from '../views/Instructor/AddGroup';
import routes from './Routing';
import DashboardHome from '../views/DashboardHome'
import AddTask from '../views/Instructor/AddTask';
import UpdateGroup from '../views/Instructor/UpdateGroup';
import AllGroups from '../views/Instructor/AllGroups';
import AddStudent from '../views/Admin/AddStudent';
import AddTaskMarks from '../views/Instructor/AddTaskMarks';
import AddTaskRemarks from '../views/Instructor/AddTaskRemarks';
import Videocomp from '../views/Instructor/Videocomp';
import Groupcall from '../views/Instructor/Groupcall';
import JoinRoom from '../views/Instructor/pages/join';
import Video from '../views/Instructor/pages/meeting';
import Chatroom from '../views/Instructor/Chatroom';


const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    console.log(location.pathname)
    function toggle() {
        setCollapsed(!collapsed)
    }

    return (
        <div>
            <TopNav />
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item key="/dashboard" icon={<UserOutlined />}>
                            <NavLink to="">
                                Home
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/add-group" icon={<UsergroupAddOutlined />}>
                            <NavLink to="add-group">
                                Add FYP Group
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/all-groups" icon={<UsergroupAddOutlined />}>
                            <NavLink to="all-groups">
                                Your Groups
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/add-tasks" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-tasks">
                                Add Task
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/add-tasks-marks" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-tasks-marks">
                                Add Task Marks
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/add-tasks-remarks" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-tasks-remarks">
                                Add Task Remarks
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/video-call" icon={<AppstoreAddOutlined />}>
                            <NavLink to="video-call">
                                One-to-One video call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/group-call" icon={<AppstoreAddOutlined />}>
                            <NavLink to="group-call">
                               Group call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/-dashboard/chat-room" icon={<AppstoreAddOutlined />}>
                            <NavLink to="chat-room">
                                Chatroom
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<DashboardHome />} />
                            <Route path="add-group" element={<AddGroup />} />
                            <Route path="update-group" element={<UpdateGroup />} />
                            <Route path="all-groups" element={<AllGroups />} />
                            <Route path="add-tasks" element={<AddTask />} />
                            <Route path="add-tasks-marks" element={<AddTaskMarks />} />
                            <Route path="add-tasks-remarks" element={<AddTaskRemarks />} />
                            <Route path="video-call" element={<Videocomp />} />
                            <Route path="group-call" element={<Groupcall />} />
                            <Route path="join" element={<JoinRoom />} />
                            <Route path="video/:id" element={<Video />} />
                            <Route path="chat-room" element={<Chatroom />}  />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Dashboard
