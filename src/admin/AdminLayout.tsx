import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import { isAuthenticated } from "./auth";

const AdminLayout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-soft-white">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <AdminSidebar />
        <div className="flex min-h-screen flex-col">
          <AdminTopbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
