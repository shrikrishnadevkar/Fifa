export type UserRole =
  | "Tournament Operations"
  | "Security Intelligence"
  | "Medical Teams"
  | "Volunteers"
  | "Fans"
  | "Transport Teams"
  | "Cleaning Teams"
  | "Food Vendors"
  | "VIP Management"
  | "Accessibility Support";

export interface StadiumZone {
  id: string;
  name: string;
  density: number; // 0 to 100
  capacity: number;
  occupancy: number;
  status: "optimal" | "warning" | "critical" | "emergency";
  incidentCount: number;
  color: string; // Tailwind color class or hex
}

export interface SecurityIncident {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  time: string;
  status: "reporting" | "responding" | "resolved";
  assignedVolunteerId?: string;
  aiIncidentReport?: string;
}

export interface TransportLine {
  id: string;
  type: "Metro" | "Bus" | "Taxi" | "Ride-sharing" | "Parking";
  name: string;
  status: "on-time" | "delayed" | "critical" | "suspended" | "optimal";
  load: number; // percentage
  frequency: string;
  delayMinutes: number;
}

export interface FoodStall {
  id: string;
  name: string;
  location: string;
  queueLength: number;
  waitTime: number; // in minutes
  inventoryLevel: number; // percentage
  popularMeal: string;
}

export interface Volunteer {
  id: string;
  name: string;
  status: "available" | "busy" | "offline";
  location: string;
  languages: string[];
  skills: string[];
  assignedTask?: string;
  etaMinutes?: number;
}

export interface EmergencyState {
  isActive: boolean;
  type: "Fire" | "Earthquake" | "Medical Emergency" | "Bomb Threat" | "Power Outage" | "Heavy Rain" | "Crowd Panic" | "Missing Child" | null;
  timestamp?: string;
  announcement?: string;
  evacuationRoute?: string;
  instructions?: string;
}

export interface SustainabilityMetric {
  electricityUsage: number; // in MWh
  waterUsage: number; // in kL (Kiloliters)
  wasteCollected: number; // in Tons
  recyclingRate: number; // percentage
  carbonSavings: number; // in Tons CO2e
}
