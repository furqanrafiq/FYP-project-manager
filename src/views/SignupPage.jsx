import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import '../assets/css/SignupPage.scss'
import { URI } from '../Helper';
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom';

const SignupPage = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const onFinish = (values) => {
        if (values.password == values.confirm_password) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            };
            fetch(URI + 'register-instructor', requestOptions)
                .then(response => {
                    if (response.status == 200) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Instructor Registered',
                            icon: 'success'
                        })
                        navigate("/");
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: "Error",
                            icon: 'error'
                        })
                    }
                })
        } else {
            Swal.fire({
                title: 'Error',
                text: "Passwords don't match",
                icon: 'error'
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleUser(name, value) {
        setUser({ ...user, [name]: value })
    }

    return (
        <div className="signup-page">
            <Row style={{ justifyContent: 'space-between' }}>
                <Col md={10}>
                    <div className="signup-left"></div>
                    <div className="signup-text">
                        <h2>Welcome to FYP Manager</h2>
                    </div>
                </Col>
                <Col md={14} style={{ textAlign: 'center', display: 'grid', alignItems: 'center' }}>
                    <div>
                        <h2>Sign Up</h2>
                        <Form
                            name="signup"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your Name!' }]}
                            >
                                <Input onChange={(e) => handleUser('name', e.target.value)} value={user.name} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your Number!' }]}
                            >
                                <Input onChange={(e) => handleUser('email', e.target.value)} value={user.email} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={(e) => handleUser('password', e.target.value)} value={user.password} />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirm_password"
                                rules={[{ required: true, message: 'Please confirm your password!' }]}
                            >
                                <Input.Password onChange={(e) => handleUser('confirm_password', e.target.value)} value={user.confirm_password} />
                            </Form.Item>
                                <div>
                                    <Link to="/">Login as instructor</Link>
                                </div>

                            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default SignupPage
