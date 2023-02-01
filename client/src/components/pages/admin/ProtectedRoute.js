import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";



function ProtectedRouteAdmin() {
  const { User } = useAuth();

  if (User.role !== "admin") {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRouteAdmin;
