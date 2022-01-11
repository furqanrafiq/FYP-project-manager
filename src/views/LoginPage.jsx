import { Col, Row } from 'antd'
import React from 'react'
import loginPicture from '../assets/loginpage.jpg';
import { Form, Input, Button, Checkbox } from 'antd';
import '../assets/css/Loginpage.scss'
import { URI } from '../Helper';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roll_no: values.roll_no,
                password: values.password
            })
        };
        fetch(URI + 'login-student', requestOptions)
            .then((response) => response.json())
            .then(res => {
                var dataToStore = JSON.stringify(res.response.detail);
                localStorage.setItem('student', dataToStore);
                if (res.status == 200) {
                    window.location.href = '/student-dashboard'
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: "Error",
                        icon: 'error'
                    })
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
            <Row style={{ justifyContent: 'space-between' }}>
                <Col md={10}>
                    <div className="login-left"></div>
                    <div className="login-text">
                        <h2>Welcome to FYP Manager</h2>
                    </div>
                </Col>
                <Col md={14} style={{ textAlign: 'center', display: 'grid', alignItems: 'center' }}>
                    <div>
                        <h2>Sign In</h2>
                        <Form
                            name="signin"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Roll Number"
                                name="roll_no"
                                rules={[{ required: true, message: 'Please input your Number!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Enter password"/>
                            </Form.Item>
                                <div>
                                    <Link to="/">Login as supervisor</Link>
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

export default LoginPage
