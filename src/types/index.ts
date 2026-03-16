import { ObjectId } from "mongodb";

export type ServiceType = "trikaal_astrology" | "vastu" | "trikaal_vastu";
export type ConsultationMode = "audio" | "video" | "in_person" | "online" | "onsite";
export type Tier = "regular" | "urgent";
export type EnquiryStatus = "new" | "in_progress" | "booked" | "completed" | "closed";

export interface Enquiry {
  _id?: ObjectId;
  enquiry_id: string; // "TRK-2024-0001"
  
  // Client Details
  full_name: string;
  email: string;
  whatsapp: string;
  preferred_language: "english" | "hindi" | "gujarati";
  
  // Service Selection
  service_type: ServiceType;
  consultation_mode: "audio" | "video" | "in_person";
  duration_minutes: 30 | 60 | null;
  tier: Tier;
  
  // Birth Details (Astrology only)
  birth_date: string | null;
  birth_time: string | null;
  birth_city: string | null;
  gender: "male" | "female" | "other" | null;
  age_confirmed_16_plus: boolean;
  
  // Property Details (Vastu only)
  property_type: "residential" | "commercial" | null;
  property_location: string | null;
  num_residents: number | null;
  
  // Message
  message: string;
  
  // Admin / Status
  status: EnquiryStatus;
  assigned_to: string | null;
  source_country: string | null;
  utm_source: string | null;
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
  is_archived: boolean;
}

export interface PricingItem {
  key: string;
  label: string;
  mode: ConsultationMode;
  type: "residential" | "commercial" | null;
  price_aed: number;
  available_locations: string[];
}

export interface PricingTier {
  tier_key: Tier;
  tier_label: string;
  items: PricingItem[];
}

export interface Pricing {
  _id?: ObjectId;
  service_key: ServiceType;
  service_label: string;
  fee_unit: "per_person" | "per_property";
  extra_per_person_aed: number | null;
  tiers: PricingTier[];
  updated_at: Date;
  updated_by: string;
}

export interface Service {
  _id?: ObjectId;
  service_key: ServiceType;
  display_name: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  topics: string[];
  requirements: {
    label: string;
    items: string[];
  };
  availability: {
    in_person_locations: string[];
    online_available: boolean;
    online_note: string;
  };
  is_active: boolean;
  sort_order: number;
  updated_at: Date;
}

export interface Settings {
  _id: "global";
  exchange_rate_inr: number;
  exchange_rate_updated: Date;
  whatsapp_number: string;
  notification_email: string;
  site_name: string;
  site_tagline: string;
  consultant_name: string;
  consultant_experience_years: number;
  consultant_languages: string[];
  minimum_age: number;
  confidentiality_statement: string;
  meta_title: string;
  meta_description: string;
  updated_at: Date;
  updated_by: string;
}

export interface EnquiryNote {
  _id?: ObjectId;
  enquiry_id: ObjectId;
  note_text: string;
  created_by: string;
  created_at: Date;
}
