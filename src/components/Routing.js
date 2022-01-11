import React from 'react';
import DashboardHome from '../views/DashboardHome';
import AddGroup from "../views/Instructor/AddGroup";
import Dashboard from "./Dashboard";

const routes = [
    {
      path: "/dashboard",
      exact: true,
      component: DashboardHome,
    },
    {
      path: "/dashboard/add-group",
      exact: true,
      component: AddGroup,
    }
  ];
  export default routes;