import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import Badge from "../components/Badge";
import Button from "../components/Button";
import MapEmbed from "../components/MapEmbed";
import Card from "../components/Card";
import useSnapshot from "../utils/useSnapshot";
import { formatDate, formatPrice } from "../utils/format";
import { openWa } from "../utils/whatsapp";

const EventDetail = () => {
  const { slug } = useParams();
  const { events, settings } = useSnapshot();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return (
      <Container className="py-20">
        <Card>
          <p className="text-sm text-neutral-300">No encontramos ese evento.</p>
          <Link className="mt-3 inline-block text-accent" to="/eventos">
            Volver a eventos
          </Link>
        </Card>
      </Container>
    );
  }

  const cover = event.images.find((img) => img.isCover) ?? event.images[0];

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            {cover && (
              <img src={cover.dataUrl} alt={cover.alt} className="h-72 w-full object-cover" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{event.type}</Badge>
            {event.isFree ? <Badge>Gratuita</Badge> : <Badge>Pago</Badge>}
            {(event.ageMin || settings.ageRuleText) && (
              <Badge>{event.ageMin ? `+${event.ageMin}` : settings.ageRuleText}</Badge>
            )}
          </div>
          <h1 className="text-3xl font-semibold text-soft-white">{event.title}</h1>
          <p className="text-neutral-300">
            {formatDate(event.date)} · {event.time}
            {event.endTime ? ` a ${event.endTime}` : ""}
          </p>
          <p className="text-lg font-semibold text-soft-white">
            {formatPrice(event.isFree, event.price, event.currency)}
          </p>
          <Card>
            <p className="text-sm text-neutral-300">Lugar</p>
            <p className="mt-2 text-lg font-semibold text-soft-white">
              {event.locationName}
            </p>
            <p className="text-sm text-neutral-300">{event.address}</p>
            <p className="text-sm text-neutral-300">{event.zone ?? event.city}</p>
            <p className="mt-3 text-sm text-neutral-300">{event.meetupNote}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  openWa(
                    event.waMessage ??
                      `Hola, quiero sumarme a ${event.title} el ${event.date} a las ${event.time}.`
                  )
                }
              >
                {event.ctaLabel ?? "Quiero sumarme"}
              </Button>
              <a
                href={event.directionsUrl}
                target="_blank"
                rel="noopener"
                className="btn border border-white/20 text-soft-white"
              >
                Cómo llegar
              </a>
            </div>
          </Card>
          <MapEmbed src={event.mapEmbedUrl} title={event.title} />
        </div>
        <div className="space-y-6">
          {event.includes?.length ? (
            <Card>
              <h3 className="text-lg font-semibold text-soft-white">Qué incluye</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                {event.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Card>
          ) : null}
          {event.agenda?.length ? (
            <Card>
              <h3 className="text-lg font-semibold text-soft-white">Agenda</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                {event.agenda.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Card>
          ) : null}
          {event.dressCode ? (
            <Card>
              <h3 className="text-lg font-semibold text-soft-white">Dress code</h3>
              <p className="mt-2 text-sm text-neutral-300">{event.dressCode}</p>
            </Card>
          ) : null}
          {event.capacity ? (
            <Card>
              <h3 className="text-lg font-semibold text-soft-white">Cupos</h3>
              <p className="mt-2 text-sm text-neutral-300">{event.capacity} lugares</p>
            </Card>
          ) : null}
          <Card>
            <h3 className="text-lg font-semibold text-soft-white">Te respondemos por WhatsApp</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Si tenés dudas, escribinos y te contamos todo.
            </p>
            <Button
              className="mt-4"
              onClick={() =>
                openWa(
                  event.waMessage ??
                    `Hola, quiero sumarme a ${event.title} el ${event.date} a las ${event.time}.`
                )
              }
            >
              Quiero sumarme
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default EventDetail;
