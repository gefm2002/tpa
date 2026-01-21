import { useMemo, useState } from "react";
import type { Testimonial } from "../../types";
import { getSnapshot, saveSnapshot } from "../../utils/storage";
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Button from "../../components/Button";
import OrderControls from "../components/OrderControls";
import { testimonialSchema } from "../validators/testimonial";

const buildEmptyForm = (order: number) => ({
  name: "",
  text: "",
  rating: 5,
  isActive: true,
  order,
});

type TestimonialFormState = ReturnType<typeof buildEmptyForm> & { id?: string };

const AdminTestimonials = () => {
  const snapshot = getSnapshot();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(snapshot.testimonials);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<TestimonialFormState>(buildEmptyForm(testimonials.length + 1));
  const [errors, setErrors] = useState<string[]>([]);

  const sorted = useMemo(
    () => [...testimonials].sort((a, b) => a.order - b.order),
    [testimonials]
  );

  const sync = (next: Testimonial[]) => {
    const updated = { ...getSnapshot(), testimonials: next };
    saveSnapshot(updated);
    setTestimonials(next);
  };

  const openCreate = () => {
    setForm(buildEmptyForm(testimonials.length + 1));
    setErrors([]);
    setIsOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    setForm({
      id: testimonial.id,
      name: testimonial.name,
      text: testimonial.text,
      rating: testimonial.rating,
      isActive: testimonial.isActive,
      order: testimonial.order,
    });
    setErrors([]);
    setIsOpen(true);
  };

  const handleSave = () => {
    const parsed = testimonialSchema.safeParse({
      name: form.name,
      text: form.text,
      rating: form.rating,
    });

    if (!parsed.success) {
      setErrors(parsed.error.errors.map((error) => error.message));
      return;
    }

    const now = Date.now();
    const testimonialData: Testimonial = {
      id: form.id ?? `tes-${now}`,
      name: form.name,
      text: form.text,
      rating: form.rating,
      isActive: form.isActive,
      order: form.order,
    };

    const next = form.id
      ? testimonials.map((item) => (item.id === form.id ? testimonialData : item))
      : [...testimonials, testimonialData];

    sync(next);
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Querés borrar este testimonio?")) return;
    sync(testimonials.filter((item) => item.id !== id));
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
        <h2 className="text-xl font-semibold text-soft-white">Testimonios</h2>
        <Button onClick={openCreate}>Crear testimonio</Button>
      </div>
      <div className="space-y-4">
        {sorted.map((testimonial, index) => (
          <Card key={testimonial.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-soft-white">{testimonial.name}</h3>
                <p className="text-sm text-neutral-300">{testimonial.text}</p>
                <p className="text-xs text-neutral-400">Rating: {testimonial.rating}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => openEdit(testimonial)}>
                  Editar
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(testimonial.id)}>
                  Borrar
                </Button>
                <OrderControls onUp={() => move(index, -1)} onDown={() => move(index, 1)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Testimonio">
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
              <label className="text-sm text-neutral-300">Nombre</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Rating</label>
              <input
                type="number"
                min={1}
                max={5}
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.rating}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, rating: Number(event.target.value) }))
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-neutral-300">Texto</label>
              <textarea
                className="min-h-[100px] w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.text}
                onChange={(event) => setForm((prev) => ({ ...prev, text: event.target.value }))}
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

export default AdminTestimonials;
