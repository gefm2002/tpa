import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Título requerido"),
  slug: z.string().min(3, "Slug requerido"),
  type: z.enum(["nocturna", "diurna", "escapada", "especial"]),
  status: z.enum(["upcoming", "past", "cancelled"]),
  date: z.string().min(10, "Fecha requerida"),
  time: z.string().min(4, "Hora requerida"),
  locationName: z.string().min(2, "Lugar requerido"),
  address: z.string().min(2, "Dirección requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  mapEmbedUrl: z.string().min(10, "Mapa requerido"),
  directionsUrl: z.string().min(10, "Link de mapa requerido"),
});
