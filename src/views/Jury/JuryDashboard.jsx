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
import JuryDashboardHome from './JuryDashboardHome';
import Mid1 from './Mid1';
import Mid2 from './Mid2';
import Final from './Final';
import Videocomp from './Videocomp';
import Groupcall from './Groupcall';
import JoinRoom from './pages/join';
import Video from './pages/meeting';
import Chatroom from './Chatroom';
import AddTicket from '../AddTicket';
// import ViewGroups from './ViewGroups';
// import DashboardHome from '../DashboardHome';
// import AddStudent from './AddStudent';
// import AddInstructor from '../Admin/AddInstructor';
// import AddJury from './AddJury';
// import AdminDashboardHome from './AdminDashboardHome';
// import DistributeMarks from './DistributeMarks';
// import AssignJury from './AssignJury';
// import AssignJuryByGroup from './AssignJuryByGroup';
// import DashboardHome from '../views/DashboardHome'
// import AddTask from '../views/Instructor/AddTask';
// import UpdateGroup from '../views/Instructor/UpdateGroup';
// import AllGroups from '../views/Instructor/AllGroups';
// import AddStudent from '../views/Instructor/AddStudent';

const { Header, Sider, Content } = Layout;

const JuryDashboard = () => {
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
                    <Menu.Item key="/jury-dashboard" icon={<UserOutlined />}>
                            <NavLink to="/jury-dashboard">
                                Home
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/jury-dashboard/mid-marks" icon={<UserOutlined />}>
                            <NavLink to="/jury-dashboard/mid-marks">
                                Mid1 Marks
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/jury-dashboard/final-marks" icon={<UserOutlined />}>
                            <NavLink to="/jury-dashboard/final-marks">
                                Final Marks
                            </NavLink>
                        </Menu.Item>                        
                        <Menu.Item key="/jury-dashboard/add-ticket" icon={<UsergroupAddOutlined />}>
                            <NavLink to="add-ticket">
                                Create A Ticket
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/jury-dashboard/video-call" icon={<UsergroupAddOutlined />}>
                            <NavLink to="video-call">
                                One on One Video call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/jury-dashboard/group-call" icon={<UsergroupAddOutlined />}>
                            <NavLink to="group-call">
                                Group call
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/jury-dashboard/chat-room" icon={<UsergroupAddOutlined />}>
                            <NavLink to="chat-room">
                                Chatroom.
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
                            overflowY:'scroll'
                        }}
                    >
                        <Routes>
                        <Route path="/" element={<JuryDashboardHome />} />
                            <Route path="mid-marks" element={<Mid1 />} />
                            <Route path="mid2-marks" element={<Mid2 />} />
                            <Route path="final-marks" element={<Final />} />
                            <Route path="add-ticket" element={<AddTicket />} />
                            <Route path="video-call" element={<Videocomp />} />
                            <Route path="group-call" element={<Groupcall />} />
                            <Route path="join" element={<JoinRoom />} />
                            <Route path="video/:id" element={<Video />} />
                            <Route path="chat-room" element={<Chatroom />} />
                            {/* <Route path="view-groups" element={<ViewGroups />} />
                            <Route path="add-student" element={<AddStudent />} />
                            <Route path="add-instructor" element={<AddInstructor />} />
                            <Route path="add-jury" element={<AddJury />} />
                            <Route path="distribute-marks" element={<DistributeMarks />} />
                            <Route exact path="assign" element={<AssignJury />} />
                            <Route exact path="assign-jury/:groupId" element={<AssignJuryByGroup />} /> */}
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default JuryDashboard
