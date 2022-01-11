import React, { useState } from 'react'
import { Router, Route, Routes, Redirect, NavLink, useLocation } from "react-router-dom";
import App from '../App';
import Dashboard from './Dashboard';

const Navbar = () => {
    const { pathname } = useLocation();
    const checkPathName = pathname.includes("dashboard");

    return (
        <div>
            {checkPathName ? (
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            ) : (
                <App />
            )}

        </div>
    )
}

export default Navbar
