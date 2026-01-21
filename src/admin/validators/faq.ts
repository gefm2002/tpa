import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(3, "Pregunta requerida"),
  answer: z.string().min(3, "Respuesta requerida"),
});
