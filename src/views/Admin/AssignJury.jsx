import { Select, Spin, Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const Option = Select;

const AssignJury = () => {
    const [groups, setGroups] = useState([]);
    const [juries, setJuries] = useState([]);

    useEffect(() => {
        getGroups()
        getJuries()
    }, [])

    function getJuries() {
        return axios.get(URI + `get-all-juries`)
            .then(resp => {
                setJuries(resp.data.response.detail);
            });
    }

    function getGroups() {
        return axios.get(URI + `get-all-groups`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }

    return (
        <div>
            <h5>View Groups</h5>
            {
                groups == [] ?
                    <div>
                        <Spin indicator={antIcon} />
                    </div> :
                    <>
                        <p>Total Groups : {groups.length}</p>
                        <table class="table table-bordered table-hover table-responsive-sm">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Project Name</th>
                                    <th scope="col">Jury Name</th>
                                    <th scope="col">Students</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    groups.map((group, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{group.project_name}</td>
                                                <td>{group.jury_name != null ? group.jury_name : '-'}</td>
                                                <td>
                                                    {
                                                        group.groupDetails.map(gr => {
                                                            return (
                                                                <p>
                                                                    {gr.student_id}
                                                                </p>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        group.jury_name == null ?
                                                            <Link to={`/admin-dashboard/assign-jury/${group.id}`}>
                                                                Assign jury
                                                            </Link>
                                                            : '-'
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
            }
        </div>
    )
}

export default AssignJury
