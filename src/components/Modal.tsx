import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="glass-card w-full max-w-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-soft-white">{title}</h3>
          <button
            className="text-neutral-300 hover:text-soft-white"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
