import type { EventImage } from "../types";

interface GalleryGridProps {
  images: EventImage[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
    {images.map((image) => (
      <div key={image.id} className="relative overflow-hidden rounded-2xl">
        <img
          src={image.dataUrl}
          alt={image.alt}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    ))}
  </div>
);

export default GalleryGrid;
