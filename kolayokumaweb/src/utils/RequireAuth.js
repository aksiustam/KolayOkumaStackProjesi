import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return allowedRoles.find((role) => user?.role?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/Auth/Login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
