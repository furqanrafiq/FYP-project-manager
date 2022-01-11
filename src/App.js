import React, { useEffect, useState } from 'react'
import './App.css';
import 'antd/dist/antd.css';
import { Router, Route, Routes } from "react-router-dom";
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import Navbar from './components/Navbar';
import InstructorLogin from './views/InstructorLogin';
import DashboardHome from './views/DashboardHome';
import Dashboard from './components/Dashboard';
import AddGroup from './views/Instructor/AddGroup';
import AddTask from './views/Instructor/AddTask';
import UpdateGroup from './views/Instructor/UpdateGroup';
import AllGroups from './views/Instructor/AllGroups';
import AddStudent from './views/Admin/AddStudent';
import StudentDashboard from './views/Student/StudentDashboard';
import Videocomp from './views/Student/Videocomp';
import ViewTasks from './views/Student/ViewTasks';
import AddTaskMarks from './views/Instructor/AddTaskMarks';
import AddTaskRemarks from './views/Instructor/AddTaskRemarks';
import AdminLogin from './views/AdminLogin';
import AdminDashboard from './views/Admin/AdminDashboard';
import StudentDashboardHome from './views/Student/StudentDashboardHome';
import ViewGroups from './views/Admin/ViewGroups';
import AddInstructor from './views/Admin/AddInstructor';
import AddJury from './views/Admin/AddJury';
import AdminDashboardHome from './views/Admin/AdminDashboardHome';
import SubmitTask from './views/Student/SubmitTask';
import DistributeMarks from './views/Admin/DistributeMarks';
import AssignJury from './views/Admin/AssignJury';
import AssignJuryByGroup from './views/Admin/AssignJuryByGroup';
import JuryLogin from './views/JuryLogin';
import JuryDashboard from './views/Jury/JuryDashboard';
import JuryDashboardHome from './views/Jury/JuryDashboardHome';
import Mid1 from './views/Jury/Mid1';
import Mid2 from './views/Jury/Mid2';
import Final from './views/Jury/Final';
import Groupcall from './views/Student/Groupcall';
import JoinRoom from './views/Student/pages/join';
import Video from './views/Student/pages/meeting';
import Chatroom from './views/Student/Chatroom';
import Room from './views/Student/Room';
import CreateRoom from './views/Student/Groupcall';
import AddTicket from './views/AddTicket'
import ViewAllTickets from './views/ViewAllTickets'
import ViewMarks from './views/Student/ViewMarks';
import MidMarks from './views/Instructor/MidMarks';
import FinalMarks from './views/Instructor/FinalMarks';

function App() {
  const [instructorAuthenticated, setIsInstructorAuthenticated] = useState();
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState();
  const [isjuryLoggedIn, setIsjuryLoggedIn] = useState();

  useEffect(() => {
    if (localStorage.getItem('instructor') && JSON.parse(localStorage.getItem('instructor')).isAuthenticated == true) {
      setIsInstructorAuthenticated(true)
    }
  }, [localStorage, instructorAuthenticated])

  useEffect(() => {
    if (localStorage.getItem('student') && JSON.parse(localStorage.getItem('student')).isAuthenticated == true) {
      setIsStudentLoggedIn(true)
    }
  }, [localStorage, isStudentLoggedIn])

  useEffect(() => {
    if (localStorage.getItem('admin') && JSON.parse(localStorage.getItem('admin')).isAuthenticated == true) {
      setIsAdminLoggedIn(true)
    }
  }, [localStorage, isAdminLoggedIn])

  useEffect(() => {
    if (localStorage.getItem('jury') && JSON.parse(localStorage.getItem('jury')).isAuthenticated == true) {
      setIsjuryLoggedIn(true)
    }
  }, [localStorage, isjuryLoggedIn])

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        {/* <Route path='/' element={<LoginPage />} /> */}
        <Route path='/' element={<InstructorLogin />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/student-login' element={<LoginPage />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/jury-login' element={<JuryLogin />} />
        {
          instructorAuthenticated &&
          <Route path="/dashboard" element={<Dashboard />}>
           <Route exact path="dashboard" element={<DashboardHome />} />
            <Route exact path="add-group" element={<AddGroup />} />
            <Route exact path="update-group" element={<UpdateGroup />} />
            <Route exact path="all-groups" element={<AllGroups />} />
            <Route exact path="add-tasks-marks" element={<AddTaskMarks />} />
            <Route exact path="add-tasks-remarks" element={<AddTaskRemarks />} />
            <Route exact path="add-student" element={<AddStudent />} />
            <Route exact path="mid-evaluation-marks" element={<MidMarks />} />
            <Route exact path="final-evaluation-marks" element={<FinalMarks />} />
            <Route exact path="add-ticket" element={<AddTicket />} />
            <Route path="video-call" element={<Videocomp />} />
            <Route path="group-call" element={<Groupcall />} />
            <Route path="join" element={<JoinRoom />} />
            <Route exact path="video/:id" element={<Video />} />
            <Route path="chat-room" element={<Chatroom />} />
          </Route>
        }
        {
          isStudentLoggedIn &&
          <Route path="/student-dashboard" element={<StudentDashboard />}>
            <Route exact path="student-dashboard" element={<StudentDashboardHome />} />
            <Route exact path="view-tasks" element={<ViewTasks />} />
            <Route exact path="view-marks" element={<ViewMarks />} />
            <Route exact path="submit-task/:taskId" element={<SubmitTask />} />
            <Route exact path="update-group" element={<UpdateGroup />} />
            <Route exact path="all-groups" element={<AllGroups />} />
            <Route exact path="add-ticket" element={<AddTicket />} />
            <Route path="video-call" element={<Videocomp />} />
            <Route path="create-room" element={<CreateRoom />} />
            <Route path="join" element={<JoinRoom />} />
             {/* <Route path="room/1" element={<Room />} /> */}
            <Route path="chat-room" element={<Chatroom />}  /> 
            {/* <Route path="" exact component={CreateRoom} /> */}
            <Route path="room/:roomID" component={Room} />
          </Route>
        }
        {
          isAdminLoggedIn &&
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route exact path="admin-dashboard" element={<AdminDashboardHome />} />
            <Route exact path="view-groups" element={<ViewGroups />} />
            <Route exact path="add-student" element={<AddStudent />} />
            <Route exact path="add-instructor" element={<AddInstructor />} />
            <Route exact path="add-tasks" element={<AddTask />} />
            <Route exact path="add-jury" element={<AddJury />} />
            <Route exact path="view-tickets" element={<ViewAllTickets />} />
            <Route exact path="distribute-marks" element={<DistributeMarks />} />
            <Route exact path="assign" element={<AssignJury />} />
            <Route exact path="assign-jury/:groupId" element={<AssignJuryByGroup />} />
            <Route path="video-call" element={<Videocomp />} />
            <Route path="group-call" element={<Groupcall />} />
            <Route path="join" element={<JoinRoom />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="chat-room" element={<Chatroom />} />
          </Route>
        }
        {
          isjuryLoggedIn &&
          <Route path="/jury-dashboard" element={<JuryDashboard />}>
            <Route exact path="jury-dashboard" element={<JuryDashboardHome />} />
            <Route exact path="mid-marks" element={<Mid1 />} />
            <Route exact path="final-marks" element={<Final />} />
            <Route exact path="add-ticket" element={<AddTicket />} />
            <Route path="video-call" element={<Videocomp />} />
            <Route path="group-call" element={<Groupcall />} />
            <Route path="join" element={<JoinRoom />} />
            <Route path="video/:id" element={<Video />} />
            <Route path="chat-room" element={<Chatroom />} />
          </Route>
        }
      </Routes>
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
