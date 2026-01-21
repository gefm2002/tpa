import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import useSnapshot from "../utils/useSnapshot";

const Faq = () => {
  const { faqs } = useSnapshot();

  return (
    <Container className="py-10">
      <SectionTitle title="Preguntas frecuentes" subtitle="FAQ" />
      <div className="grid gap-4 md:grid-cols-2">
        {faqs
          .filter((faq) => faq.isActive)
          .map((faq) => (
            <Card key={faq.id}>
              <h3 className="text-base font-semibold text-soft-white">{faq.question}</h3>
              <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Faq;
