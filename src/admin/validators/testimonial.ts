import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  text: z.string().min(5, "Texto requerido"),
  rating: z.number().min(1).max(5),
});
