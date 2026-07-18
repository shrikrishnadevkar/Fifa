import React, { useState } from "react";
import { Camera, MapPin, Shield, Ambulance, Sparkles, Navigation, Layers, Check, Users, RefreshCw } from "lucide-react";
import { StadiumZone } from "../types";

interface StadiumHeatmapProps {
  selectedZoneId: string;
  onSelectZone: (zone: StadiumZone) => void;
  zones: StadiumZone[];
  navigationPath: string;
}

export default function StadiumHeatmap({
  selectedZoneId,
  onSelectZone,
  zones,
  navigationPath
}: StadiumHeatmapProps) {
  const [activeLayers, setActiveLayers] = useState<string[]>(["cameras", "volunteers"]);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const toggleLayer = (layer: string) => {
    setActiveLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  // SVG dimensions: 500x400
  // Stadium centers around (250, 200)
  const renderNavPath = () => {
    if (!navigationPath) return null;

    let points = "";
    let strokeColor = "#3b82f6"; // Blue default

    switch (navigationPath) {
      case "wheelchair":
        // Gate 7 (accessible) -> Lift A -> Wheelchair Tier
        points = "100,320 180,290 220,230 250,210";
        strokeColor = "#10b981"; // Emerald
        break;
      case "fastest":
        // Gate 1 -> Tunnel B -> North Tier
        points = "250,60 250,120";
        strokeColor = "#ef4444"; // Red
        break;
      case "safest":
        // Low congestion Gate 5 -> Concourse W -> South Tier
        points = "400,320 320,300 250,250";
        strokeColor = "#8b5cf6"; // Purple
        break;
      case "emergency":
        // Direct egress to nearest gate
        points = "250,150 120,80 80,60";
        strokeColor = "#f97316"; // Orange
        break;
      case "vip":
        // VIP Parking -> Private Elevator -> VIP Lounge
        points = "450,200 380,200 320,200";
        strokeColor = "#fbbf24"; // Gold
        break;
      case "kid-friendly":
        points = "400,100 300,130 250,150";
        strokeColor = "#14b8a6"; // Teal
        break;
      case "volunteer":
        points = "80,200 180,180 230,170";
        strokeColor = "#ec4899"; // Pink
        break;
      default:
        points = "100,200 250,200 400,200";
    }

    return (
      <>
        {/* Glowing shadow line */}
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40 blur-md animate-pulse"
        />
        {/* Solid trace line */}
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 4"
          className="animate-[dash_10s_linear_infinite]"
        />
        {/* Navigation Indicator dots */}
        {points.split(" ").map((pt, idx) => {
          const [x, y] = pt.split(",");
          if (idx === 0) {
            return (
              <g key={`start-${idx}`}>
                <circle cx={x} cy={y} r="8" fill={strokeColor} className="animate-ping" />
                <circle cx={x} cy={y} r="5" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
              </g>
            );
          }
          if (idx === points.split(" ").length - 1) {
            return (
              <g key={`end-${idx}`}>
                <circle cx={x} cy={y} r="6" fill={strokeColor} />
                <polygon points={`${x},${Number(y)-8} ${Number(x)+6},${Number(y)+4} ${Number(x)-6},${Number(y)+4}`} fill="#ffffff" />
              </g>
            );
          }
          return null;
        })}
      </>
    );
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-5 flex flex-col h-full shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 relative overflow-hidden group">
      {/* Visual background gradient effects */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-700" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-700" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10">
        <div className="flex items-start gap-2.5">
          <div className="w-1 h-6 bg-cyan-500 rounded-full shrink-0"></div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              2.5D Stadium Digital Twin
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">Interactive telemetry & live crowd behavior map</p>
          </div>
        </div>
        
        {/* Overlay Layers Control */}
        <div className="flex flex-wrap gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/60 self-start">
          {[
            { id: "cameras", label: "CCTV", icon: Camera, color: "text-cyan-400" },
            { id: "volunteers", label: "Volunteers", icon: Users, color: "text-pink-400" },
            { id: "medical", label: "Medics", icon: Ambulance, color: "text-rose-400" },
            { id: "security", label: "Secur", icon: Shield, color: "text-amber-400" },
          ].map((layer) => {
            const isSelected = activeLayers.includes(layer.id);
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                  isSelected
                    ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon className={`w-3 h-3 ${layer.color}`} />
                {layer.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Canvas SVG Container */}
      <div className="relative flex-1 bg-slate-950/90 rounded-xl border border-slate-800/50 flex items-center justify-center min-h-[300px] overflow-hidden p-2">
        <svg viewBox="0 0 500 400" className="w-full h-full max-h-[380px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
          {/* Custom style for moving dash animation */}
          <style>
            {`
              @keyframes dash {
                to {
                  stroke-dashoffset: -40;
                }
              }
            `}
          </style>

          {/* Outer Stadium boundary */}
          <rect
            x="30"
            y="30"
            width="440"
            height="340"
            rx="120"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeDasharray="5 5"
          />

          {/* Stadium Inner Pitch / Field of play */}
          <rect
            x="175"
            y="130"
            width="150"
            height="140"
            rx="15"
            fill="#064e3b"
            fillOpacity="0.45"
            stroke="#10b981"
            strokeWidth="2.5"
          />
          {/* Pitch markings */}
          <circle cx="250" cy="200" r="30" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" />
          <line x1="175" y1="200" x2="325" y2="200" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" />
          {/* Goal Boxes */}
          <rect x="175" y="170" width="15" height="60" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="310" y="170" width="15" height="60" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" />

          {/* Interactive Seating Zones */}
          {zones.map((zone) => {
            // Zone placement parameters based on zone ID
            let dPath = "";
            let textX = 250;
            let textY = 200;

            if (zone.id === "z1") {
              // North Stand (Top side)
              dPath = "M 130 90 L 370 90 L 320 120 L 180 120 Z";
              textX = 250;
              textY = 105;
            } else if (zone.id === "z2") {
              // VIP West Stand (Right Side)
              dPath = "M 380 110 L 410 130 L 410 270 L 380 290 L 350 250 L 350 150 Z";
              textX = 380;
              textY = 200;
            } else if (zone.id === "z3") {
              // East Stand (Left Side)
              dPath = "M 90 130 L 120 110 L 150 150 L 150 250 L 120 290 L 90 270 Z";
              textX = 120;
              textY = 200;
            } else if (zone.id === "z4") {
              // South Stand (Bottom Side)
              dPath = "M 180 280 L 320 280 L 370 310 L 130 310 Z";
              textX = 250;
              textY = 295;
            } else if (zone.id === "z5") {
              // Family Zone (North-West Corner)
              dPath = "M 100 80 Q 80 100 90 120 L 140 140 Q 150 110 150 90 Z";
              textX = 115;
              textY = 100;
            } else if (zone.id === "z6") {
              // Wheelchair Access (South-West Corner)
              dPath = "M 90 280 Q 70 300 90 320 L 150 310 Q 150 290 130 270 Z";
              textX = 110;
              textY = 298;
            } else if (zone.id === "z7") {
              // Media Stand (South-East Corner)
              dPath = "M 410 280 Q 430 300 410 320 L 350 310 Q 350 290 370 270 Z";
              textX = 390;
              textY = 298;
            } else if (zone.id === "z8") {
              // VIP Suites (North-East Corner)
              dPath = "M 410 120 Q 430 100 410 80 L 350 90 Q 350 110 370 130 Z";
              textX = 390;
              textY = 100;
            }

            // Fill opacity and color depending on density
            let fillCol = "rgba(16, 185, 129, 0.3)"; // Green
            let strokeCol = "rgba(16, 185, 129, 0.7)";
            
            if (zone.density > 90) {
              fillCol = "rgba(127, 29, 29, 0.75)"; // Dark Red
              strokeCol = "rgba(239, 68, 68, 1)";
            } else if (zone.density > 75) {
              fillCol = "rgba(220, 38, 38, 0.65)"; // Red
              strokeCol = "rgba(239, 68, 68, 0.9)";
            } else if (zone.density > 55) {
              fillCol = "rgba(245, 158, 11, 0.55)"; // Orange
              strokeCol = "rgba(245, 158, 11, 0.8)";
            } else if (zone.density > 35) {
              fillCol = "rgba(234, 179, 8, 0.45)"; // Yellow
              strokeCol = "rgba(234, 179, 8, 0.7)";
            }

            const isSelected = selectedZoneId === zone.id;
            const isHovered = hoveredZone === zone.id;

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(zone)}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                className="cursor-pointer group/zone transition-all"
              >
                {/* Visual zone polygon */}
                <path
                  d={dPath}
                  fill={fillCol}
                  stroke={isSelected ? "#ffffff" : isHovered ? "rgba(255,255,255,0.7)" : strokeCol}
                  strokeWidth={isSelected ? "3" : isHovered ? "2" : "1.5"}
                  className="transition-all duration-200 hover:brightness-125"
                />

                {/* Zone Label Text */}
                <text
                  x={textX}
                  y={textY}
                  fill="#f1f5f9"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] opacity-80"
                >
                  {zone.name.split(" ")[0]}
                </text>
                <text
                  x={textX}
                  y={textY + 11}
                  fill="#a7f3d0"
                  fontSize="8.5"
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] opacity-70 font-mono"
                >
                  {zone.density}%
                </text>
              </g>
            );
          })}

          {/* Active Overlays */}

          {/* CCTV Camera Indicators */}
          {activeLayers.includes("cameras") && (
            <g id="cctv-overlay">
              <circle cx="160" cy="80" r="4" fill="#60a5fa" className="animate-ping" />
              <circle cx="160" cy="80" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="0.5" />
              
              <circle cx="340" cy="80" r="4" fill="#60a5fa" className="animate-ping" />
              <circle cx="340" cy="80" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="0.5" />
              
              <circle cx="70" cy="200" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="0.5" />
              <circle cx="430" cy="200" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="0.5" />
            </g>
          )}

          {/* Live Volunteer Locations */}
          {activeLayers.includes("volunteers") && (
            <g id="volunteers-overlay">
              {/* Green/Pink dots represent active volunteer positions roaming */}
              <circle cx="210" cy="110" r="4.5" fill="#ec4899" stroke="#ffffff" strokeWidth="0.8" />
              <circle cx="140" cy="220" r="4.5" fill="#ec4899" stroke="#ffffff" strokeWidth="0.8" />
              <circle cx="370" cy="160" r="4.5" fill="#ec4899" stroke="#ffffff" strokeWidth="0.8" />
              <circle cx="290" cy="290" r="4.5" fill="#ec4899" stroke="#ffffff" strokeWidth="0.8" />
            </g>
          )}

          {/* Medical Centers */}
          {activeLayers.includes("medical") && (
            <g id="medics-overlay">
              {/* Red Cross Medic Stations */}
              <g transform="translate(145, 145) scale(0.65)">
                <rect x="0" y="0" width="16" height="16" rx="3" fill="#ef4444" />
                <path d="M4 8 h8 M8 4 v8" stroke="#ffffff" strokeWidth="2.5" />
              </g>
              <g transform="translate(330, 240) scale(0.65)">
                <rect x="0" y="0" width="16" height="16" rx="3" fill="#ef4444" />
                <path d="M4 8 h8 M8 4 v8" stroke="#ffffff" strokeWidth="2.5" />
              </g>
            </g>
          )}

          {/* Security Points */}
          {activeLayers.includes("security") && (
            <g id="security-overlay">
              {/* Yellow Security Checkpoints */}
              <polygon points="250,50 255,58 245,58" fill="#eab308" stroke="#ffffff" strokeWidth="0.5" />
              <polygon points="250,350 255,358 245,358" fill="#eab308" stroke="#ffffff" strokeWidth="0.5" />
              <polygon points="65,200 70,208 60,208" fill="#eab308" stroke="#ffffff" strokeWidth="0.5" />
              <polygon points="435,200 440,208 430,208" fill="#eab308" stroke="#ffffff" strokeWidth="0.5" />
            </g>
          )}

          {/* Draw active Smart Navigation Path overlay */}
          {renderNavPath()}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 text-[10px] space-y-1 z-10 font-mono">
          <div className="text-slate-400 font-semibold uppercase tracking-wider mb-1">Density Legend</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500/40 border border-emerald-500 rounded" />
            <span className="text-slate-300">Optimal (&lt;35%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-yellow-500/40 border border-yellow-500 rounded" />
            <span className="text-slate-300">Moderate (35-55%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-600/50 border border-amber-500 rounded" />
            <span className="text-slate-300">Heavy (55-75%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-600/60 border border-red-500 rounded" />
            <span className="text-slate-300">Warning (75-90%)</span>
          </div>
          <div className="flex items-center gap-1.5 animate-pulse">
            <span className="w-2.5 h-2.5 bg-red-900/80 border border-red-600 rounded" />
            <span className="text-red-400 font-bold">Critical (90%+)</span>
          </div>
        </div>

        {/* Selected Zone Quick Info */}
        {selectedZoneId && (
          <div className="absolute top-2 right-2 bg-slate-900/95 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono z-10 max-w-[150px]">
            {(() => {
              const zone = zones.find((z) => z.id === selectedZoneId);
              if (!zone) return null;
              return (
                <>
                  <div className="text-[10px] text-slate-500 uppercase">Selected Area</div>
                  <div className="font-bold text-slate-100">{zone.name}</div>
                  <div className="flex justify-between mt-1">
                    <span className="text-slate-400">Crowd:</span>
                    <span className="font-bold text-emerald-400">{(zone.occupancy).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cap:</span>
                    <span className="text-slate-300">{(zone.capacity).toLocaleString()}</span>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/40 p-2 rounded-lg flex items-center justify-between border border-slate-900/50 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          {navigationPath ? (
            <span>Route Active: <strong className="text-slate-200 capitalize">{navigationPath} Path</strong></span>
          ) : (
            <span>Tap any zone or select a route below to analyze metrics</span>
          )}
        </span>
        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          Live Telemetry Link Active
        </span>
      </div>
    </div>
  );
}
