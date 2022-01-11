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
import ViewGroups from './ViewGroups';
import DashboardHome from '../DashboardHome';
import AddStudent from './AddStudent';
import AddInstructor from './AddInstructor';
import AddJury from './AddJury';
import AdminDashboardHome from './AdminDashboardHome';
import DistributeMarks from './DistributeMarks';
import AssignJury from './AssignJury';
import AssignJuryByGroup from './AssignJuryByGroup';
import Videocomp from './Videocomp';
import Groupcall from './Groupcall';
import JoinRoom from './pages/join';
import Video from './pages/meeting';
import Chatroom from './Chatroom';
import AddTask from '../Instructor/AddTask';
import ViewAllTickets from '../ViewAllTickets';
// import DashboardHome from '../views/DashboardHome'
// import AddTask from '../views/Instructor/AddTask';
// import UpdateGroup from '../views/Instructor/UpdateGroup';
// import AllGroups from '../views/Instructor/AllGroups';
// import AddStudent from '../views/Instructor/AddStudent';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
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
                    <Menu.Item key="/admin-dashboard" icon={<UserOutlined />}>
                            <NavLink to="">
                                Home
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/view-groups" icon={<UsergroupAddOutlined />}>
                            <NavLink to="view-groups">
                                View Instructor Groups
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/assign" icon={<UsergroupAddOutlined />}>
                            <NavLink to="assign">
                                Assign Jury
                            </NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="/admin-dashboard/distribute-marks" icon={<UsergroupAddOutlined />}>
                            <NavLink to="distribute-marks">
                                Distribute Marks
                            </NavLink>
                        </Menu.Item> */}
                        <Menu.Item key="/admin-dashboard/add-student" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-student">
                                Add Student
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/add-instructor" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-instructor">
                                Add Instructor
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/add-jury" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-jury">
                                Add Jury
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/add-tasks" icon={<AppstoreAddOutlined />}>
                            <NavLink to="add-tasks">
                                Add Task
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/view-tickets" icon={<AppstoreAddOutlined />}>
                            <NavLink to="view-tickets">
                                View Tickets
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/video-call" icon={<AppstoreAddOutlined />}>
                            <NavLink to="video-call">
                                One-to-One video call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/group-call" icon={<AppstoreAddOutlined />}>
                            <NavLink to="group-call">
                               Group call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/admin-dashboard/chat-room" icon={<AppstoreAddOutlined />}>
                            <NavLink to="chat-room">
                                Chatroom
                            </NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="/dashboard/update-group" icon={<EditOutlined />}>
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
                        <Route path="/" element={<AdminDashboardHome />} />
                            <Route path="view-groups" element={<ViewGroups />} />
                            <Route path="add-student" element={<AddStudent />} />
                            <Route path="add-instructor" element={<AddInstructor />} />
                            <Route path="add-tasks" element={<AddTask />} />
                            <Route path="add-jury" element={<AddJury />} />
                            <Route path="view-tickets" element={<ViewAllTickets />} />
                            <Route path="distribute-marks" element={<DistributeMarks />} />
                            <Route exact path="assign" element={<AssignJury />} />
                            <Route exact path="assign-jury/:groupId" element={<AssignJuryByGroup />} />
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

export default AdminDashboard
