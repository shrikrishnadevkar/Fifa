import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Activity,
  Users,
  Settings,
  Volume2,
  Sparkles,
  Navigation,
  Globe,
  PhoneCall,
  Check,
  AlertTriangle,
  Play,
  HelpCircle,
  RefreshCw,
  FileText,
  Download,
  Layers,
  Shield,
  Ambulance,
  Camera,
  Eye,
  Trash2,
  Wind,
  Droplets,
  Landmark,
  Zap,
  Sun,
  Tv,
  Accessibility,
  Presentation,
  Terminal,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";

import { StadiumZone, SecurityIncident, TransportLine, FoodStall, Volunteer, UserRole } from "./types";
import {
  INITIAL_ZONES,
  INITIAL_INCIDENTS,
  INITIAL_TRANSPORT,
  INITIAL_FOOD,
  INITIAL_VOLUNTEERS,
  PITCH_SLIDES,
  TECH_SPEC
} from "./data";

import StadiumHeatmap from "./components/StadiumHeatmap";
import DashboardAnalytics from "./components/DashboardAnalytics";
import AIAssistant from "./components/AIAssistant";
import EmergencyControl from "./components/EmergencyControl";
import ReportCenter from "./components/ReportCenter";

export default function App() {
  // Navigation / Tab layout
  const [activeTab, setActiveTab] = useState<"operations" | "presentation">("operations");

  // Perspective role state
  const [activeRole, setActiveRole] = useState<UserRole>("Tournament Operations");

  // Core Simulation States
  const [zones, setZones] = useState<StadiumZone[]>(INITIAL_ZONES);
  const [incidents, setIncidents] = useState<SecurityIncident[]>(INITIAL_INCIDENTS);
  const [transport, setTransport] = useState<TransportLine[]>(INITIAL_TRANSPORT);
  const [foodStalls, setFoodStalls] = useState<FoodStall[]>(INITIAL_FOOD);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  
  // Navigation Path selection
  const [activeNavPath, setActiveNavPath] = useState<string>("");

  // Emergency Mode state
  const [activeEmergency, setActiveEmergency] = useState<string | null>(null);

  // Selected Zone ID for detailing
  const [selectedZoneId, setSelectedZoneId] = useState<string>("z3");

  // Secondary interactive views
  const [viewRightPanel, setViewRightPanel] = useState<"ai-assistant" | "analytics">("ai-assistant");

  // Accessibility States
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [screenReaderLog, setScreenReaderLog] = useState<string[]>(["Welcome: Screen Reader Mode Active. Select role perspective or stadium zone."]);

  // Presentation Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationSubTab, setPresentationSubTab] = useState<"slides" | "architecture" | "db" | "api" | "pitch" | "qa">("slides");

  // Simulated live clock state
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dispatch a message to screen reader list
  const dispatchScreenReader = (msg: string) => {
    setScreenReaderLog((prev) => [msg, ...prev.slice(0, 9)]);
  };

  // Switch perspective actions
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    dispatchScreenReader(`Switched user dashboard perspective to: ${role}`);
    
    // Auto-select path based on role to make it feel deeply integrated!
    if (role === "Accessibility Support") {
      setActiveNavPath("wheelchair");
    } else if (role === "VIP Management") {
      setActiveNavPath("vip");
    } else if (role === "Volunteers") {
      setActiveNavPath("volunteer");
    } else if (role === "Security Intelligence") {
      setActiveNavPath("safest");
    } else {
      setActiveNavPath("");
    }
  };

  // Click zone on the digital twin heatmap
  const handleSelectZone = (zone: StadiumZone) => {
    setSelectedZoneId(zone.id);
    dispatchScreenReader(`Inspecting stadium sector: ${zone.name}. Occupancy is ${zone.occupancy} fans out of ${zone.capacity} capacity.`);
  };

  // Add random dynamic fluctuation to simulate real-time live data feed
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate zone densities gently
      setZones((prevZones) =>
        prevZones.map((z) => {
          const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
          const newDensity = Math.max(10, Math.min(100, z.density + delta));
          const newOccupancy = Math.floor((newDensity / 100) * z.capacity);
          let newStatus = z.status;
          if (newStatus !== "emergency") {
            newStatus = newDensity > 80 ? "critical" : newDensity > 55 ? "warning" : "optimal";
          }
          return {
            ...z,
            density: newDensity,
            occupancy: newOccupancy,
            status: newStatus
          };
        })
      );

      // Fluctuate wait times at food stalls
      setFoodStalls((prevStalls) =>
        prevStalls.map((s) => {
          const delta = Math.floor(Math.random() * 3) - 1; // -1 to +1
          return {
            ...s,
            waitTime: Math.max(1, s.waitTime + delta),
            queueLength: Math.max(0, s.queueLength + delta)
          };
        })
      );
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Change emergency status
  const handleTriggerEmergency = (type: string | null) => {
    setActiveEmergency(type);
    if (type) {
      dispatchScreenReader(`🔴 CRITICAL ALARM TRIGGERED: Stadium operators reported active: ${type}`);
      // Elevate multiple stands to emergency statuses
      setZones((prev) =>
        prev.map((z) =>
          z.id === "z3" || z.id === "z7"
            ? { ...z, density: 98, occupancy: z.capacity, status: "emergency" }
            : z
        )
      );
    } else {
      dispatchScreenReader(`🟢 Emergency alarms cleared. Restoring standard stadium operations protocol.`);
      setZones(INITIAL_ZONES);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all selection:bg-blue-600 selection:text-white ${
      highContrast ? "border-[8px] border-yellow-400 p-2" : ""
    } ${largeText ? "text-lg" : "text-sm"}`}>

      {/* Top Banner & Accessibility controls */}
      <div className="bg-slate-950 border-b border-slate-900 px-4 py-2 flex flex-wrap justify-between items-center text-[11px] gap-2">
        <div className="flex items-center gap-4 font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            {currentTime}
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            FIFA LIAISON COMPLIANT SECURE LINK
          </span>
        </div>

        {/* Accessibility Control Suite */}
        <div className="flex items-center gap-3 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800/80">
          <Accessibility className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">A11y Terminal:</span>
          
          <button
            onClick={() => {
              setHighContrast(!highContrast);
              dispatchScreenReader(`Toggled High Contrast Mode: ${!highContrast ? "Enabled" : "Disabled"}`);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border transition-all ${
              highContrast ? "bg-yellow-400 text-slate-950 border-yellow-300" : "bg-slate-950 text-cyan-400 border-cyan-900/50 hover:border-cyan-500/30"
            }`}
          >
            CONTRAST
          </button>

          <button
            onClick={() => {
              setLargeText(!largeText);
              dispatchScreenReader(`Toggled Large Font Size: ${!largeText ? "Enabled" : "Disabled"}`);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border transition-all ${
              largeText ? "bg-cyan-500 text-slate-950 border-cyan-400" : "bg-slate-950 text-cyan-400 border-cyan-900/50 hover:border-cyan-500/30"
            }`}
          >
            FONT SIZE
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex flex-col xl:flex-row justify-between items-center gap-4 z-20">
        {/* Branding & slogan */}
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-black tracking-tighter text-lg select-none shrink-0">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white font-display uppercase">ArenaMind AI</h1>
              <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20 uppercase font-bold tracking-widest font-mono">
                CORE SYSTEM
              </span>
            </div>
            <p className="text-[10px] text-cyan-400 tracking-[0.2em] uppercase font-bold font-mono mt-0.5">
              FIFA WORLD CUP 2026 OPERATIONAL CORE
            </p>
          </div>
        </div>

        {/* Global Navigation Switcher: Operations vs Technical Specs Presentation */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 mx-auto xl:mx-0 shrink-0">
          <button
            onClick={() => {
              setActiveTab("operations");
              dispatchScreenReader("Switched to FIFA Control Desk");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "operations"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-4 h-4" />
            FIFA Control Desk
          </button>
          <button
            onClick={() => {
              setActiveTab("presentation");
              dispatchScreenReader("Switched to Pitch Deck Presentation");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "presentation"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Presentation className="w-4 h-4" />
            Pitch Deck & Tech Specs
          </button>
        </div>

        {/* Live Telemetry Status Center */}
        <div className="flex items-center justify-between xl:justify-end gap-6 w-full xl:w-auto border-t border-slate-800/50 xl:border-0 pt-3 xl:pt-0">
          <div className="flex flex-col items-start xl:items-end">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Live Match</span>
            <span className="text-xs sm:text-sm font-mono text-cyan-300 font-bold">ARG 2 - 1 BRA | 72'</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>
          <div className={`flex flex-col items-start xl:items-end ${activeEmergency ? "text-rose-500 font-bold" : activeRole === "Security Intelligence" ? "text-amber-500 font-bold" : "text-emerald-400 font-bold"}`}>
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Security Level</span>
            <span className="text-xs sm:text-sm uppercase flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeEmergency ? "bg-rose-500 animate-pulse" : activeRole === "Security Intelligence" ? "bg-amber-500 animate-pulse" : "bg-emerald-400 animate-pulse"}`}></span>
              {activeEmergency ? "CRITICAL ALERT" : activeRole === "Security Intelligence" ? "ELEVATED" : "OPTIMAL"}
            </span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>
          <div className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center shadow-lg text-cyan-400 relative shrink-0">
            <div className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${activeEmergency ? "bg-rose-500 animate-pulse" : "bg-cyan-400 shadow-[0_0_8px_cyan]"}`} />
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Screen Reader Log (Invisible to standard styling unless expanded) */}
      <div className="bg-slate-950 px-6 py-1 border-b border-slate-900 text-[10px] text-slate-500 font-mono flex gap-2 items-center">
        <Accessibility className="w-3 h-3 text-yellow-400 shrink-0" />
        <span className="font-bold text-slate-400 shrink-0">Screen Reader Feed:</span>
        <span className="truncate italic text-slate-300">{screenReaderLog[0]}</span>
      </div>

      {/* Primary Dashboard Content Area */}
      <main className="flex-1 p-6 space-y-6">
        
        {activeTab === "operations" ? (
          /* ==============================================
             1. LIVE OPERATIONS MODE
             ============================================== */
          <div className="space-y-6">
            
            {/* Top Operational Perspective Swapper */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/60 p-4">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-6 bg-cyan-500 rounded-full shrink-0"></div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono flex items-center gap-1.5 mb-1">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      Operational Dashboard Perspectives
                    </h3>
                    <p className="text-[11px] text-slate-500">Swap roles to instantly customize telemetry KPIs, navigation layers, and alerts</p>
                  </div>
                </div>
                
                {/* 10 Role Buttons Grid */}
                <div className="flex flex-wrap gap-1.5 max-w-[1000px]">
                  {[
                    "Tournament Operations",
                    "Security Intelligence",
                    "Medical Teams",
                    "Volunteers",
                    "Fans",
                    "Transport Teams",
                    "Cleaning Teams",
                    "Food Vendors",
                    "VIP Management",
                    "Accessibility Support"
                  ].map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role as UserRole)}
                      className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                        activeRole === role
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/10"
                          : "bg-slate-950/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700/80"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Top 5 Dynamic Stats Grid (Contextual to the Role selected!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Card 1: Stadium Occupancy (Static / Universal) */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300 group">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
                  <Users className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Live Attendance</div>
                  <div className="text-lg font-bold text-slate-100">82,145</div>
                  <div className="text-[10px] text-cyan-400/80 mt-0.5 font-mono">99.5% Capacity</div>
                </div>
              </div>

              {/* Card 2: Contextual Role KPI */}
              {activeRole === "Tournament Operations" && (
                <>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Solar Grid Input</div>
                      <div className="text-lg font-bold text-slate-100">142 MWh</div>
                      <div className="text-[10px] text-emerald-400 font-mono font-bold mt-0.5">100% Eco Offset</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Greywater Level</div>
                      <div className="text-lg font-bold text-slate-100">84k Liters</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Saving 45% Fresh</div>
                    </div>
                  </div>
                </>
              )}

              {activeRole === "Security Intelligence" && (
                <>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 animate-pulse">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Security Alerts</div>
                      <div className="text-lg font-bold text-rose-400 font-mono">3 Active</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Triage: Medium Risk</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Active CCTV Feeds</div>
                      <div className="text-lg font-bold text-slate-100">424 Channels</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">99.8% AI Coverage</div>
                    </div>
                  </div>
                </>
              )}

              {activeRole === "Medical Teams" && (
                <>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 animate-pulse">
                      <Ambulance className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Active Incidents</div>
                      <div className="text-lg font-bold text-slate-100">1 Logged</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Awaiting Dispatch</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Avg Dispatch Time</div>
                      <div className="text-lg font-bold text-slate-100">2.4 mins</div>
                      <div className="text-[10px] text-emerald-400 font-bold mt-0.5">FIFA Compliant</div>
                    </div>
                  </div>
                </>
              )}

              {activeRole !== "Tournament Operations" && activeRole !== "Security Intelligence" && activeRole !== "Medical Teams" && (
                <>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20 text-pink-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Volunteers Assigned</div>
                      <div className="text-lg font-bold text-slate-100">175 active</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Skill Match: 100%</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Food Stall Avg Queue</div>
                      <div className="text-lg font-bold text-slate-100">8.2 mins</div>
                      <div className="text-[10px] text-amber-400 mt-0.5 font-mono">Kickoff Bottleneck</div>
                    </div>
                  </div>
                </>
              )}

              {/* Card 4: Parking Status */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Parking Occupancy</div>
                  <div className="text-lg font-bold text-slate-100">86.4%</div>
                  <div className="text-[10px] text-rose-400 mt-0.5 font-mono">P1 Lot FULL</div>
                </div>
              </div>

              {/* Card 5: Air Quality and Weather */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.02)] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all duration-300">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
                  <Sun className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Environment</div>
                  <div className="text-lg font-bold text-slate-100">24°C / AQI 32</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5 font-mono">AQI: Optimal</div>
                </div>
              </div>
            </div>

            {/* Main Interactive Grid (Heatmap & Pathfinder Left, Co-Pilot AI Assistant / Charts Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* Left Side: 2.5D Heatmap & Route Pathfinder */}
              <div className="space-y-6">
                <StadiumHeatmap
                  selectedZoneId={selectedZoneId}
                  onSelectZone={handleSelectZone}
                  zones={zones}
                  navigationPath={activeNavPath}
                />

                {/* Navigation Pathfinder selector */}
                <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                  <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
                    <Navigation className="w-4 h-4 text-cyan-400" />
                    Autonomous Smart Pathfinder
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "wheelchair", label: "Wheelchair", desc: "Step-free & elevators" },
                      { id: "fastest", label: "Fastest Path", desc: "Shortest distance" },
                      { id: "safest", label: "Safest Exit", desc: "Avoids high-crowd corridors" },
                      { id: "emergency", label: "Emergency Evac", desc: "Direct route to grass field" },
                      { id: "vip", label: "VIP Corridor", desc: "Valet to Luxury Box" },
                      { id: "kid-friendly", label: "Kid Friendly", desc: "Near family restrooms" },
                      { id: "volunteer", label: "Volunteer Route", desc: "Utility back tunnels" },
                    ].map((path) => (
                      <button
                        key={path.id}
                        onClick={() => {
                          setActiveNavPath(activeNavPath === path.id ? "" : path.id);
                          dispatchScreenReader(`Drawing navigation route on map: ${path.label}`);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                          activeNavPath === path.id
                            ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-500/5"
                            : "bg-slate-950/40 border-slate-800/60 text-slate-400 hover:bg-slate-950/70 hover:border-slate-700/80"
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{path.label}</span>
                          {activeNavPath === path.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-normal">{path.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Tab Switcher (AI Co-Pilot vs Analytics Charts) */}
              <div className="flex flex-col space-y-4">
                {/* Switch right column view */}
                <div className="flex justify-between items-center bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 p-2 rounded-2xl shadow-lg">
                  <span className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest pl-2">
                    Command Telemetry Module
                  </span>
                  
                  <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
                    <button
                      onClick={() => setViewRightPanel("ai-assistant")}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewRightPanel === "ai-assistant"
                          ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/15"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                      Live AI Co-Pilot
                    </button>
                    <button
                      onClick={() => setViewRightPanel("analytics")}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewRightPanel === "analytics"
                          ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/15"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      Historical Charts
                    </button>
                  </div>
                </div>

                {/* Panels rendering */}
                <div className="flex-1">
                  {viewRightPanel === "ai-assistant" ? (
                    <AIAssistant
                      currentContext={{
                        activeRole,
                        stadiumCapacity: 82500,
                        activeEmergency,
                        activeNavPath,
                        selectedZoneId
                      }}
                    />
                  ) : (
                    <DashboardAnalytics />
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Row: Report Generator Suite & Crisis Control Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportCenter />
              <EmergencyControl
                onTriggerEmergency={handleTriggerEmergency}
                activeEmergency={activeEmergency}
              />
            </div>

          </div>
        ) : (
          /* ==============================================
             2. PRESENTATION MODE (HACKATHON SPECIFICATIONS)
             ============================================== */
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-2xl space-y-6">
            
            {/* Presentation Navigation Tabs */}
            <div className="flex border-b border-slate-800/80 bg-slate-950/60 p-1 rounded-xl">
              {[
                { id: "slides", label: "Pitch Deck (10 Slides)", icon: Presentation },
                { id: "architecture", label: "System Architecture", icon: Terminal },
                { id: "db", label: "Database Schema", icon: FileText },
                { id: "api", label: "API Design", icon: Settings },
                { id: "pitch", label: "Elevator Pitch", icon: Sparkles },
                { id: "qa", label: "Judge Q&A Responses", icon: HelpCircle },
              ].map((sub) => {
                const Icon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setPresentationSubTab(sub.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      presentationSubTab === sub.id
                        ? "bg-emerald-600 text-slate-100"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {sub.label}
                  </button>
                );
              })}
            </div>

            {/* Slide Presentation Sub-tab rendering */}
            {presentationSubTab === "slides" && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/60 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                {/* Gradient background glowing */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Slide content rendering */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-emerald-400">
                    <span>ARENAMIND AI HACKATHON PRESENTATION</span>
                    <span>SLIDE {currentSlide + 1} OF {PITCH_SLIDES.length}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-100">{PITCH_SLIDES[currentSlide].title}</h2>
                    <p className="text-sm text-slate-400 mt-1 font-sans">{PITCH_SLIDES[currentSlide].subtitle}</p>
                  </div>

                  <ul className="space-y-2.5 mt-6">
                    {PITCH_SLIDES[currentSlide].points.map((pt, idx) => (
                      <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: pt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Slider Controls */}
                <div className="flex justify-between items-center border-t border-slate-800/80 pt-4 mt-6">
                  <button
                    onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                    disabled={currentSlide === 0}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 disabled:opacity-40"
                  >
                    PREVIOUS SLIDE
                  </button>
                  <div className="flex gap-1.5">
                    {PITCH_SLIDES.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentSlide ? "bg-emerald-500 w-4" : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentSlide((prev) => Math.min(PITCH_SLIDES.length - 1, prev + 1))}
                    disabled={currentSlide === PITCH_SLIDES.length - 1}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-slate-100 disabled:opacity-40"
                  >
                    NEXT SLIDE
                  </button>
                </div>
              </div>
            )}

            {/* Architecture tab */}
            {presentationSubTab === "architecture" && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/60 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <h3 className="text-base font-bold text-slate-100">ArenaMind AI System Topology</h3>
                  <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                    Vertex AI / GCP Standard compliant
                  </span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-3">
                  <p>Our unified stadium operations co-pilot follows an event-driven microservices architecture hosted inside Google Cloud Platform:</p>
                  
                  {/* Mermaid Text Representation styled nicely */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] overflow-x-auto leading-normal text-cyan-400">
                    {`
[CCTV Video Streams]  --> [GCP Vision AI (Grid Count)] -----\\
[IoT Ticket Gates]   --> [BigQuery Telemetry Storage] --------+--> [Express Operations Server (Node.js/Cloud Run)]
[Weather / Transit]  --> [Google Maps & Metro APIs] ----------/                       |
                                                                                    |   Uses GoogleGenAI SDK
                                                                                    v
[Tournament Co-Pilot UI (Vite SPA)] <------------------------- [Gemini 3.5 Flash (Operations Central Brain)]
                    `}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/40">
                      <strong className="text-emerald-400">1. Data Ingestion</strong>
                      <p className="text-slate-400 text-[11px] mt-1">Camera streams run localized object models counting densities. Raw counts are streamed directly to BigQuery at 5-sec intervals.</p>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/40">
                      <strong className="text-emerald-400">2. Central Reasoning</strong>
                      <p className="text-slate-400 text-[11px] mt-1">Node/Express server loads real-time context and prompts the server-side Gemini 3.5 Flash model with system instructions.</p>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/40">
                      <strong className="text-emerald-400">3. Human Coordination</strong>
                      <p className="text-slate-400 text-[11px] mt-1">Commands are distributed back to fans via smart turnstile displays and to volunteers via text notification gateways.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Database Tab */}
            {presentationSubTab === "db" && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/60 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <h3 className="text-base font-bold text-slate-100">SQL Schema (Cloud SQL / PostgreSQL)</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Drizzle / Prisma Compliant</span>
                </div>
                <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto leading-normal">
                  {TECH_SPEC.databaseSchema}
                </pre>
              </div>
            )}

            {/* API Tab */}
            {presentationSubTab === "api" && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/60 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <h3 className="text-base font-bold text-slate-100">REST API Specification</h3>
                  <span className="text-[10px] font-mono text-blue-400">JSON Endpoint Architecture</span>
                </div>
                <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] text-cyan-400 overflow-x-auto leading-normal">
                  {TECH_SPEC.apiDesign}
                </pre>
              </div>
            )}

            {/* Elevator Pitch Tab */}
            {presentationSubTab === "pitch" && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/60 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <h3 className="text-base font-bold text-slate-100">The 1-Minute Hackathon Winning Pitch</h3>
                  <span className="text-[10px] font-mono bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-400/20">
                    Elevator Pitch Strategy
                  </span>
                </div>
                <div className="p-5 bg-gradient-to-r from-emerald-950/20 to-blue-950/20 border border-slate-800 rounded-xl">
                  <p className="text-sm font-sans text-slate-200 leading-relaxed italic">
                    "{TECH_SPEC.winningPitch.trim()}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-sans text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400">Competitive Edge:</strong>
                    <p className="text-slate-400 text-[11px] mt-1">Integrates disparate stadium verticals (such as crowd flow, transit delays, sustainability credits, and medical dispatches) under one conversational model.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400">Business Viability:</strong>
                    <p className="text-slate-400 text-[11px] mt-1">Directly coordinates with regional FIFA offices to verify and secure eco-offset tax breaks via immutable sustainability report downloads.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Judge Q&As */}
            {presentationSubTab === "qa" && (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/60 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <h3 className="text-base font-bold text-slate-100">Predicted Judge Q&As</h3>
                  <span className="text-[10px] font-mono text-pink-400">Critical Defence Strategy</span>
                </div>
                
                <div className="space-y-4 font-sans text-xs">
                  {TECH_SPEC.judgeQa.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <div className="font-bold text-slate-100 flex items-start gap-2">
                        <span className="text-pink-400 font-mono">Q{idx + 1}:</span>
                        <span>{item.q}</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed pl-5">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 px-6 py-4 text-center text-[10px] text-slate-500 font-mono">
        © 2026 FIFA World Cup Operations Dashboard. Powered by ArenaMind Generative AI Central Brain.
      </footer>
    </div>
  );
}
