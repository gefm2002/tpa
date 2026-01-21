import { z } from "zod";

export const settingsSchema = z.object({
  communityName: z.string().min(2, "Nombre requerido"),
  whatsappNumber: z.string().min(6, "Número requerido"),
  whatsappDefaultMessage: z.string().min(4, "Mensaje requerido"),
  instagramUrl: z.string().min(5, "Instagram requerido"),
  zonesText: z.string().min(2, "Zonas requerido"),
  ageRuleText: z.string().min(1, "Edad requerida"),
  mentionText: z.string().min(2, "Mención requerida"),
});
