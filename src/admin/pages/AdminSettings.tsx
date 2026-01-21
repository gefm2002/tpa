import { useState } from "react";
import type { Settings } from "../../types";
import { getSnapshot, saveSnapshot } from "../../utils/storage";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { settingsSchema } from "../validators/settings";

const AdminSettings = () => {
  const snapshot = getSnapshot();
  const [form, setForm] = useState<Settings>(snapshot.settings);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = () => {
    const parsed = settingsSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.errors.map((error) => error.message));
      return;
    }

    saveSnapshot({ ...getSnapshot(), settings: form });
    setErrors([]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-soft-white">Settings</h2>
      <Card>
        <div className="space-y-4">
          {errors.length ? (
            <div className="rounded-xl border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                { label: "Nombre comunidad", key: "communityName" },
                { label: "WhatsApp", key: "whatsappNumber" },
                { label: "Mensaje WhatsApp", key: "whatsappDefaultMessage" },
                { label: "Instagram", key: "instagramUrl" },
                { label: "Zonas", key: "zonesText" },
                { label: "Regla edad", key: "ageRuleText" },
                { label: "Mención", key: "mentionText" },
              ] as const
            ).map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm text-neutral-300">{field.label}</label>
                <input
                  className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                  value={form[field.key]}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, [field.key]: event.target.value }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>Guardar cambios</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;
