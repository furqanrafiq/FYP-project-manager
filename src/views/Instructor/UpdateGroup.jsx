import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { URI } from '../../Helper';
import '../../assets/css/Instructor.scss'
import Swal from 'sweetalert2'
import axios from 'axios';
const Option = Select;

const UpdateGroup = () => {
    const [group, setGroup] = useState({});
    const [groups, setGroups] = useState([]);
    const instructor_id = JSON.parse(localStorage.getItem('instructor')).id;

    const onFinish = (values) => {
        console.log(values)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                project_id: values.project_id,
                jury_name: values.jury_name,
            })
        };
        fetch(URI + 'updateGroup', requestOptions)
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Group Updated Successfully',
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

    useEffect(() => {
        axios.get(URI + `getGroups?instructor_id=${instructor_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }, [])


    return (
        <div className="update-group-page">
            <h5>Update Group</h5>
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
                    name="project_id"
                >
                    <Select
                        className='w-100'
                        name='project_name'
                        placeholder='Select Project'
                        value={group.project_name}
                        onSelect={(e) => handleUser("project_id", e)}
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
                    label="Jury Name"
                    name="jury_name"
                >
                    <Input onChange={(e) => handleUser('jury_name', e.target.value)} value={group.jury_name} />
                </Form.Item>

                {/* <Form.Item
                    label="Student1 Name"
                    name="student1_name"
                >
                    <Input onChange={(e) => handleUser('student1_name', e.target.value)} value={group.student1_name} />
                </Form.Item>

                <Form.Item
                    label="Student2 Name"
                    name="student2_name"
                >
                    <Input onChange={(e) => handleUser('student2_name', e.target.value)} value={group.student2_name} />
                </Form.Item>

                <Form.Item
                    label="Student3 Name"
                    name="student3_name"
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

export default UpdateGroup
