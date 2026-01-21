import { Link } from "react-router-dom";
import type { EventItem } from "../types";
import { formatDate, formatPrice } from "../utils/format";
import { useWhatsAppLeadForm } from "./WhatsAppLeadForm";
import Badge from "./Badge";
import Button from "./Button";

interface EventCardProps {
  event: EventItem;
}

const EventCard = ({ event }: EventCardProps) => {
  const cover = event.images.find((img) => img.isCover) ?? event.images[0];
  const { openForm } = useWhatsAppLeadForm();

  return (
    <div className="glass-card overflow-hidden border border-white/10">
      <div className="relative h-52">
        {cover && (
          <img
            src={cover.dataUrl}
            alt={cover.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <Badge variant="accent">{event.type}</Badge>
          {event.isFree ? <Badge>Gratuita</Badge> : <Badge>Pago</Badge>}
          <span className="ml-auto text-xs font-semibold text-soft-white/90">
            {formatDate(event.date)} · {event.time}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-soft-white">{event.title}</h3>
        <p className="mt-2 text-sm text-neutral-300">
          {event.locationName} · {event.zone ?? event.city}
        </p>
        <p className="mt-3 text-lg font-semibold text-soft-white">
          {formatPrice(event.isFree, event.price, event.currency)}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              openForm(
                event.waMessage ??
                  `Hola, quiero sumarme a ${event.title} el ${event.date} a las ${event.time}.`
              )
            }
          >
            {event.ctaLabel ?? "Quiero sumarme"}
          </Button>
          <Link
            to={`/eventos/${event.slug}`}
            className="btn border border-white/20 text-soft-white hover:border-accent/40 hover:text-accent"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
