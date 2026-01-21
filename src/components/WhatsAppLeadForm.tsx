import { createContext, useContext, useMemo, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import useSnapshot from "../utils/useSnapshot";
import { buildWaLink } from "../utils/whatsapp";

type OpenFormHandler = (messageOverride?: string) => void;

const WhatsAppLeadContext = createContext<{ openForm: OpenFormHandler }>({
  openForm: () => undefined,
});

export const useWhatsAppLeadForm = () => useContext(WhatsAppLeadContext);

interface WhatsAppLeadProviderProps {
  children: React.ReactNode;
}

const WhatsAppLeadProvider = ({ children }: WhatsAppLeadProviderProps) => {
  const { settings } = useSnapshot();
  const [isOpen, setIsOpen] = useState(false);
  const [baseMessage, setBaseMessage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    gender: "",
    instagram: "",
    tiktok: "",
    facebook: "",
  });

  const openForm = (messageOverride?: string) => {
    setBaseMessage(messageOverride);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const reset = () =>
    setForm({
      name: "",
      age: "",
      location: "",
      gender: "",
      instagram: "",
      tiktok: "",
      facebook: "",
    });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const header = baseMessage ?? settings.whatsappDefaultMessage;
    const lines = [
      header,
      `Nombre: ${form.name}`,
      `Edad: ${form.age}`,
      `Ubicación: ${form.location}`,
      `Sexo: ${form.gender}`,
    ];

    const socialLines = [
      form.instagram ? `Instagram: ${form.instagram}` : null,
      form.tiktok ? `TikTok: ${form.tiktok}` : null,
      form.facebook ? `Facebook: ${form.facebook}` : null,
    ].filter(Boolean) as string[];

    if (socialLines.length) {
      lines.push("Redes:");
      lines.push(...socialLines);
    }

    const message = lines.join("\n");
    const link = buildWaLink(settings.whatsappNumber, message);
    window.open(link, "_blank", "noopener");
    close();
    reset();
  };

  const contextValue = useMemo(() => ({ openForm }), []);

  return (
    <WhatsAppLeadContext.Provider value={contextValue}>
      {children}
      <Modal isOpen={isOpen} onClose={close} title="Sumarte a una salida">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-sm text-neutral-300">
            Completá estos datos y te armamos el mensaje para WhatsApp.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Nombre</label>
              <input
                required
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Edad</label>
              <input
                required
                type="number"
                min="18"
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                value={form.age}
                onChange={(event) => setForm((prev) => ({ ...prev, age: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Ubicación</label>
              <input
                required
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                value={form.location}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, location: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Sexo</label>
              <select
                required
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                value={form.gender}
                onChange={(event) => setForm((prev) => ({ ...prev, gender: event.target.value }))}
              >
                <option value="">Seleccionar</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Instagram (opcional)</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                placeholder="@usuario"
                value={form.instagram}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, instagram: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">TikTok (opcional)</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                placeholder="@usuario"
                value={form.tiktok}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tiktok: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-neutral-300">Facebook (opcional)</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
                placeholder="Perfil o link"
                value={form.facebook}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, facebook: event.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={close}>
              Cancelar
            </Button>
            <Button type="submit">Enviar por WhatsApp</Button>
          </div>
        </form>
      </Modal>
    </WhatsAppLeadContext.Provider>
  );
};

export default WhatsAppLeadProvider;
