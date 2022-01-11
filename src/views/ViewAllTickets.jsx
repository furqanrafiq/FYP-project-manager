import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { URI } from '../Helper';

const ViewAllTickets = () => {
    const [tickets,setTickets] = useState();

    useEffect(() => {
        getTickets();
    }, []);

    function getTickets() {
        return axios.get(URI + 'get-tickets')
            .then(response => {
                console.log(response)
                setTickets(response.data.response.detail)
            })
    }

    return (
        <div>
            <p>Total Tickets : {tickets?.length}</p>
            <table class="table table-bordered table-hover table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        {/* <th scope="col">Students</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets?.map((ticket, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description != null ? ticket.description : '-'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewAllTickets
