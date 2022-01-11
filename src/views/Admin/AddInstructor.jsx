import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { URI } from '../../Helper';
import '../../assets/css/Instructor.scss'
import Swal from 'sweetalert2'

const AddInstructor = () => {
    const [user, setUser] = useState({});

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
            })
        };
        fetch(URI + 'register-instructor', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Instructor Created Successfully',
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
            <h5>Add instructor</h5>
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input Instructor's Name!" }]}
                >
                    <Input onChange={(e) => handleUser('name', e.target.value)} value={user?.name} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please input Instructor's Email!" }]}
                >
                    <Input onChange={(e) => handleUser('email', e.target.value)} value={user?.email} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input Instructor's Password!" }]}
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

export default AddInstructor
