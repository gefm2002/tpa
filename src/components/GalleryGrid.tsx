import type { EventImage } from "../types";

interface GalleryGridProps {
  images: EventImage[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
    {images.map((image) => (
      <div key={image.id} className="relative overflow-hidden rounded-2xl border border-white/10">
        <img
          src={image.dataUrl}
          alt={image.alt}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
    ))}
  </div>
);

export default GalleryGrid;
