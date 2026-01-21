import type { EventImage } from "../../types";

interface ImageUploaderProps {
  images: EventImage[];
  onChange: (images: EventImage[]) => void;
}

const ImageUploader = ({ images, onChange }: ImageUploaderProps) => {
  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const newImages: EventImage[] = [];
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
        reader.readAsDataURL(file);
      });

      newImages.push({
        id: `img-${Date.now()}-${file.name}`,
        dataUrl,
        alt: file.name,
        order: images.length + newImages.length,
        isCover: images.length === 0 && newImages.length === 1,
      });
    }

    onChange([...images, ...newImages]);
  };

  const setCover = (id: string) => {
    onChange(images.map((img) => ({ ...img, isCover: img.id === id })));
  };

  const removeImage = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
  };

  const moveImage = (index: number, direction: number) => {
    const updated = [...images];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange(
      updated.map((img, idx) => ({
        ...img,
        order: idx + 1,
      }))
    );
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => handleFiles(event.target.files)}
        className="w-full rounded-lg border border-white/20 bg-neutral-900 px-3 py-2 text-sm"
      />
      <div className="grid gap-3 md:grid-cols-2">
        {images.map((image, index) => (
          <div key={image.id} className="rounded-xl border border-white/10 p-3">
            <img src={image.dataUrl} alt={image.alt} className="h-32 w-full rounded-lg object-cover" />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-300">
              <button className="text-accent" onClick={() => setCover(image.id)}>
                {image.isCover ? "Cover" : "Marcar cover"}
              </button>
              <div className="flex gap-2">
                <button onClick={() => moveImage(index, -1)}>↑</button>
                <button onClick={() => moveImage(index, 1)}>↓</button>
                <button onClick={() => removeImage(image.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
