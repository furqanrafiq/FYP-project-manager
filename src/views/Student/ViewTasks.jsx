import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const ViewTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [groupMarks, setGroupMarks] = useState()

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        return axios.get(URI + 'get-group-marks', {
            params: {
                id: JSON.parse(localStorage.getItem('student')).id
            }
        }).then(response => {
            setGroupMarks(response.data.response.detail)
        })
    }, [])

    function getTasks() {
        return axios.get(URI + 'getStudentTasks', {
            params: {
                student_id: JSON.parse(localStorage.getItem('student')).id
            }
        }).then(response => {
            setTasks(response.data.response.detail)
        })
    }

    return (
        <div>
            <h5>View Tasks</h5>
            {
                tasks == [] ?
                    <Spin indicator={antIcon} /> :
                    <table class="table table-bordered table-hover table-responsive-sm">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Task Name</th>
                                <th scope="col">Marks</th>
                                <th scope="col">Remarks</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.task_name}</td>
                                            <td>{(task.marks == null ? '-' : task.marks) + '/' + task.total_marks}</td>
                                            <td>{task.remarks}</td>
                                            {
                                                task.status == 'pending' ?
                                                    <td style={{ color: 'red', fontWeight: '500' }}>{task.status}</td>
                                                    :
                                                    <td>{task.status}</td>
                                            }
                                            <td>
                                                {
                                                    task.status == 'pending' ?
                                                        <Link to={`/student-dashboard/submit-task/${task.id}`}>
                                                            Submit
                                                        </Link> :
                                                        '-'
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default ViewTasks
