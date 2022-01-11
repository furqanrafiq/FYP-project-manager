import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { URI } from '../../Helper';
import '../../assets/css/Instructor.scss'
import Swal from 'sweetalert2'

const AddStudent = () => {
    const [user, setUser] = useState({});

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // supervisor_id: JSON.parse(localStorage.getItem('instructor')).id,
                roll_no: values.roll_no,
                password: values.password,
            })
        };
        fetch(URI + 'addStudent', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Student Created Successfully',
                        icon: 'success'
                    })
                    setUser({})
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
        setUser({ ...user, [name]: value })
    }
    return (
        <div>
            <h5>Add student</h5>
            <Form
                name="signup"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Student Roll Number"
                    name="roll_no"
                    rules={[{ required: true, message: 'Please input Student Roll Number!' }]}
                >
                    <Input onChange={(e) => handleUser('roll_no', e.target.value)} value={user?.roll_no} />
                </Form.Item>

                <Form.Item
                    label="Student Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input Student Password!' }]}
                >
                    <Input.Password onChange={(e) => handleUser('password', e.target.value)} value={user?.password} />
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

export default AddStudent
