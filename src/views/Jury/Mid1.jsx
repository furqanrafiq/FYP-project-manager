import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { Form, Select, Input, Button, DatePicker } from 'antd'
import Swal from 'sweetalert2';

const { Option } = Select;

const Mid1 = () => {
    const [groups, setGroups] = useState([])
    const jury_id = JSON.parse(localStorage.getItem('jury')).id;
    const [marksError, setMarksError] = useState(false);

    useEffect(() => {
        getGroups()
    }, [])

    function getGroups() {
        axios.get(URI + `get-jury-groups?jury_id=${jury_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }

    function onFinish(values) {
        if (values.marks > 10) {
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
            fetch(URI + 'add-jury-mid-marks', requestOptions)
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
    
    return (
        <div className="mid1-marks">
            <h5>Add Mid1 marks</h5>
            <Form
                name="signup"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 6 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
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
                    label="Total Marks"
                    name="marks"
                    rules={[{ required: true, message: 'Please enter Total Marks!' }]}
                >
                    <Input placeholder="Marks"
                    //  onChange={(e) => handleTask('total_marks', e)} 
                    />
                </Form.Item>
                {
                    marksError == true &&
                    <p style={{color:'red'}}>Marks should be less than total marks</p>
                }
                
                <Form.Item
                    label="Max Marks"
                    name="max_marks"
                >
                    <Input placeholder="Marks" disabled defaultValue={10} />

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

export default Mid1
