import { Link } from "react-router-dom";
import type { EventItem } from "../types";
import { formatDate, formatPrice } from "../utils/format";
import { openWa } from "../utils/whatsapp";
import Badge from "./Badge";
import Button from "./Button";

interface EventCardProps {
  event: EventItem;
}

const EventCard = ({ event }: EventCardProps) => {
  const cover = event.images.find((img) => img.isCover) ?? event.images[0];

  return (
    <div className="glass-card overflow-hidden">
      <div className="relative h-44">
        {cover && (
          <img
            src={cover.dataUrl}
            alt={cover.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <Badge variant="accent">{event.type}</Badge>
          {event.isFree ? <Badge>Gratuita</Badge> : <Badge>Pago</Badge>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-neutral-300">
          <span>{formatDate(event.date)}</span>
          <span>{event.time}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-soft-white">{event.title}</h3>
        <p className="mt-1 text-sm text-neutral-300">
          {event.locationName} · {event.zone ?? event.city}
        </p>
        <p className="mt-2 text-base font-semibold text-soft-white">
          {formatPrice(event.isFree, event.price, event.currency)}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              openWa(
                event.waMessage ??
                  `Hola, quiero sumarme a ${event.title} el ${event.date} a las ${event.time}.`
              )
            }
          >
            {event.ctaLabel ?? "Quiero sumarme"}
          </Button>
          <Link
            to={`/eventos/${event.slug}`}
            className="btn border border-white/20 text-soft-white"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
