import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Profile from "./profile";
import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute({ element }) {
  const { LoggedIn } = useAuth()
  return LoggedIn ? (
    <Outlet element={<Profile></Profile>} />
  ) : (
    <Navigate to="/signin" />
  );
}

export default ProtectedRoute;
