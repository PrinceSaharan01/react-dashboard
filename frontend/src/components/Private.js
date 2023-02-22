import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private = ()=>{
    const authenticate = localStorage.getItem('user');
return(
   authenticate? <Outlet></Outlet> : <Navigate to={"/signup"}></Navigate>
)
}
export default Private;