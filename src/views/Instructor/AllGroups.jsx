import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios';
import { URI } from '../../Helper';

const AllGroups = () => {
    const [groups, setGroups] = useState([])
    const instructor_id = JSON.parse(localStorage.getItem('instructor')).id;

    useEffect(() => {
        axios.get(URI + `getGroups?instructor_id=${instructor_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }, [])

    return (
        <div>
            <h5>All Groups</h5>
            {
                groups.length > 0 &&
                <p>Total Groups : {groups.length}</p>
            }
            <table class="table table-bordered table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Jury Name</th>
                        <th scope="col">Students</th>
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
                                                        {gr.name} - {gr.roll_no}   
                                                    </p>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllGroups
