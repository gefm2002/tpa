import { useMemo, useState } from "react";
import type { EventItem, EventImage } from "../../types";
import { getSnapshot, saveSnapshot } from "../../utils/storage";
import { slugify } from "../../utils/slug";
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ImageUploader from "../components/ImageUploader";
import OrderControls from "../components/OrderControls";
import { eventSchema } from "../validators/event";

const buildEmptyForm = (order: number) => ({
  title: "",
  slug: "",
  status: "upcoming",
  type: "nocturna",
  isFree: false,
  price: "",
  currency: "ARS",
  date: "",
  time: "",
  endTime: "",
  meetupNote: "",
  locationName: "",
  address: "",
  city: "CABA",
  zone: "",
  mapEmbedUrl: "",
  directionsUrl: "",
  capacity: "",
  ageMin: "",
  dressCode: "",
  includes: "",
  agenda: "",
  ctaLabel: "Quiero sumarme",
  waMessage: "",
  images: [] as EventImage[],
  isActive: true,
  order,
});

type EventFormState = ReturnType<typeof buildEmptyForm> & { id?: string };

const AdminEvents = () => {
  const snapshot = getSnapshot();
  const [events, setEvents] = useState<EventItem[]>(snapshot.events);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<EventFormState>(buildEmptyForm(events.length + 1));
  const [errors, setErrors] = useState<string[]>([]);

  const sorted = useMemo(
    () => [...events].sort((a, b) => a.order - b.order),
    [events]
  );

  const sync = (next: EventItem[]) => {
    const updated = { ...getSnapshot(), events: next };
    saveSnapshot(updated);
    setEvents(next);
  };

  const openCreate = () => {
    setForm(buildEmptyForm(events.length + 1));
    setErrors([]);
    setIsOpen(true);
  };

  const openEdit = (event: EventItem) => {
    setForm({
      id: event.id,
      title: event.title,
      slug: event.slug,
      status: event.status,
      type: event.type,
      isFree: event.isFree,
      price: event.price ? String(event.price) : "",
      currency: event.currency,
      date: event.date,
      time: event.time,
      endTime: event.endTime ?? "",
      meetupNote: event.meetupNote,
      locationName: event.locationName,
      address: event.address,
      city: event.city,
      zone: event.zone ?? "",
      mapEmbedUrl: event.mapEmbedUrl,
      directionsUrl: event.directionsUrl,
      capacity: event.capacity ? String(event.capacity) : "",
      ageMin: event.ageMin ? String(event.ageMin) : "",
      dressCode: event.dressCode ?? "",
      includes: event.includes?.join(", ") ?? "",
      agenda: event.agenda?.join(", ") ?? "",
      ctaLabel: event.ctaLabel ?? "Quiero sumarme",
      waMessage: event.waMessage ?? "",
      images: event.images,
      isActive: event.isActive,
      order: event.order,
    });
    setErrors([]);
    setIsOpen(true);
  };

  const handleSave = () => {
    const payload = {
      title: form.title,
      slug: form.slug,
      type: form.type,
      status: form.status,
      date: form.date,
      time: form.time,
      locationName: form.locationName,
      address: form.address,
      city: form.city,
      mapEmbedUrl: form.mapEmbedUrl,
      directionsUrl: form.directionsUrl,
    };

    const parsed = eventSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.errors.map((error) => error.message));
      return;
    }

    const now = Date.now();
    const priceValue = form.isFree ? null : form.price ? Number(form.price) : null;

    const eventData: EventItem = {
      id: form.id ?? `evt-${now}`,
      title: form.title,
      slug: form.slug,
      status: form.status as EventItem["status"],
      type: form.type as EventItem["type"],
      isFree: form.isFree,
      price: priceValue,
      currency: "ARS",
      date: form.date,
      time: form.time,
      endTime: form.endTime || undefined,
      meetupNote: form.meetupNote || "",
      locationName: form.locationName,
      address: form.address,
      city: form.city,
      zone: form.zone || undefined,
      mapEmbedUrl: form.mapEmbedUrl,
      directionsUrl: form.directionsUrl,
      capacity: form.capacity ? Number(form.capacity) : undefined,
      ageMin: form.ageMin ? Number(form.ageMin) : undefined,
      dressCode: form.dressCode || undefined,
      includes: form.includes
        ? form.includes.split(",").map((item) => item.trim()).filter(Boolean)
        : undefined,
      agenda: form.agenda
        ? form.agenda.split(",").map((item) => item.trim()).filter(Boolean)
        : undefined,
      ctaLabel: form.ctaLabel || "Quiero sumarme",
      waMessage: form.waMessage || undefined,
      images: form.images.length ? form.images : [],
      isActive: form.isActive,
      order: form.order,
      createdAt: form.id ? events.find((item) => item.id === form.id)?.createdAt ?? now : now,
      updatedAt: now,
    };

    const next = form.id
      ? events.map((item) => (item.id === form.id ? eventData : item))
      : [...events, eventData];

    sync(next);
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Querés borrar este evento?")) return;
    sync(events.filter((event) => event.id !== id));
  };

  const handleToggle = (id: string) => {
    sync(
      events.map((event) =>
        event.id === id ? { ...event, isActive: !event.isActive } : event
      )
    );
  };

  const handleDuplicate = (event: EventItem) => {
    const now = Date.now();
    const duplicate: EventItem = {
      ...event,
      id: `evt-${now}`,
      title: `${event.title} (copia)` ,
      slug: `${event.slug}-copia-${now}`,
      createdAt: now,
      updatedAt: now,
      order: events.length + 1,
    };
    sync([...events, duplicate]);
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
        <h2 className="text-xl font-semibold text-soft-white">Eventos</h2>
        <Button onClick={openCreate}>Crear evento</Button>
      </div>
      <div className="space-y-4">
        {sorted.map((event, index) => {
          const cover = event.images.find((img) => img.isCover) ?? event.images[0];
          return (
            <Card key={event.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  {cover ? (
                    <img
                      src={cover.dataUrl}
                      alt={cover.alt}
                      className="h-14 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-white/10 text-xs text-neutral-400">
                      Sin imagen
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-neutral-300">{event.date}</p>
                    <h3 className="text-lg font-semibold text-soft-white">{event.title}</h3>
                    <p className="text-xs text-neutral-400">
                      {event.type} · {event.status} · Orden {event.order}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {event.isActive ? "Activa" : "Inactiva"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => openEdit(event)}>
                    Editar
                  </Button>
                  <Button variant="ghost" onClick={() => handleDuplicate(event)}>
                    Duplicar
                  </Button>
                  <Button variant="ghost" onClick={() => handleToggle(event.id)}>
                    {event.isActive ? "Desactivar" : "Activar"}
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(event.id)}>
                    Borrar
                  </Button>
                  <OrderControls onUp={() => move(index, -1)} onDown={() => move(index, 1)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Evento">
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
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    title: event.target.value,
                    slug: prev.id ? prev.slug : slugify(event.target.value),
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Slug</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.slug}
                onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Status</label>
              <select
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              >
                <option value="upcoming">upcoming</option>
                <option value="past">past</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Tipo</label>
              <select
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              >
                <option value="nocturna">nocturna</option>
                <option value="diurna">diurna</option>
                <option value="escapada">escapada</option>
                <option value="especial">especial</option>
              </select>
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
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Hora</label>
              <input
                type="time"
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.time}
                onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Hora fin</label>
              <input
                type="time"
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.endTime}
                onChange={(event) => setForm((prev) => ({ ...prev, endTime: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Lugar</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.locationName}
                onChange={(event) => setForm((prev) => ({ ...prev, locationName: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Dirección</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.address}
                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Ciudad</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.city}
                onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Zona</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.zone}
                onChange={(event) => setForm((prev) => ({ ...prev, zone: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Mapa embed URL</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.mapEmbedUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, mapEmbedUrl: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Directions URL</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.directionsUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, directionsUrl: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Meetup note</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.meetupNote}
                onChange={(event) => setForm((prev) => ({ ...prev, meetupNote: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Gratis</label>
              <input
                type="checkbox"
                checked={form.isFree}
                onChange={(event) => setForm((prev) => ({ ...prev, isFree: event.target.checked }))}
              />
            </div>
            {!form.isFree && (
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">Precio</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                  value={form.price}
                  onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Cupos</label>
              <input
                type="number"
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.capacity}
                onChange={(event) => setForm((prev) => ({ ...prev, capacity: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Edad mínima</label>
              <input
                type="number"
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.ageMin}
                onChange={(event) => setForm((prev) => ({ ...prev, ageMin: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Dress code</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.dressCode}
                onChange={(event) => setForm((prev) => ({ ...prev, dressCode: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Qué incluye (separado por coma)</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.includes}
                onChange={(event) => setForm((prev) => ({ ...prev, includes: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Agenda (separado por coma)</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.agenda}
                onChange={(event) => setForm((prev) => ({ ...prev, agenda: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">CTA label</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.ctaLabel}
                onChange={(event) => setForm((prev) => ({ ...prev, ctaLabel: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-neutral-300">Mensaje WhatsApp</label>
              <input
                className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
                value={form.waMessage}
                onChange={(event) => setForm((prev) => ({ ...prev, waMessage: event.target.value }))}
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

export default AdminEvents;
