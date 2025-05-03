
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez saisir une adresse email valide" }).optional().or(z.literal('')),
  phone: z.string().min(9, { message: "Veuillez saisir un numéro de téléphone valide" }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
