import { Link } from "react-router-dom";
import { getSnapshot } from "../utils/storage";

const Footer = () => {
  const { settings } = getSnapshot();

  return (
    <footer className="border-t border-white/10 bg-neutral-900 py-10">
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
          <p className="text-sm font-semibold text-soft-white">WhatsApp</p>
          <p className="mt-2 text-sm text-neutral-300">{settings.whatsappNumber}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-soft-white">Instagram</p>
          <a
            className="mt-2 block text-sm text-neutral-300 hover:text-soft-white"
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener"
          >
            {settings.instagramUrl}
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
