import React from "react";
import {Outlet, Navigate, Route} from "react-router-dom";
import { useAuth } from "../context/authContext";
export default function PrivateRoute({ component: component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    currentUser ?  <Outlet/> : <Navigate  to='/login' rest={rest}/>
  );
}
