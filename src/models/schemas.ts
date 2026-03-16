import { z } from "zod";

export const EnquirySchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 characters"),
  preferred_language: z.enum(["english", "hindi", "gujarati"]),
  service_type: z.enum(["trikaal_astrology", "vastu", "trikaal_vastu"]),
  consultation_mode: z.enum(["audio", "video", "in_person"]),
  duration_minutes: z.preprocess((val) => (val === "" ? null : Number(val)), z.enum(["30", "60"]).nullable().optional()).or(z.literal(30).or(z.literal(60)).nullable()),
  tier: z.enum(["regular", "urgent"]),
  
  // Birth Details
  birth_date: z.string().nullable().optional(),
  birth_time: z.string().nullable().optional(),
  birth_city: z.string().nullable().optional(),
  gender: z.enum(["male", "female", "other"]).nullable().optional(),
  age_confirmed_16_plus: z.boolean().refine(val => val === true, "You must be 16+ to apply"),
  
  // Property Details
  property_type: z.enum(["residential", "commercial"]).nullable().optional(),
  property_location: z.string().nullable().optional(),
  num_residents: z.number().nullable().optional(),
  
  message: z.string().max(1000, "Message must be under 1000 characters"),
});

export type EnquiryFormValues = z.infer<typeof EnquirySchema>;
