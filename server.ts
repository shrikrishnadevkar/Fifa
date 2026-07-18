import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      } catch (error) {
        console.error("Failed to initialize Google GenAI SDK:", error);
      }
    }
  }
  return aiClient;
}

// REST API endpoint for health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
  });
});

// Prompt-driven AI Assistant route
app.post("/api/chat", async (req, res) => {
  const { prompt, context, language = "English" } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const ai = getGeminiClient();
  const systemInstruction = `You are ArenaMind AI, the supreme smart tournament operations and fan experience brain for the FIFA World Cup 2026.
You manage stadium analytics, crowd control, transport, accessibility, volunteer logistics, food vendors, medical operations, and emergency response.

Tone guidelines:
- Highly professional, futuristic, and operational.
- Concise, actionable, and specific.
- Speak as the absolute command-center brain of the stadium.
- Support multilingual queries. The user requested responses in: ${language}. If a translation is requested, translate it perfectly.

Stadium details for context:
- Name: MetLife Stadium, New York / New Jersey (FIFA 2026 Final Host Venue)
- Capacity: 82,500
- Gates: Gate 1 (North), Gate 2 (VIP/Media), Gate 3 (East), Gate 4 (South), Gate 5 (Family), Gate 6 (West), Gate 7 (Wheelchair & Accessible)
- Parking Zones: P1 (North Lot, full), P2 (East Lot, 75% full), P3 (VIP, reserved), P4 (West Bus/Ride-share Terminal, 60% full)
- Food & Retail: 24 active stalls. Longest queue is at Kickoff Burgers (Gate 4, 18-min wait). Shortest is at GreenPitch Tacos (Gate 7, 2-min wait).
- Accessibility facilities: Double elevator shafts at Gate 7, tactile paving lines, hearing loops enabled in Section 112, sign language assistance at Information Desk 3.
- Medical facilities: Primary clinic under Section 118, secondary first-aid stations behind Sections 224 and 309. Response times average 2.4 minutes.
- Sustainability status: Current energy is 100% solar/wind offsets, 82% waste diverted from landfill via smart sorting bins, greywater systems active.

Current Live State Context: ${JSON.stringify(context || {})}`;

  if (!ai) {
    // If Gemini key is not configured, fall back to high-quality smart mock responses
    console.log("GEMINI_API_KEY is not configured or placeholder. Returning high-quality simulated operational response.");
    
    // Simulate smart responses based on prompt keywords to ensure a flawless presentation
    const p = prompt.toLowerCase();
    let responseText = "";

    if (p.includes("gate 7") || p.includes("wheelchair") || p.includes("accessible")) {
      responseText = `♿ **ArenaMind AI Access Routing:** Gate 7 is specifically configured for wheelchair and accessible entry. 
- **Current Congestion:** VERY LOW (Wait time: < 2 mins).
- **Amenities:** Direct access to Elevators A & B, tactile paving, and dedicated assistance volunteers (identifiable by Blue armbands).
- **Path of Travel:** Clear, step-free path directly to Section 100-112 concourse level.`;
    } else if (p.includes("translate") || p.includes("announcement")) {
      responseText = `📢 **FIFA Tournament Operations Broadcaster:**
      
**[English]** "Attention all fans in Zone 4. Please proceed to the nearest exit in an orderly fashion. Public transit bus lines are currently open and waiting at Terminal P4."

**[Spanish]** "Atención a todos los aficionados en la Zona 4. Por favor, diríjanse a la salida más cercana de manera ordenada. Las líneas de autobuses de transporte público están abiertas y esperando en la Terminal P4."

**[French]** "Attention à tous les supporters de la Zone 4. Veuillez vous diriger vers la sortie la plus proche de manière ordonnée. Les lignes de bus de transport en commun sont actuellement ouvertes et attendent au Terminal P4."`;
    } else if (p.includes("food") || p.includes("shortest") || p.includes("queue")) {
      responseText = `🍔 **Smart Food & Retail AI Recommendations:**
1. **GreenPitch Tacos (Gate 7):** Queue: 1 person | Wait time: **2 minutes** | Popular: Veggie Avocado Bowl.
2. **Striker Pizza (Gate 1):** Queue: 4 people | Wait time: **5 minutes** | Popular: Classic Margherita.
3. **Kickoff Burgers (Gate 4):** Queue: 24 people | Wait time: **18 minutes** (STAY AWAY - Overloaded). 
*ArenaMind AI recommends GreenPitch Tacos for fastest refueling based on current ticket scan locations.*`;
    } else if (p.includes("halftime") || p.includes("predict")) {
      responseText = `📈 **Halftime Crowd Congestion Predictive Analysis:**
- **Trigger event:** Halftime whistle in 4 minutes (Score: USA 1 - 1 MEX).
- **Movement Flow:** Anticipating 28,000 fans moving to restrooms and 15,000 to food vendors simultaneously.
- **Congestion Points:** Gate 4 Concourse (Red Alert - stampede mitigation protocol active).
- **Action Plan:** Dispatching 12 volunteers to Gate 4 bypass gates to ease flow. Opening secondary restrooms in Level 2 earlier.`;
    } else if (p.includes("emergency") || p.includes("rain") || p.includes("fire") || p.includes("evacuate")) {
      responseText = `🚨 **ArenaMind AI EMERGENCY ACTION REPORT:**
- **Incident Level:** Priority 1 Safety Protocol.
- **Evacuation Instructions:** Directing all Section 100 fans to exits Gate 1 and Gate 6. Avoid Concourse B.
- **Volunteer Orders:** Deploying 45 nearest volunteers to form human guide chains.
- **PA Announcement Draft:** "Ladies and gentlemen, please exit the arena immediately via the marked green routes. Do not use elevators. First responders are on scene."`;
    } else if (p.includes("volunteer") || p.includes("briefing")) {
      responseText = `📋 **ArenaMind AI Volunteer Command Center Briefing:**
- **Current Shift:** Afternoon - Matchday 4.
- **Task Distribution:** 65 volunteers at Gates, 40 at Navigation desks, 30 with Medical teams, 40 with Accessibility support.
- **Key Directive:** Prioritize guiding family groups away from the Gate 4 bottleneck toward the Gate 5 West transit bypass. Keep multilingual support tags active in your mobile terminals.`;
    } else if (p.includes("sustainability") || p.includes("report")) {
      responseText = `♻️ **World Cup Arena Sustainability Analytics:**
- **Energy Footprint:** 142 MWh total today (100% clean-offset, 34% solar generated on-site).
- **Water Consumption:** 240k Liters (Greywater recycling operational for flushers, saving 45% fresh water).
- **Waste Recovery:** 14.8 tons collected. 85% diverted successfully via GenAI-guided sorting bins.
- **Carbon Reduction Impact:** -42.4 metric tons CO2e vs. standard stadium operation profiles.`;
    } else {
      responseText = `🧠 **ArenaMind AI Central Brain Diagnostic Response:**
The prompt "${prompt}" has been analyzed using our tournament operations semantic engine.
- **Status:** All stadium operations operating within optimal tolerances.
- **Recommendation:** Keep monitoring Gate 4 crowd build-up. Metro services have increased train frequencies from 6 mins to 4 mins to prepare for departure.
- **Note:** Configured via simulated local operational matrix. Connect a Gemini API Key via 'Settings > Secrets' for live reasoning capability.`;
    }

    return res.json({
      text: responseText,
      simulated: true,
      timestamp: new Date().toISOString()
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text,
      simulated: false,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({
      error: "Failed to generate AI response. Please verify your GEMINI_API_KEY in Settings > Secrets.",
      details: error.message
    });
  }
});

// Serve frontend assets and start server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ArenaMind AI server listening on host 0.0.0.0 and port ${PORT}`);
  });
}

startServer();
