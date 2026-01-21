import { Link } from "react-router-dom";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Badge from "../components/Badge";
import Button from "../components/Button";
import EventCard from "../components/EventCard";
import GalleryGrid from "../components/GalleryGrid";
import Card from "../components/Card";
import useSnapshot from "../utils/useSnapshot";
import { openWa } from "../utils/whatsapp";

const Home = () => {
  const { events, recaps, faqs, testimonials, settings } = useSnapshot();

  const upcoming = events
    .filter((event) => event.status === "upcoming" && event.isActive)
    .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order)
    .slice(0, 6);

  const recapImages = recaps
    .filter((recap) => recap.isActive)
    .slice(0, 6)
    .flatMap((recap) => recap.images);

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/stock/hero-night.svg"
            alt="Grupo saliendo de noche"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <Container className="relative z-10 py-20">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-accent/80">
              {settings.mentionText}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-soft-white md:text-5xl">
              Salidas para conocer gente en CABA
            </h1>
            <p className="mt-4 text-lg text-neutral-200">
              Planes diurnos y nocturnos para ampliar tu círculo social.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {settings.ageRuleText && <Badge>+35</Badge>}
              <Badge>Mixtas</Badge>
              <Badge>{settings.zonesText}</Badge>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => openWa()}>
                Escribinos por WhatsApp
              </Button>
              <Link to="/eventos" className="btn border border-white/20 text-soft-white">
                Ver próximas salidas
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionTitle title="Próximas salidas" subtitle="Noches y planes diurnos" />
          <div className="grid gap-6 md:grid-cols-2">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionTitle title="Cómo funciona" subtitle="Simple y real" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Elegís un plan",
                text: "Mirás las próximas salidas y elegís la que te va.",
              },
              {
                title: "Te sumás por WhatsApp",
                text: "Nos escribís y te respondemos rápido.",
              },
              {
                title: "Venís y conectás",
                text: "Charlas con gente nueva y la pasás bien.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="text-lg font-semibold text-soft-white">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{item.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="flex items-center justify-between">
            <SectionTitle title="Esto pasó" subtitle="Recaps" />
            <Link to="/recaps" className="text-sm text-accent hover:text-accent/80">
              Ver galería
            </Link>
          </div>
          <GalleryGrid images={recapImages} />
        </Container>
      </section>

      <section>
        <Container>
          <SectionTitle title="Testimonios" subtitle="Gente real" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials
              .filter((testimonial) => testimonial.isActive)
              .slice(0, 6)
              .map((testimonial) => (
                <Card key={testimonial.id}>
                  <p className="text-sm text-neutral-200">"{testimonial.text}"</p>
                  <p className="mt-3 text-sm font-semibold text-soft-white">
                    {testimonial.name} · {"★".repeat(testimonial.rating)}
                  </p>
                </Card>
              ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="flex items-center justify-between">
            <SectionTitle title="FAQ" subtitle="Dudas rápidas" />
            <Link to="/faq" className="text-sm text-accent hover:text-accent/80">
              Ver todas
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs
              .filter((faq) => faq.isActive)
              .slice(0, 6)
              .map((faq) => (
                <Card key={faq.id}>
                  <h3 className="text-base font-semibold text-soft-white">{faq.question}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
                </Card>
              ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <SectionTitle title="Contacto" subtitle="Hablamos por WhatsApp" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-sm text-neutral-300">WhatsApp</p>
              <p className="mt-2 text-lg font-semibold text-soft-white">
                {settings.whatsappNumber}
              </p>
              <Button className="mt-4" onClick={() => openWa()}>
                Escribinos
              </Button>
            </Card>
            <Card>
              <p className="text-sm text-neutral-300">Instagram</p>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener"
                className="mt-2 block text-lg font-semibold text-soft-white"
              >
                {settings.instagramUrl}
              </a>
              <p className="mt-3 text-sm text-neutral-300">
                Seguinos para ver los próximos planes.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
