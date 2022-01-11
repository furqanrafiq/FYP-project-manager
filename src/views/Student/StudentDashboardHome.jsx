import React from 'react'
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

const StudentDashboardHome = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [pendingTasks, setPendingTasks] = useState([])
    const [markedTasks, setMarkedTasks] = useState([])
    const [submittedTasks, setSubmittedTasks] = useState([])

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        return axios.get(URI + 'getStudentTasks', {
            params: {
                student_id: JSON.parse(localStorage.getItem('student')).id
            }
        }).then(response => {
            setTasks(response.data.response.detail)
        })
    }

    useEffect(() => {
        setPendingTasks(tasks?.filter(task => task.status == 'pending'))
    }, [tasks])

    useEffect(() => {
        setMarkedTasks(tasks?.filter(task => task.status == 'Marked'))
    }, [tasks])

    useEffect(() => {
        setSubmittedTasks(tasks?.filter(task => task.status == 'Submitted'))
        // submittedTasks = 
    }, [tasks])

    const state = {
        labels: ['Total', 'Pending', 'Marked', 'Submitted'],
        datasets: [
            {
                label: 'Status of Tasks',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [tasks?.length, pendingTasks?.length, markedTasks?.length, submittedTasks?.length]
            }
        ]
    }
    // console.log(pendingTasks.length)

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
        </div>
    )
}

export default StudentDashboardHome
