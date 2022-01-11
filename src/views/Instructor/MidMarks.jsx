import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { URI } from '../../Helper';

const { Option } = Select;

const MidMarks = () => {
    const [groups, setGroups] = useState([])
    const instructor_id = JSON.parse(localStorage.getItem('instructor'))?.id;
    const [marksError, setMarksError] = useState(false);

    useEffect(() => {
        axios.get(URI + `getGroups?instructor_id=${instructor_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }, [])

    function onFinish(values) {
        if (values.marks > 20) {
            setMarksError(true)
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    group_id: values.group_id,
                    marks: values.marks
                })
            };
            fetch(URI + 'add-instructor-mid-marks', requestOptions)
                .then(response => {
                    if (response.status == 200) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Marks updated Successfully',
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
    }

    // function handleChange(name,value){
    //     set
    // }

    return (
        <div className="mid1-marks">
            <h5>Add Mid Evaluation marks</h5>
            <Form
                name="signup"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 6 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Group Name"
                    name="group_id"
                    rules={[{ required: true, message: 'Please select group Name!' }]}
                >
                    <Select
                        className='w-100'
                        name='project_name'
                        placeholder='Select Group'
                    // onChange={(e) => handleChange('group_id',e)}
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
                    label="Marks"
                    name="marks"
                    rules={[{ required: true, message: 'Please enter Total Marks!' }]}
                >
                    <Input placeholder="Marks"
                    //  onChange={(e) => handleChange('marks',e.target.value)}
                    //  onChange={(e) => handleTask('total_marks', e)} 
                    />

                </Form.Item>
                {
                    marksError == true &&
                    <p style={{ color: 'red' }}>Marks should be less than total marks</p>
                }
                <Form.Item
                    label="Max Marks"
                    name="max_marks"
                >
                    <Input placeholder="Marks" disabled defaultValue={20} />

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

export default MidMarks
