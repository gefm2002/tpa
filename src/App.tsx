import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Recaps from "./pages/Recaps";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import adminRoutes from "./admin/adminRoutes";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-neutral-900 text-soft-white">
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/eventos/:slug" element={<EventDetail />} />
        <Route path="/recaps" element={<Recaps />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contacto" element={<Contact />} />
        {adminRoutes}
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  );
};

export default App;
