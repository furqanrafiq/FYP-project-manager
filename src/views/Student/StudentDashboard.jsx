import React, { useEffect, useState } from 'react'
import TopNav from '../../components/TopNav'
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
import StudentDashboardHome from './StudentDashboardHome';
import ViewTasks from './ViewTasks';
import SubmitTask from './SubmitTask';
import Videocomp from './Videocomp';
import CreateRoom from './Groupcall';
import JoinRoom from './pages/join';
import Video from './pages/meeting';
import Chatroom from './Chatroom';
import Room from './Room';
// import DashboardHome from '../views/DashboardHome'
// import AddTask from '../views/Instructor/AddTask';
// import UpdateGroup from '../views/Instructor/UpdateGroup';
// import AllGroups from '../views/Instructor/AllGroups';
// import AddStudent from '../views/Instructor/AddStudent';

const { Header, Sider, Content } = Layout;

const StudentDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

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
                        <Menu.Item key="/student-dashboard" icon={<UserOutlined />}>
                            <NavLink to="">
                                Home
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/student-dashboard/view-tasks" icon={<UsergroupAddOutlined />}>
                            <NavLink to="view-tasks">
                                View Tasks
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/student-dashboard/video-call" icon={<UsergroupAddOutlined />}>
                            <NavLink to="video-call">
                                One on One Video call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/student-dashboard/create-room" icon={<UsergroupAddOutlined />}>
                            <NavLink to="create-room">
                                Group call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/student-dashboard/chat-room" icon={<UsergroupAddOutlined />}>
                            <NavLink to="chat-room">
                                Chatroom
                            </NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="/student-dashboard/update-group" icon={<EditOutlined />}>
                            <NavLink to="update-group">
                                Schedule
                            </NavLink>
                        </Menu.Item> */}
                        {/* <Menu.Item key="/dashboard/all-groups" icon={<UsergroupAddOutlined />}>
                            <NavLink to="all-groups">
                                Your Groups
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/add-tasks" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-tasks">
                                Add Task
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/add-student" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-student">
                                Add Student
                            </NavLink>
                        </Menu.Item> */}
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
                            <Route path="/" element={<StudentDashboardHome />} />
                            <Route path="view-tasks" element={<ViewTasks />} />
                            <Route path="submit-task/:taskId" element={<SubmitTask />} />
                            <Route path="video-call" element={<Videocomp />} />
                            <Route path="create-room" element={<CreateRoom />} />
                            <Route path="join" element={<JoinRoom />} />
                            <Route path="video/:id" element={<Video />} />
                            <Route path="chat-room" element={<Chatroom />}  />
                            {/* 
                            <Route path="room/1" element={<Room />} /> */}
                            {/* <Route path="/" exact component={CreateRoom} /> */}
                            <Route path="room/:roomID" component={Room} />
                            {/* <Route path="update-group" element={<UpdateGroup />} />
                            <Route path="all-groups" element={<AllGroups />} />
                            <Route path="add-tasks" element={<AddTask />} />
                            <Route path="add-student" element={<AddStudent />} /> */}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default StudentDashboard
