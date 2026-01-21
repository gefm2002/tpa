import { openWa } from "../utils/whatsapp";

const WhatsAppFloat = () => (
  <button
    className="fixed bottom-5 right-5 z-50 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-accent/40"
    onClick={() => openWa()}
    aria-label="Abrir WhatsApp"
  >
    WhatsApp
  </button>
);

export default WhatsAppFloat;
