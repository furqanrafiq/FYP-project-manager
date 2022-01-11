import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import { URI } from '../../Helper';
import '../../assets/css/Instructor.scss'
import Swal from 'sweetalert2'
import axios from 'axios';
import moment from 'moment'
const Option = Select;


const AddTask = () => {
    const [task, setTask] = useState({});
    const [groups, setGroups] = useState([])
    const [students, setStudents] = useState([]);
    const instructor_id = JSON.parse(localStorage.getItem('instructor')).id;

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task_name: values.task_name,
                group_id: values.group_id,
                student_id: values.student_id,
                deadline_date: values.deadline_date._d,
                total_marks:values.total_marks
            })
        };
        fetch(URI + 'createTask', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Group Created Successfully',
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

    function getStudents(groupId) {
        axios.get(URI + `getGroupStudents?group_id=${groupId}`)
            .then(resp => {
                setStudents(resp.data.response.detail);
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
            <h5>Add Task</h5>
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
                        onSelect={(e) => getStudents(e)}
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
                    label="Select Student"
                    name="student_id"
                    rules={[{ required: true, message: "Please select a student!" }]}
                >
                    <Select
                        className='w-100'
                        name='student_id'
                        placeholder='Select Student'
                        onSelect={(e) => handleTask('student_id', e)}
                    >
                        {
                            students.length > 0 &&
                            students.map((student) => {
                                return (
                                    <Option value={student.student_id} key={student.id}>
                                        {student.student_id}
                                    </Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Task Name"
                    name="task_name"
                    rules={[{ required: true, message: 'Please enter Task Name!' }]}
                >
                    <Input placeholder="Enter task name" onChange={(e) => handleTask('task_name', e)} />
                </Form.Item>

                <Form.Item
                    label="Total Marks"
                    name="total_marks"
                    rules={[{ required: true, message: 'Please enter Total Marks!' }]}
                >
                    <Input placeholder="Total Marks" onChange={(e) => handleTask('total_marks', e)} />
                </Form.Item>

                <Form.Item
                    label="Select Deadline"
                    name="deadline_date"
                    rules={[{ required: true, message: 'Please select Deadline for task!' }]}
                >
                    <DatePicker onChange={handleDate} />
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

export default AddTask
