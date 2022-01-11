import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { URI } from '../Helper';
import Swal from 'sweetalert2';

const AddTicket = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: values.title,
                description: values.description,
                created_by: 'Student',
                user_id: JSON.parse(localStorage.getItem('student'))?.id
            })
        };
        fetch(URI + 'add-ticket', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Ticket Created Successfully',
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
    };

    const onFinishFailed = () => {
        console.log('Failed:');
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 6 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input ticket title!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input ticket description!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddTicket
