import { useWhatsAppLeadForm } from "./WhatsAppLeadForm";

const WhatsAppFloat = () => {
  const { openForm } = useWhatsAppLeadForm();

  return (
    <button
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent text-neutral-900 shadow-lg shadow-accent/40 hover:bg-accent/90"
      onClick={() => openForm()}
      aria-label="Abrir WhatsApp"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-6 w-6"
        fill="currentColor"
      >
        <path d="M19.11 17.55c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.17-.3.18-.55.06-.25-.12-1.05-.39-2-1.25-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.1-.5.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.48-.4-.42-.57-.42h-.49c-.17 0-.45.06-.69.32-.24.25-.9.88-.9 2.14s.92 2.47 1.05 2.64c.12.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.07 1.47-.6 1.68-1.18.2-.57.2-1.06.14-1.18-.06-.12-.22-.18-.47-.3z" />
        <path d="M26.67 5.33A11.74 11.74 0 0 0 16 1 11.8 11.8 0 0 0 4.2 12.8c0 2.08.55 4.1 1.6 5.88L4 31l12.7-1.76a11.8 11.8 0 0 0 11.1-11.74c0-3.15-1.23-6.1-3.43-8.17zm-10.67 21a9.8 9.8 0 0 1-5-1.38l-.36-.22-7.52 1.04 1.01-7.33-.24-.38A9.82 9.82 0 1 1 16 26.33z" />
      </svg>
    </button>
  );
};

export default WhatsAppFloat;
