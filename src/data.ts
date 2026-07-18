import { StadiumZone, SecurityIncident, TransportLine, FoodStall, Volunteer } from "./types";

export const INITIAL_ZONES: StadiumZone[] = [
  { id: "z1", name: "North Stand (Zone A)", density: 34, capacity: 18000, occupancy: 6120, status: "optimal", incidentCount: 0, color: "bg-emerald-500" },
  { id: "z2", name: "VIP West Stand (Zone B)", density: 58, capacity: 12000, occupancy: 6960, status: "warning", incidentCount: 1, color: "bg-amber-500" },
  { id: "z3", name: "East Stand (Zone C)", density: 84, capacity: 22000, occupancy: 18480, status: "critical", incidentCount: 3, color: "bg-red-500" },
  { id: "z4", name: "South Stand (Zone D)", density: 42, capacity: 20000, occupancy: 8400, status: "optimal", incidentCount: 0, color: "bg-emerald-500" },
  { id: "z5", name: "Family Zone (North-West)", density: 30, capacity: 4000, occupancy: 1200, status: "optimal", incidentCount: 0, color: "bg-emerald-500" },
  { id: "z6", name: "Wheelchair Tier (South-West)", density: 25, capacity: 1500, occupancy: 375, status: "optimal", incidentCount: 0, color: "bg-emerald-500" },
  { id: "z7", name: "Media Stand (South-East)", density: 95, capacity: 2000, occupancy: 1900, status: "emergency", incidentCount: 2, color: "bg-red-900" },
  { id: "z8", name: "VIP Suites (North-East)", density: 72, capacity: 3000, occupancy: 2160, status: "warning", incidentCount: 0, color: "bg-amber-500" },
];

export const INITIAL_INCIDENTS: SecurityIncident[] = [
  { id: "i1", type: "Suspicious Behavior", severity: "medium", location: "Gate 4 Concourse", time: "08:42", status: "responding", assignedVolunteerId: "v2", aiIncidentReport: "Secur-X Bot identified an unattended knapsack in the outer turnstile queue. Drone dispatch dispatched for radiological sniffing." },
  { id: "i2", type: "Medical Call: Dehydration", severity: "low", location: "Section 224 Row G", time: "08:50", status: "resolved", assignedVolunteerId: "v1", aiIncidentReport: "Heat stress incident logged. Volunteer dispatch escorted visitor to internal air-conditioned rest station 3. Vital fluids administered." },
  { id: "i3", type: "Crowd Aggression", severity: "high", location: "East Gate 3 Barricades", time: "08:55", status: "reporting", aiIncidentReport: "Slight surge in density. Multi-camera feed analyses crowd velocity and flags stampede risk as high due to barricade narrow path." },
];

export const INITIAL_TRANSPORT: TransportLine[] = [
  { id: "t1", type: "Metro", name: "World Cup Express (Line 1)", status: "on-time", load: 78, frequency: "Every 4 mins", delayMinutes: 0 },
  { id: "t2", type: "Metro", name: "East Rutherford Shuttle", status: "delayed", load: 92, frequency: "Every 6 mins", delayMinutes: 8 },
  { id: "t3", type: "Bus", name: "FIFA Hub Shuttle (Terminal P4)", status: "on-time", load: 45, frequency: "Every 5 mins", delayMinutes: 0 },
  { id: "t4", type: "Taxi", name: "Express Cab Loop", status: "on-time", load: 30, frequency: "Continuous", delayMinutes: 0 },
  { id: "t5", type: "Parking", name: "P1 North Lot (Fans)", status: "critical", load: 100, frequency: "Full", delayMinutes: 0 },
  { id: "t6", type: "Parking", name: "P2 East Lot (Fans)", status: "optimal", load: 75, frequency: "250 spaces left", delayMinutes: 0 },
];

export const INITIAL_FOOD: FoodStall[] = [
  { id: "f1", name: "Striker Pizza", location: "Gate 1", queueLength: 4, waitTime: 5, inventoryLevel: 82, popularMeal: "Pepperoni slice" },
  { id: "f2", name: "Kickoff Burgers", location: "Gate 4", queueLength: 24, waitTime: 18, inventoryLevel: 40, popularMeal: "Double-decker beef" },
  { id: "f3", name: "GreenPitch Tacos", location: "Gate 7", queueLength: 1, waitTime: 2, inventoryLevel: 95, popularMeal: "Vegan Avocado Taco" },
  { id: "f4", name: "Halftime Hotdogs", location: "Gate 3", queueLength: 12, waitTime: 12, inventoryLevel: 60, popularMeal: "Footlong stadium link" },
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  { id: "v1", name: "Carlos Santana", status: "busy", location: "Section 224", languages: ["English", "Spanish"], skills: ["First Aid", "Navigation Support"], assignedTask: "Escort heat-stroke visitor" },
  { id: "v2", name: "Amina Al-Jamil", status: "busy", location: "Gate 4 Turnstiles", languages: ["English", "Arabic", "French"], skills: ["Crowd Marshaling"], assignedTask: "Direct Gate 4 bypass queue" },
  { id: "v3", name: "Kenji Tanaka", status: "available", location: "Information Desk 3", languages: ["English", "Japanese"], skills: ["Accessibility Liaison", "Sign Language Translator"] },
  { id: "v4", name: "Rohan Sharma", status: "available", location: "Gate 7 Elevator lobby", languages: ["English", "Hindi", "Kannada"], skills: ["Wheelchair Escort", "Multilingual Support"] },
];

// PITCH DECK CONTENT
export const PITCH_SLIDES = [
  {
    title: "The Problem",
    subtitle: "Stadium Operations are Fragmented & Reactive",
    points: [
      "**Information Silos:** Medical, transport, security, and cleaning services operate on legacy isolated radio channels.",
      "**Reactive Crisis Mitigation:** Crowd bottlenecking and heat stress events are only flagged after they cascade into emergencies.",
      "**Multilingual & Accessibility Gaps:** 100,000 global fans descend on one site, overwhelming local sign-language and translation staffs.",
      "**Waste & Energy Auditing Costs:** Manual counts delay carbon-footprint and greywater reconciliation by several weeks."
    ]
  },
  {
    title: "Our Solution: ArenaMind AI",
    subtitle: "The Autonomous GenAI Brain for Stadium Operations",
    points: [
      "**Telemetry Conflux:** Aggregates real-time feeds from CCTV camera streams, IoT turnstiles, parking databases, and shuttle GPS trackers.",
      "**Central Brain (Gemini 3.5 Flash):** Evaluates overall stadium stress indices and explains anomalies in natural conversational language.",
      "**Interactive Digital Twin:** Draws predictive heatmaps and live pathfinders for immediate medical and wheelchair transit.",
      "**Autonomous Co-Pilot:** Dynamically drafts loudspeaker broadcasts, schedules crowd marshal dispatches, and generates audited PDF packages."
    ]
  },
  {
    title: "Market Innovation & Value",
    subtitle: "Why ArenaMind AI Wins Stadium Management",
    points: [
      "**Proactive Pathfinder Routing:** Instantly shifts transit maps to guide fans through 'Low-Congestion' or 'Accessible battery-powered lifts' before bottlenecks form.",
      "**Universal Accessibility:** Real-time speech-to-speech visual sign language avatar loops and screen-reader telemetry logs.",
      "**GenAI Crisis Automation:** Zero-lag emergency broadcast drafts for 8 major incidents, coordinating with police and news liaisons automatically.",
      "**Sustainability Cryptoseal:** Secures greywater and solar offset metrics into immutable operation reports."
    ]
  },
  {
    title: "Google Technologies Used",
    subtitle: "Google Cloud Platform & Vertex AI Integration",
    points: [
      "**Gemini 3.5 Flash:** Powers the lightning-fast natural language central brain and crisis briefing generators.",
      "**Vertex AI Agent Interactions:** Enables low-latency operational chat dialogues with multi-agency perspective filtering.",
      "**Google Maps Platform:** Address validation and directions routing API to safely schedule shuttle buses to Terminal P4.",
      "**BigQuery Analytics:** Continuous telemetry indexing for historical water, waste, and gate ingress charts.",
      "**Cloud Run Containers:** Hosting full-stack Express + Vite with extreme cold-start optimization."
    ]
  },
  {
    title: "The Financial Model",
    subtitle: "Estimated Cost Breakdown & ROI Analysis",
    points: [
      "**API Computing Cost:** $0.0015 per ticket scanned. Gemini Flash is highly cost-effective, running under $150 per full tournament matchday.",
      "**Operational Savings:** -22% medical responder minutes, -35% water waste, and -40% crowd bottleneck delays.",
      "**Carbon Tax Offsets:** Immutable sustainability reports prove carbon mitigation, securing up to $80k per season in eco-credits."
    ]
  }
];

// TECH SPEC CONTENT
export const TECH_SPEC = {
  databaseSchema: `
-- ArenaMind AI Database Blueprint (PostgreSQL / Cloud SQL)

CREATE TABLE stadium_zones (
    zone_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    current_occupancy INT DEFAULT 0,
    density_percentage INT DEFAULT 0,
    safety_status VARCHAR(20) DEFAULT 'optimal' -- optimal, warning, critical
);

CREATE TABLE incidents (
    incident_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
    location VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'reporting', -- reporting, responding, resolved
    assigned_volunteer_id VARCHAR(20),
    ai_incident_summary TEXT
);

CREATE TABLE volunteer_roster (
    volunteer_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    status VARCHAR(20) DEFAULT 'available', -- available, busy, offline
    languages VARCHAR[] NOT NULL,
    skills VARCHAR[] NOT NULL
);
  `,
  apiDesign: `
// Express API endpoints for ArenaMind Command Hub

POST   /api/chat
Request:  { prompt: string, context: object, language: string }
Response: { text: string, simulated: boolean, timestamp: string }

GET    /api/health
Response: { status: "ok", geminiConfigured: boolean, timestamp: string }

POST   /api/emergency/trigger
Request:  { incidentType: string }
Response: { announcementScript: string, evacuationPlan: string }

GET    /api/telemetry/zones
Response: Array<StadiumZone>
  `,
  winningPitch: `
ArenaMind AI is the undisputed sovereign platform for modern sports arena command. 
Existing stadium platforms are passive, displaying static metrics on separate, unlinked screens. 
ArenaMind is an active, conversational neural network. It connects security, medical, cleaning, transport, and volunteers under a single generative brain. 
By translating complex IoT telemetry into natural operational language, we give FIFA coordinators super-powers to prevent accidents before they manifest, making World Cup 2026 the safest, greenest, and most accessible sport spectacle in history.
  `,
  judgeQa: [
    {
      q: "How does the system ensure privacy while managing crowd densities?",
      a: "ArenaMind uses edge-based Vision AI to count density grids without storing or processing identifiable biometric faces. All database variables represent raw integers (counts per sector), ensuring complete compliance with GDPR and local US state privacy laws."
    },
    {
      q: "What is the fallback if the internet fails during an active stadium power outage?",
      a: "The digital twin runs an offline-first service worker. If public networks collapse, the local stadium server broadcasts safety plans via localized peer-to-peer Wi-Fi networks directly to volunteer terminals."
    },
    {
      q: "Is it difficult for elderly volunteers to use a high-tech AI dashboard?",
      a: "No! ArenaMind's core volunteer UI operates strictly on vocal commands and localized text messaging. Volunteers talk to the co-pilot in their native tongue as if talking to a human commander, bypassing complex app navigation menus entirely."
    }
  ]
};
