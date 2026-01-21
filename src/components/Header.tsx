import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { getSnapshot } from "../utils/storage";
import Button from "./Button";
import { useWhatsAppLeadForm } from "./WhatsAppLeadForm";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { settings } = getSnapshot();

  const navItems = [
    { label: "Inicio", to: "/" },
    { label: "Próximas salidas", to: "/eventos" },
    { label: "Recaps", to: "/recaps" },
    { label: "FAQ", to: "/faq" },
    { label: "Contacto", to: "/contacto" },
  ];

  const { openForm } = useWhatsAppLeadForm();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-full border border-white/15 p-1">
            <img src="/images/logo.png" alt={settings.communityName} className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <p className="text-sm font-semibold text-soft-white">{settings.communityName}</p>
            <p className="text-xs text-neutral-300">{settings.zonesText}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition ${isActive ? "text-accent" : "text-neutral-200 hover:text-soft-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button variant="primary" onClick={() => openForm()}>
            Escribinos
          </Button>
        </div>
        <button
          className="md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-neutral-900 md:hidden">
          <div className="container flex flex-col gap-4 py-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition ${isActive ? "text-accent" : "text-neutral-200 hover:text-soft-white"}`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Button variant="primary" className="w-full" onClick={() => openForm()}>
              Escribinos
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
