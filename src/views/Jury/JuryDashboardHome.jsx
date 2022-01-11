import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URI } from '../../Helper';
import { LoadingOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const JuryDashboardHome = () => {
    const jury_id = JSON.parse(localStorage.getItem('jury'))?.id;
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [graphMarks,setGraphMarks] = useState([])

    useEffect(() => {
        return axios.get(URI + `get-jury-marks?jury_id=${jury_id}`)
            .then(response => {
                console.log(response)
                setGraphMarks(response.data.response.detail)
            })
    }, [])

    useEffect(() => {
        getGroups();
    }, []);

    function getGroups() {
        setLoading(true)
        return axios.get(URI + `get-jury-groups?jury_id=${jury_id}`)
            .then(response => {
                setGroups(response.data.response.detail)
                setLoading(false)
            })
    }

    const state = {
        labels: graphMarks.map(graph => graph.project_name),
        datasets: [
            {
                label: 'Instructor Group Marks',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: graphMarks.map(graph => (graph.final_instructor_marks + graph.final_jury_marks + graph.mid_instructor_marks + graph.mid_jury_marks))
            }
        ],
        scales: {
            xAxes: [
                {
                    type: "category",
                    ticks: { mirror: true, stepSize: 1 }
                }
            ],
        },
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <Bar
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Tasks',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
            <h5 className='mt-5'>All Groups</h5>
            {
                loading == true ?
                    <div>
                        <Spin indicator={antIcon} />
                    </div> :
                    groups.length == 0 ?
                        <p>Total Groups : {groups.length}</p> :
                        groups.length > 0 ?
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

export default JuryDashboardHome
