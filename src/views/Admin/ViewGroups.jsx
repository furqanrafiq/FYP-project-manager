import { Select, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const Option = Select;

const ViewGroups = () => {
    const [groups, setGroups] = useState([]);
    const [instructors, setInstructors] = useState([])
    const [instructor, setInstructor] = useState('')

    useEffect(() => {
        getInstructors();
    }, []);

    function getInstructors() {
        return axios.get(URI + 'get-all-instructors')
            .then(response => {
                setInstructors(response.data.response.detail)
            })
    }

    function getGroups(instructor_id) {
        return axios.get(URI + `getGroups?instructor_id=${instructor_id}`)
            .then(resp => {
                setGroups(resp.data.response.detail);
            });
    }
    return (
        <div>
            <h5>View Groups</h5>
            <Select
                className='w-25'
                name='instructor_id'
                loading={instructors.length == 0}
                placeholder='Select Instructor'
                onChange={e => { getGroups(e); setInstructor(e) }}
            >
                {
                    instructors.length > 0 &&
                    instructors.map((instructor) => {
                        return (
                            <Option value={instructor.id} key={instructor.id}>
                                {instructor.name}
                            </Option>
                        );
                    })}
            </Select>
            {
                instructor != '' ?
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        groups.map((group, index) => {
                                            console.log(group)
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
                        </>
                    :
                    ''
            }
        </div>
    )
}

export default ViewGroups
