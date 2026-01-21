import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import EventCard from "../components/EventCard";
import Card from "../components/Card";
import useSnapshot from "../utils/useSnapshot";
import Badge from "../components/Badge";

const Events = () => {
  const { events } = useSnapshot();
  const [types, setTypes] = useState<string[]>([]);
  const [isFree, setIsFree] = useState<string>("all");
  const [zone, setZone] = useState("all");
  const [next30, setNext30] = useState(false);

  const zones = Array.from(
    new Set(events.map((event) => event.zone).filter(Boolean))
  ) as string[];

  const upcoming = useMemo(() => {
    const base = events
      .filter((event) => event.status === "upcoming" && event.isActive)
      .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);

    return base.filter((event) => {
      if (types.length && !types.includes(event.type)) return false;
      if (isFree === "free" && !event.isFree) return false;
      if (isFree === "paid" && event.isFree) return false;
      if (zone !== "all" && event.zone !== zone) return false;
      if (next30) {
        const eventDate = new Date(`${event.date}T00:00:00`);
        const today = new Date();
        const limit = new Date();
        limit.setDate(today.getDate() + 30);
        if (eventDate < today || eventDate > limit) return false;
      }
      return true;
    });
  }, [events, types, isFree, zone, next30]);

  const past = events
    .filter((event) => event.status === "past" && event.isActive)
    .sort((a, b) => b.date.localeCompare(a.date));

  const toggleType = (value: string) => {
    setTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  return (
    <Container className="py-10">
      <SectionTitle title="Próximas salidas" subtitle="Planes en CABA y alrededores" />
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <p className="text-sm font-semibold text-soft-white">Tipo</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["nocturna", "diurna", "escapada", "especial"].map((type) => (
              <button
                key={type}
                className={`rounded-full border px-3 py-1 text-xs ${
                  types.includes(type)
                    ? "border-accent text-accent"
                    : "border-white/20 text-neutral-300"
                }`}
                onClick={() => toggleType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-soft-white">Gratuita / paga</p>
          <div className="mt-3 flex gap-2">
            {[
              { label: "Todas", value: "all" },
              { label: "Gratuitas", value: "free" },
              { label: "Pagas", value: "paid" },
            ].map((option) => (
              <button
                key={option.value}
                className={`rounded-full border px-3 py-1 text-xs ${
                  isFree === option.value
                    ? "border-accent text-accent"
                    : "border-white/20 text-neutral-300"
                }`}
                onClick={() => setIsFree(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-soft-white">Zona</p>
          <select
            className="mt-3 w-full rounded-full border border-white/20 bg-neutral-900 px-3 py-2 text-sm text-soft-white"
            value={zone}
            onChange={(event) => setZone(event.target.value)}
          >
            <option value="all">Todas</option>
            {zones.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-soft-white">Fecha</p>
          <button
            className={`mt-3 w-full rounded-full border px-3 py-2 text-sm ${
              next30 ? "border-accent text-accent" : "border-white/20 text-neutral-300"
            }`}
            onClick={() => setNext30((prev) => !prev)}
          >
            Próximos 30 días
          </button>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {upcoming.length ? (
          upcoming.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <Card>
            <p className="text-sm text-neutral-300">No hay eventos con esos filtros.</p>
          </Card>
        )}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <SectionTitle title="Eventos pasados" subtitle="Lo que ya vivimos" />
          <Link className="text-sm text-accent hover:text-accent/80" to="/recaps">
            Ver recaps
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {past.map((event) => (
            <div key={event.id} className="glass-card p-4">
              <p className="text-sm text-neutral-300">{event.date}</p>
              <p className="mt-2 text-base font-semibold text-soft-white">{event.title}</p>
              <div className="mt-3 flex gap-2">
                <Badge>{event.type}</Badge>
                {event.isFree ? <Badge>Gratuita</Badge> : <Badge>Pago</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Events;
