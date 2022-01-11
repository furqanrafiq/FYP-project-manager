import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { Form, Select, Input, Button, DatePicker } from 'antd'

const { Option } = Select;

const Mid2 = () => {
    const [groups, setGroups] = useState([])
    const jury_id = JSON.parse(localStorage.getItem('jury')).id;

    useEffect(() => {
        getGroups()
    }, [])

    function getGroups() {
        axios.get(URI + `get-jury-groups?jury_id=${jury_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }
    return (
        <div className="Mid2-marks">
            <h5>Add Mid2 marks</h5>
            <Form
                name="signup"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 6 }}
                // onFinish={onFinish}
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
                    name="total_marks"
                    rules={[{ required: true, message: 'Please enter Total Marks!' }]}
                >
                    <Input placeholder="Marks"
                    //  onChange={(e) => handleTask('total_marks', e)} 
                    />
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

export default Mid2
