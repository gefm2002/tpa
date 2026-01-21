import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    { label: "Eventos", to: "/admin/eventos" },
    { label: "Recaps", to: "/admin/recaps" },
    { label: "FAQs", to: "/admin/faq" },
    { label: "Testimonios", to: "/admin/testimonios" },
    { label: "Settings", to: "/admin/settings" },
  ];

  return (
    <aside className="border-r border-white/10 bg-neutral-900/80 p-4">
      <p className="mb-6 text-sm font-semibold text-soft-white">Admin TPA</p>
      <nav className="flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 transition ${
                isActive ? "bg-accent/15 text-accent" : "text-neutral-300 hover:text-soft-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
