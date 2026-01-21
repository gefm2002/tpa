import { useMemo, useState } from "react";
import type { RecapPost, EventImage } from "../../types";
import { getSnapshot, saveSnapshot } from "../../utils/storage";
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ImageUploader from "../components/ImageUploader";
import OrderControls from "../components/OrderControls";
import { recapSchema } from "../validators/recap";

const buildEmptyForm = (order: number) => ({
  title: "",
  date: "",
  description: "",
  images: [] as EventImage[],
  isActive: true,
  order,
});

type RecapFormState = ReturnType<typeof buildEmptyForm> & { id?: string };

const AdminRecaps = () => {
  const snapshot = getSnapshot();
  const [recaps, setRecaps] = useState<RecapPost[]>(snapshot.recaps);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<RecapFormState>(buildEmptyForm(recaps.length + 1));
  const [errors, setErrors] = useState<string[]>([]);

  const sorted = useMemo(() => [...recaps].sort((a, b) => a.order - b.order), [recaps]);

  const sync = (next: RecapPost[]) => {
    const updated = { ...getSnapshot(), recaps: next };
    saveSnapshot(updated);
    setRecaps(next);
  };

  const openCreate = () => {
    setForm(buildEmptyForm(recaps.length + 1));
    setErrors([]);
    setIsOpen(true);
  };

  const openEdit = (recap: RecapPost) => {
    setForm({
      id: recap.id,
      title: recap.title,
      date: recap.date,
      description: recap.description,
      images: recap.images,
      isActive: recap.isActive,
      order: recap.order,
    });
    setErrors([]);
    setIsOpen(true);
  };

  const handleSave = () => {
    const parsed = recapSchema.safeParse({
      title: form.title,
      date: form.date,
      description: form.description,
    });

    if (!parsed.success) {
      setErrors(parsed.error.errors.map((error) => error.message));
      return;
    }

    const now = Date.now();
    const recapData: RecapPost = {
      id: form.id ?? `rec-${now}`,
      title: form.title,
      date: form.date,
      description: form.description,
      images: form.images,
      isActive: form.isActive,
      order: form.order,
    };

    const next = form.id
      ? recaps.map((item) => (item.id === form.id ? recapData : item))
      : [...recaps, recapData];

    sync(next);
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Querés borrar este recap?")) return;
    sync(recaps.filter((recap) => recap.id !== id));
  };

  const move = (index: number, direction: number) => {
    const updated = [...sorted];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    sync(updated.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-soft-white">Recaps</h2>
        <Button onClick={openCreate}>Crear recap</Button>
      </div>
      <div className="space-y-4">
        {sorted.map((recap, index) => (
          <Card key={recap.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-neutral-300">{recap.date}</p>
                <h3 className="text-lg font-semibold text-soft-white">{recap.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => openEdit(recap)}>
                  Editar
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(recap.id)}>
                  Borrar
                </Button>
                <OrderControls onUp={() => move(index, -1)} onDown={() => move(index, 1)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Recap">
        <div className="space-y-4">
          {errors.length ? (
            <div className="rounded-xl border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Título</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Fecha</label>
              <input
                type="date"
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-neutral-300">Descripción</label>
              <textarea
                className="min-h-[100px] w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Activo</label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-neutral-300">Imágenes</label>
            <ImageUploader
              images={form.images}
              onChange={(images) => setForm((prev) => ({ ...prev, images }))}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminRecaps;
