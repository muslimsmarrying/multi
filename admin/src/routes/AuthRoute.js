import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

// Component to show loader before redirecting
const RedirectWithLoader = ({ countdown, redirectTo }) => {
  const [timer, setTimer] = useState(countdown);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timer]);

  if (timer === 0) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Loader />
    </div>
  );
};

// Prevents authenticated users from accessing login pages
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("admintoken");
  const authData = localStorage.getItem("adminauthor");

  if (token && authData) {
    const parsedAuthData = JSON.parse(authData);
    const role = parsedAuthData?.admin?.role;

    if (role === "super-admin") {
      return <RedirectWithLoader countdown={3} redirectTo="/dashboard/admin" />;
    } else if (role === "sub-admin") {
      return <RedirectWithLoader countdown={3} redirectTo="/dashboard/admin" />;
    }
  }

  return children;
};

// Full access only for super-admin
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("admintoken");
  const authData = localStorage.getItem("adminauthor");

  if (!token || !authData) {
    return <RedirectWithLoader countdown={3} redirectTo="/" />;
  }

  const parsedAuthData = JSON.parse(authData);
  const role = parsedAuthData?.admin?.role;

  if (role !== "super-admin") {
    return <RedirectWithLoader countdown={3} redirectTo="/dashboard/admin" />;
  }

  return children;
};

// Restricted access for sub-admin (super-admin can also access)
const SubAdminRoute = ({ children }) => {
  const token = localStorage.getItem("admintoken");
  const authData = localStorage.getItem("adminauthor");

  if (!token || !authData) {
    return <RedirectWithLoader countdown={3} redirectTo="/" />;
  }

  const parsedAuthData = JSON.parse(authData);
  const role = parsedAuthData?.admin?.role;

  if (role === "super-admin" || role === "sub-admin") {
    return children;
  }

  // Redirect unauthorized users
  return <RedirectWithLoader countdown={3} redirectTo="/dashboard/admin" />;
};

export { PublicRoute, AdminRoute, SubAdminRoute };
