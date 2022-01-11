import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { URI } from '../../Helper';
import '../../assets/css/Instructor.scss'
import Swal from 'sweetalert2'
import axios from 'axios';

const Option = Select;

const AddGroup = () => {
    const [group, setGroup] = useState({});
    const [students, setStudents] = useState([]);
    const [groupStudents, setGroupStudents] = useState([]);

    const instructor_id = JSON.parse(localStorage.getItem('instructor')).id;

    function handleGroupStudents(e) {
        setGroupStudents(groupStudents => [...groupStudents, e])
    }

    useEffect(() => {
        axios.get(URI + `getStudents?supervisor_id=${instructor_id}`)
            .then(resp => {
                setStudents(resp.data.response.detail);
            });
    }, [])

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instructor_id: JSON.parse(localStorage.getItem('instructor')).id,
                project_name: values.project_name,
                jury_name: values.jury_name,
                student_id: values.student_id
            })
        };
        fetch(URI + 'createGroup', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Group Created Successfully',
                        icon: 'success'
                    })
                    setGroup({})
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

    function handleUser(name, value) {
        setGroup({ ...group, [name]: value })
    }

    function handleStudents(e) {
        setGroup({ ...group, ['student_id']: e })
    }

    return (
        <div className="add-group-page">
            <h5>Add Group</h5>
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
                    name="project_name"
                    rules={[{ required: true, message: 'Please input Project Name!' }]}
                >
                    <Input onChange={(e) => handleUser('project_name', e.target.value)} value={group.jury_name} />
                </Form.Item>

                {/* <Form.Item
                    label="Jury Name"
                    name="jury_name"
                >
                    <Input onChange={(e) => handleUser('jury_name', e.target.value)} value={group.jury_name} />
                </Form.Item> */}

                <Form.Item
                    label="Student Roll No"
                    name="student_id"
                >
                    <Select
                        className='w-100'
                        name='student_id'
                        mode="multiple"
                        placeholder='Select Students'
                        onSelect={(e) => handleGroupStudents(e)}
                    >
                        {
                            students.length > 0 &&
                            students.map((student) => {
                                console.log(student)
                                return (
                                    <Option value={student.id} key={student.id}>
                                        {student.roll_no}
                                    </Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                {/* <Form.Item
                    label="Student1 Roll No."
                    name="student1_name"
                    rules={[{ required: true, message: "Please input Student's Roll No.!" }]}
                >
                    <Input onChange={(e) => handleUser('student1_name', e.target.value)} value={group.student1_name} />
                </Form.Item>

                <Form.Item
                    label="Student2 Roll No."
                    name="student2_name"
                    rules={[{ required: true, message: "Please input Student's Roll No.!" }]}
                >
                    <Input onChange={(e) => handleUser('student2_name', e.target.value)} value={group.student2_name} />
                </Form.Item>

                <Form.Item
                    label="Student3 Roll No."
                    name="student3_name"
                    rules={[{ required: true, message: "Please input Student's Roll No.!" }]}
                >
                    <Input onChange={(e) => handleUser('student3_name', e.target.value)} value={group.student3_name} />
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 3, span: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddGroup
