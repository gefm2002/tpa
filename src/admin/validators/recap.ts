import { z } from "zod";

export const recapSchema = z.object({
  title: z.string().min(3, "Título requerido"),
  date: z.string().min(10, "Fecha requerida"),
  description: z.string().min(5, "Descripción requerida"),
});
