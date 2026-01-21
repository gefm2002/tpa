import { useWhatsAppLeadForm } from "./WhatsAppLeadForm";

const WhatsAppFloat = () => {
  const { openForm } = useWhatsAppLeadForm();

  return (
    <button
      className="fixed bottom-5 right-5 z-50 rounded-full border border-accent/40 bg-accent px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-accent/40 hover:bg-accent/90"
      onClick={() => openForm()}
      aria-label="Abrir WhatsApp"
    >
      WhatsApp
    </button>
  );
};

export default WhatsAppFloat;
