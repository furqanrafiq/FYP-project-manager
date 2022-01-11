import React from 'react'
import { Card, Col, Row } from 'antd'
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
import axios from 'axios';
import { URI } from '../../Helper';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboardHome = () => {
    const [instructors, setInstructors] = useState([])
    const [graphMarks, setGraphMarks] = useState()

    const state = {
        labels: instructors.map(instructor => instructor.name),
        datasets: [
            {
                label: 'Instructor Groups',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: instructors.map(instructor => instructor.groupCount)
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

    const graphState = {
        labels: graphMarks?.map(graph => graph.project_name),
        datasets: [
            {
                label: 'Instructor Groups Marks',
                backgroundColor: '#1890ff',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: graphMarks?.map(graph => (graph.final_instructor_marks + graph.final_jury_marks + graph.mid_instructor_marks + graph.mid_jury_marks))
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

    useEffect(() => {
        return axios.get(URI + 'get-admin-marks')
            .then(response => {
                setGraphMarks(response.data.response.detail)
            })
    }, [])

    useEffect(() => {
        getInstructors();
    }, []);

    function getInstructors() {
        return axios.get(URI + 'get-instructor-groups')
            .then(response => {
                setInstructors(response.data.response.detail)
            })
    }

    return (
        <div className="admin-dashboard">
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
                <div className='col-md-6'>
                    <Bar
                        data={graphState}
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
        </div>
    )
}

export default AdminDashboardHome
