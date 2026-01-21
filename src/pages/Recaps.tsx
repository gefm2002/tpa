import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import GalleryGrid from "../components/GalleryGrid";
import Card from "../components/Card";
import useSnapshot from "../utils/useSnapshot";

const Recaps = () => {
  const { recaps } = useSnapshot();

  return (
    <Container className="py-10">
      <SectionTitle title="Esto pasó" subtitle="Recaps" />
      <div className="grid gap-8">
        {recaps
          .filter((recap) => recap.isActive)
          .map((recap) => (
            <Card key={recap.id}>
              <p className="text-sm text-neutral-300">{recap.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-soft-white">{recap.title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{recap.description}</p>
              <div className="mt-4">
                <GalleryGrid images={recap.images} />
              </div>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Recaps;
