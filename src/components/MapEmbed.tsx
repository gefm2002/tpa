interface MapEmbedProps {
  src: string;
  title?: string;
}

const MapEmbed = ({ src, title = "Mapa" }: MapEmbedProps) => (
  <div className="overflow-hidden rounded-2xl border border-white/10">
    <iframe
      src={src}
      title={title}
      className="h-64 w-full"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default MapEmbed;
