import { Link } from "react-router-dom";
import { getSnapshot } from "../utils/storage";
import { useWhatsAppLeadForm } from "./WhatsAppLeadForm";

const Footer = () => {
  const { settings } = getSnapshot();
  const { openForm } = useWhatsAppLeadForm();

  return (
    <footer className="border-t border-white/10 bg-neutral-900/90 py-12">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-soft-white">{settings.communityName}</p>
          <p className="mt-2 text-sm text-neutral-300">
            Salidas grupales con foco en comunidad real.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-soft-white">Links</p>
          <div className="mt-2 flex flex-col gap-2 text-sm text-neutral-300">
            <Link to="/eventos">Próximas salidas</Link>
            <Link to="/recaps">Recaps</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <button
            className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-soft-white hover:border-accent/40 hover:text-accent"
            aria-label="Abrir WhatsApp"
            onClick={() => openForm()}
          >
            <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor">
              <path d="M19.11 17.55c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.17-.3.18-.55.06-.25-.12-1.05-.39-2-1.25-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.1-.5.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.48-.4-.42-.57-.42h-.49c-.17 0-.45.06-.69.32-.24.25-.9.88-.9 2.14s.92 2.47 1.05 2.64c.12.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.07 1.47-.6 1.68-1.18.2-.57.2-1.06.14-1.18-.06-.12-.22-.18-.47-.3z" />
              <path d="M26.67 5.33A11.74 11.74 0 0 0 16 1 11.8 11.8 0 0 0 4.2 12.8c0 2.08.55 4.1 1.6 5.88L4 31l12.7-1.76a11.8 11.8 0 0 0 11.1-11.74c0-3.15-1.23-6.1-3.43-8.17zm-10.67 21a9.8 9.8 0 0 1-5-1.38l-.36-.22-7.52 1.04 1.01-7.33-.24-.38A9.82 9.82 0 1 1 16 26.33z" />
            </svg>
          </button>
        </div>
        <div>
          <a
            className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-soft-white hover:border-accent/40 hover:text-accent"
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener"
            aria-label="Abrir Instagram"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 3.5A5.5 5.5 0 1 1 6.5 14 5.51 5.51 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5zm6.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="container mt-8 border-t border-white/10 pt-4 text-xs text-neutral-500">
        <a
          href="https://structura.com.ar/"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Diseño y desarrollo por Structura
        </a>
      </div>
    </footer>
  );
};

export default Footer;
