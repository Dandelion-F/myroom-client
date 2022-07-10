import React from "react";
import { Navigate } from "react-router";
import Home from "../application/Home";
import HouseList from "../application/HouseList";

const routes = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <Navigate replace to="/houselist" />,
            },
            {
                path: "/houselist",
                element: <HouseList />,
            },
        ],
    },
];

export default routes;
