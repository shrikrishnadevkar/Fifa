import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, Play, HelpCircle, RefreshCw, Volume2, Sparkles, Send, FileText, Users, Eye, Info } from "lucide-react";

interface EmergencyControlProps {
  onTriggerEmergency: (type: string | null) => void;
  activeEmergency: string | null;
}

const EMERGENCY_INCIDENTS = [
  { id: "Fire", label: "Structural Fire / Smoke", severity: "Critical" },
  { id: "Earthquake", label: "Seismic Tremor Detection", severity: "Critical" },
  { id: "Bomb Threat", label: "Unattended Suspicious Device", severity: "Critical" },
  { id: "Power Outage", label: "Grid failure / Gen-set failover", severity: "Medium" },
  { id: "Heavy Rain", label: "Severe Flash Storm", severity: "Low" },
  { id: "Crowd Panic", label: "Halftime Concierge Influx", severity: "High" },
  { id: "Missing Child", label: "Amber Alert - Section 112", severity: "High" },
  { id: "Medical Emergency", label: "Cardiac Arrest Cluster", severity: "Medium" },
];

export default function EmergencyControl({
  onTriggerEmergency,
  activeEmergency
}: EmergencyControlProps) {
  const [selectedIncident, setSelectedIncident] = useState(EMERGENCY_INCIDENTS[0].id);
  const [generatedOutput, setGeneratedOutput] = useState<{
    announcement?: string;
    route?: string;
    volunteerInstructions?: string;
    policeBrief?: string;
    mediaStatement?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"announcement" | "route" | "volunteers" | "police" | "media">("announcement");

  const generateAIPlans = async (incidentId: string) => {
    setIsLoading(true);
    setGeneratedOutput(null);

    try {
      const prompt = `CRITICAL TOURNAMENT EMERGENCY: Triggering incident response protocols for a: ${incidentId}.
Please generate a structured crisis management response package. Return structured markdown for:
1. Loudspeaker PA Broadcast Announcement (Multilingual English/Spanish)
2. Safe Evacuation Routes and Gate Directives
3. Emergency Volunteer Dispatch Orders
4. Law Enforcement and First Responder Tactical Briefing
5. Official Media / Press Liaison Statement`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          context: { incident: incidentId, level: "Emergency Mode" },
          language: "English"
        }),
      });

      if (!response.ok) throw new Error("Link to operations server failed.");

      const data = await response.json();
      
      // Parse or simulate sections
      const sections = data.text.split("\n\n");
      
      setGeneratedOutput({
        announcement: sections.find((s: string) => s.toLowerCase().includes("announcement") || s.toLowerCase().includes("loudspeaker") || s.toLowerCase().includes("pa")) || `📢 **PA Announcement Draft [${incidentId} Protocol]:**\n"Attention fans, a safety protocol is in effect. Please head calmly toward the nearest exit gate. Do not run."`,
        route: sections.find((s: string) => s.toLowerCase().includes("route") || s.toLowerCase().includes("exit") || s.toLowerCase().includes("gate")) || `🗺️ **AI Evacuation Route Directive:**\nUse Gate 1 and Gate 6 for rapid egress. Sections 100-112 bypass Level 2 main corridor. Avoid elevators.`,
        volunteerInstructions: sections.find((s: string) => s.toLowerCase().includes("volunteer") || s.toLowerCase().includes("dispatch") || s.toLowerCase().includes("order")) || `📋 **Volunteer Marshaling Orders:**\nDeploy 45 volunteers to Gate 1. Form safety barriers and guide people with flashlights. Keep clear of responder paths.`,
        policeBrief: sections.find((s: string) => s.toLowerCase().includes("police") || s.toLowerCase().includes("tactical") || s.toLowerCase().includes("law")) || `👮 **Law Enforcement & Tactical Brief:**\nUnify command desk under Section 118 clinic. Clear transit lanes at Terminal P4 for emergency vehicles.`,
        mediaStatement: sections.find((s: string) => s.toLowerCase().includes("media") || s.toLowerCase().includes("press") || s.toLowerCase().includes("liaison")) || `📰 **Media Liaison Statement:**\n"FIFA tournament operations confirm that all systems are responsive. Egress protocols are safely active. Further details to follow."`
      });

    } catch (err) {
      console.error(err);
      // Fallback
      setGeneratedOutput({
        announcement: `📢 **PA Announcement Draft [${incidentId} Protocol]:**\n"Attention all fans. Please walk calmly to the nearest marked emergency exits. Avoid Gate 4 due to momentary congestion."`,
        route: `🗺️ **AI Evacuation Route Directive:**\nEgress Route Code Green. Clear paths to Gate 1, Gate 6, and Gate 7. Wheelchair lifts will remain operational under battery power.`,
        volunteerInstructions: `📋 **Volunteer Dispatch Orders:**\nAll available volunteers in Zones A and B proceed immediately to the main stairs to guide fans and prevent crowding.`,
        policeBrief: `👮 **Police Briefing Notes:**\nClear emergency responder lanes. Deploy perimeter units to Terminal P4 to establish bus transit prioritization.`,
        mediaStatement: `📰 **Media Statement Draft:**\n"At approximately ${new Date().toLocaleTimeString()}, stadium operators identified a localized ${incidentId}. Standard protocols were initiated immediately. Egress is smooth."`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrigger = (incidentId: string) => {
    onTriggerEmergency(incidentId);
    generateAIPlans(incidentId);
  };

  const handleReset = () => {
    onTriggerEmergency(null);
    setGeneratedOutput(null);
  };

  return (
    <div className={`rounded-2xl border p-5 shadow-2xl h-full flex flex-col transition-all duration-300 ${
      activeEmergency 
        ? "bg-rose-950/40 border-rose-700/80 animate-[pulse_3s_infinite]" 
        : "bg-slate-900/40 backdrop-blur-sm border-slate-800/80 shadow-[0_0_20px_rgba(244,63,94,0.02)] hover:border-rose-500/20"
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/60">
        <div className="flex items-start gap-2.5">
          <div className={`w-1 h-6 rounded-full shrink-0 ${activeEmergency ? "bg-rose-500" : "bg-cyan-500"}`}></div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className={`w-4 h-4 ${activeEmergency ? "text-rose-400 animate-bounce" : "text-rose-500"}`} />
              Emergency Control Terminal
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">Secure operator dashboard to coordinate emergency response</p>
          </div>
        </div>
        
        {activeEmergency && (
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-slate-950 text-xs font-bold rounded-lg transition-all animate-pulse"
          >
            RESOLVE PROTOCOL
          </button>
        )}
      </div>

      {/* Grid of Incidents */}
      {!activeEmergency ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {EMERGENCY_INCIDENTS.map((inc) => (
              <button
                key={inc.id}
                onClick={() => setSelectedIncident(inc.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedIncident === inc.id
                    ? "bg-rose-950/20 border-rose-500/80 text-rose-200 shadow-md shadow-rose-500/10"
                    : "bg-slate-950/40 border-slate-800/60 text-slate-400 hover:bg-slate-950/70 hover:border-slate-700/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                    inc.severity === "Critical" ? "text-rose-400" : inc.severity === "High" ? "text-amber-400" : "text-cyan-400"
                  }`}>
                    {inc.severity}
                  </span>
                  <AlertTriangle className="w-3 h-3 opacity-50" />
                </div>
                <div className="text-xs font-bold mt-1 text-slate-200">{inc.label}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleTrigger(selectedIncident)}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/20 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            ACTIVATE "{selectedIncident.toUpperCase()}" STADIUM ALARM
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-4">
          {/* Active Incident Warning Header */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3 flex items-center gap-3 shadow-[0_0_15px_rgba(244,63,94,0.05)]">
            <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-rose-400 font-mono uppercase tracking-widest">ACTIVE EMERGENCY PROTOCOL</div>
              <div className="text-sm font-bold text-slate-100">{activeEmergency} Protocol Enabled</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Targeting sections 100-112 concourse levels. Automated PA announcements queued.
              </div>
            </div>
          </div>

          {/* AI Generated Strategy Panels */}
          <div className="flex-1 flex flex-col bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden min-h-[220px]">
            {/* Tabs */}
            <div className="flex border-b border-slate-800/80 bg-slate-950 overflow-x-auto text-[11px]">
              {[
                { id: "announcement", label: "PA Script", icon: Volume2 },
                { id: "route", label: "Evac Paths", icon: Eye },
                { id: "volunteers", label: "Volunteers", icon: Users },
                { id: "police", label: "Police Brief", icon: FileText },
                { id: "media", label: "Media Statement", icon: Info },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1 px-3 py-2.5 font-bold text-slate-400 hover:text-slate-200 transition-all ${
                      activeTab === tab.id
                        ? "bg-rose-950/20 border-b-2 border-rose-500 text-rose-300"
                        : ""
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[180px] text-xs text-slate-300 leading-relaxed font-sans custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-2 text-slate-500 font-mono text-[11px]">
                  <RefreshCw className="w-5 h-5 animate-spin text-red-400" />
                  <span>Generating AI tactical briefings...</span>
                </div>
              ) : generatedOutput ? (
                <div>
                  {activeTab === "announcement" && (
                    <div className="whitespace-pre-line bg-slate-950 p-3 rounded-lg border border-slate-900 font-sans">
                      {generatedOutput.announcement}
                    </div>
                  )}
                  {activeTab === "route" && (
                    <div className="whitespace-pre-line bg-slate-950 p-3 rounded-lg border border-slate-900 font-sans">
                      {generatedOutput.route}
                    </div>
                  )}
                  {activeTab === "volunteers" && (
                    <div className="whitespace-pre-line bg-slate-950 p-3 rounded-lg border border-slate-900 font-sans">
                      {generatedOutput.volunteerInstructions}
                    </div>
                  )}
                  {activeTab === "police" && (
                    <div className="whitespace-pre-line bg-slate-950 p-3 rounded-lg border border-slate-900 font-sans">
                      {generatedOutput.policeBrief}
                    </div>
                  )}
                  {activeTab === "media" && (
                    <div className="whitespace-pre-line bg-slate-950 p-3 rounded-lg border border-slate-900 font-sans">
                      {generatedOutput.mediaStatement}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-slate-500">Failed to load plans.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
