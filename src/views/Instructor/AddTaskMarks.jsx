import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Row } from 'antd';
import { URI } from '../../Helper';
import '../../assets/css/Instructor.scss'
import Swal from 'sweetalert2'
import axios from 'axios';
import moment from 'moment'
const Option = Select;


const AddTaskMarks = () => {
    const [task, setTask] = useState({});
    const [groups, setGroups] = useState([])
    const [tasks, setTasks] = useState([]);
    const [student, setStudent] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [studentId, setStudentId] = useState('');
    const instructor_id = JSON.parse(localStorage.getItem('instructor')).id;

    useEffect(() => {
        setStudentId(student.student_id)
        setTotalMarks(student.total_marks)
    }, [student])

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task_id: values.task_id,
                marks: values.marks
            })
        };
        fetch(URI + 'updateMarks', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Task updated Successfully',
                        icon: 'success'
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: "Error",
                        icon: 'error'
                    })
                }
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleTask(name, value) {
        setTask({ ...task, [name]: value })
    }

    function handleDate(date, dateString) {
        setTask({ ...task, ['deadline_date']: dateString })
    }

    function getTaskStudent(taskId) {
        axios.get(URI + `getTaskStudent?task_id=${taskId}`)
            .then(resp => {
                console.log(resp.data.response.detail[0])
                setStudent(resp.data.response.detail[0]);
            });
    }

    function getTasks(groupId) {
        axios.get(URI + `getGroupTasks?group_id=${groupId}`)
            .then(resp => {
                setTasks(resp.data.response.detail);
            });
    }

    useEffect(() => {
        axios.get(URI + `getGroups?instructor_id=${instructor_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }, [])

    return (
        <div className="add-task-page">
            <h5>Add Task Marks</h5>
            <Form
                name="signup"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 6 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Project Name"
                    name="group_id"
                    rules={[{ required: true, message: 'Please select Project Name!' }]}
                >
                    <Select
                        className='w-100'
                        name='project_name'
                        placeholder='Select Project'
                        onSelect={(e) => getTasks(e)}
                    >
                        {
                            groups.length > 0 &&
                            groups.map((group) => {
                                return (
                                    <Option value={group.id} key={group.id}>
                                        {group.project_name}
                                    </Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Select Task"
                    name="task_id"
                    rules={[{ required: true, message: "Please select a student!" }]}
                >
                    <Select
                        className='w-100'
                        name='task_id'
                        placeholder='Select Task'
                        onSelect={e => { handleTask('task_id', e); getTaskStudent(e) }}
                    >
                        {
                            tasks.length > 0 &&
                            tasks.map((task) => {
                                return (
                                    <Option value={task.id} key={task.id}>
                                        {task.task_name}
                                    </Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Student Name"
                >
                    <Input placeholder="Student Name" value={studentId} disabled />
                </Form.Item>

                <Form.Item
                    label="Marks"
                    name="marks"
                    rules={[{ required: true, message: 'Please enter Marks!' }]}
                >
                    <Input placeholder="Marks" onChange={(e) => handleTask('marks', e)} />
                </Form.Item>
                <Form.Item
                    label="Total Marks"
                >
                    <Input placeholder="Total Marks" value={totalMarks} disabled />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 3, span: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddTaskMarks
