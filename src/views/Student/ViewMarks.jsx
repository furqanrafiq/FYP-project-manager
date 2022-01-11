import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const ViewMarks = () => {
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
            <h5>View Marks</h5>
            <table class="table table-bordered table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Instructor Mid Marks</th>
                        <th scope="col">Instructor Final Marks</th>
                        <th scope="col">Jury Mid Marks</th>
                        <th scope="col">Jury Final Marks</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groupMarks?.map((group, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{group.mid_instructor_marks == null ? '-' : group.mid_instructor_marks}</td>
                                    <td>{group.final_instructor_marks == null ? '-' : group.final_instructor_marks}</td>
                                    <td>{group.mid_jury_marks == null ? '-' : group.mid_jury_marks}</td>
                                    <td>{group.final_jury_marks == null ? '-' : group.final_jury_marks}</td>
                                    <td>{(group.mid_instructor_marks != null ? group.mid_instructor_marks : 0) + (group.final_instructor_marks != null ? group.final_instructor_marks : 0) + (group.mid_jury_marks != null ? group.mid_jury_marks : 0) + (group.final_jury_marks != null ? group.final_jury_marks : 0)} / 100</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewMarks
