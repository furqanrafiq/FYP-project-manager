import { Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URI } from '../../Helper';
import { Spin, Select, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Option } = Select;

const AssignJuryByGroup = () => {
    const params = useParams();
    const [group, setGroup] = useState({})
    const [data, setData] = useState({
        group_id: params.groupId
    });
    const [juries, setJuries] = useState([])

    useEffect(() => {
        getGroup()
        getJuries()
    }, [])

    function handleData(name, value) {
        setData({ ...data, [name]: value })
    }

    function getJuries() {
        return axios.get(URI + `get-all-juries`)
            .then(resp => {
                setJuries(resp.data.response.detail);
            });
    }

    function getGroup() {
        return axios.get(URI + `get-group-by-id`, {
            params: {
                group_id: params.groupId
            }
        })
            .then(resp => {
                setGroup(resp.data.response.detail[0]);
            });
    }

    function assignJury() {
        if (data?.jury_id != null) {
            return axios.post(URI + `updateGroup`, data).
                then(resp => {
                    if (resp.data.status == 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Success!',
                            text: 'Jury assigned successfully'
                        })
                    }
                })
        }
    }

    return (
        <div>
            {
                group != {} ?
                    <>
                        <h5>Assign Jury</h5>
                        <p style={{ margin: '0px' }}>Project Name:</p>
                        <Input className="w-25" value={group.project_name} disabled readOnly />
                        <div className="mt-3">
                            <p style={{ margin: '0px' }}>Select Jury:</p>
                            <Select
                                className='w-25'
                                name='jury_id'
                                loading={juries.length == 0}
                                placeholder='Select Jury'
                                onChange={e => { handleData('jury_id', e) }}
                            >
                                {
                                    juries.length > 0 &&
                                    juries.map((jury) => {
                                        return (
                                            <Option value={jury.id} key={jury.id}>
                                                {jury.jury_name}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </div>
                        <Button className="mt-3" onClick={assignJury}>
                            Submit
                        </Button>
                    </> :
                    <Spin indicator={antIcon} />
            }
        </div>
    )
}

export default AssignJuryByGroup
