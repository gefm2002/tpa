import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import Button from "../components/Button";
import useSnapshot from "../utils/useSnapshot";
import { useWhatsAppLeadForm } from "../components/WhatsAppLeadForm";

const Contact = () => {
  const { settings } = useSnapshot();
  const { openForm } = useWhatsAppLeadForm();

  return (
    <Container className="py-10">
      <SectionTitle title="Contacto" subtitle="Hablemos" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-neutral-300">WhatsApp</p>
          <p className="mt-2 text-lg font-semibold text-soft-white">
            {settings.whatsappNumber}
          </p>
          <Button className="mt-4" onClick={() => openForm()}>
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
            También podés escribirnos por DM.
          </p>
        </Card>
      </div>
    </Container>
  );
};

export default Contact;
