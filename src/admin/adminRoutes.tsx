import { Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminEvents from "./pages/AdminEvents";
import AdminRecaps from "./pages/AdminRecaps";
import AdminFaq from "./pages/AdminFaq";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminSettings from "./pages/AdminSettings";
import { isAuthenticated } from "./auth";

const AdminEnsure = () => {
  return isAuthenticated() ? <Navigate to="/admin/eventos" replace /> : <Navigate to="/admin" replace />;
};

const adminRoutes = (
  <>
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/admin.ensure" element={<AdminEnsure />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="eventos" element={<AdminEvents />} />
      <Route path="recaps" element={<AdminRecaps />} />
      <Route path="faq" element={<AdminFaq />} />
      <Route path="testimonios" element={<AdminTestimonials />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </>
);

export default adminRoutes;
