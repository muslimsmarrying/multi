import { Route, Routes } from "react-router-dom";
import { PublicRoute, AdminRoute } from "./routes/AuthRoute";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDash from "./pages/admin/AdminDash";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/auth/ResetPassword";
import AutoLogout from "./routes/AutoLogout";
import AdminProfile from "./pages/admin/AdminProfile";
import EditUser from "./pages/admin/EditUser";
import SubAdmins from "./pages/admin/SubAdmins";
import Activities from "./pages/admin/Activities";
import AdminNotifications from "./pages/admin/AdminNotifications";
import Users from "./pages/admin/Users";
import Chips from "./pages/admin/Chips";

const App = () => {
  return (
    <>
      {/* <AutoLogout /> */}
      <Routes>
        {/* Public Routes (No authentication needed) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password-admin/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Sub-Admin and Super-Admin Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <AdminRoute>
              <AdminDash />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/admin/active-chips"
          element={
            <AdminRoute>
              <Chips />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/admin/notifications"
          element={
            <AdminRoute>
              <AdminNotifications />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/admin/edit-user/:id"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />

        {/* Super-Admin Only Routes */}
        <Route
          path="/dashboard/admin/sub-admins"
          element={
            <AdminRoute>
              <SubAdmins />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/admin/activities"
          element={
            <AdminRoute>
              <Activities />
            </AdminRoute>
          }
        />
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
