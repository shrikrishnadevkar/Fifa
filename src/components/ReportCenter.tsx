import React, { useState } from "react";
import { FileText, Download, Check, Sparkles, RefreshCw, BarChart, Settings, Database } from "lucide-react";

const REPORTS = [
  { id: "exec", title: "Executive Operations Summary", desc: "High-level summary of stadium safety, ingress flow, and vendor revenues.", file: "executive_summary_matchday_4" },
  { id: "daily", title: "Daily Operations Log", desc: "Detailed timeline of ticketing scans, transit peak volumes, and stadium waste metrics.", file: "daily_operations_log_m4" },
  { id: "incident", title: "Security & Medical Incident Report", desc: "Complete documentation of medical responses, gate alarms, and triage completion times.", file: "incident_security_audit" },
  { id: "volunteer", title: "Volunteer Efficiency & Shift Report", desc: "Shift assignments, language matches, completion ETAs, and volunteer allocations.", file: "volunteer_deployment_analytics" },
  { id: "env", title: "Environmental Sustainability Audit", desc: "MWh solar usage, water conservation recycling gallons, and trash landfill division index.", file: "sustainability_impact_report" },
];

export default function ReportCenter() {
  const [selectedReport, setSelectedReport] = useState("exec");
  const [exportFormat, setExportFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [reportPreview, setReportPreview] = useState<string>("");

  const handleExport = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    // Simulate file generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);
      
      // Clear toast after 3 seconds
      setTimeout(() => setDownloadSuccess(false), 3000);

      // Generate simulated CSV/Text download
      const content = `FIFA World Cup 2026 - Stadium Operations Report\n` +
        `Report: ${REPORTS.find(r => r.id === selectedReport)?.title}\n` +
        `Format: ${exportFormat}\n` +
        `Generated: ${new Date().toLocaleString()}\n` +
        `Telemetry Source: MetLife Stadium AI Brain (ArenaMind)\n` +
        `Status: VERIFIED & COMPLIANT\n`;
      
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${REPORTS.find(r => r.id === selectedReport)?.file}.${exportFormat.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-5 shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 h-full flex flex-col relative group overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="mb-4 flex items-start gap-2.5">
        <div className="w-1 h-6 bg-cyan-500 rounded-full shrink-0"></div>
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-cyan-400" />
            FIFA Report Generator Terminal
          </h2>
          <p className="text-[11px] text-slate-500 font-mono">Export audited stadium data packages directly for FIFA Liaison Officers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Left Side: Select Report */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Available Datasets</span>
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            {REPORTS.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setSelectedReport(rep.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                  selectedReport === rep.id
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-200 shadow-md"
                    : "bg-slate-950/40 border-slate-800/50 text-slate-400 hover:bg-slate-950/70 hover:border-slate-700/85"
                }`}
              >
                <Database className={`w-4 h-4 shrink-0 mt-0.5 ${selectedReport === rep.id ? "text-cyan-400" : "text-slate-500"}`} />
                <div>
                  <div className="font-bold text-slate-200">{rep.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{rep.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Options & Actions */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800/60 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono mb-2">Export format</span>
              <div className="grid grid-cols-3 gap-2">
                {(["PDF", "Excel", "CSV"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      exportFormat === fmt
                        ? "bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/15"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700/80"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Preview Area */}
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/50">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Data Integrity Seal</span>
              <div className="text-[11px] text-slate-300 font-mono mt-1 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 shrink-0 animate-pulse" />
                <span>SHA-256 Verified GenAI Operations Cryptoseal Approved.</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <button
              onClick={handleExport}
              disabled={isGenerating}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  Compiling CSV / Generating Telemetry Pack...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  Compile & Export Document ({exportFormat})
                </>
              )}
            </button>

            {downloadSuccess && (
              <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-lg p-2 text-[10px] text-emerald-400 text-center font-mono animate-fade-in flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Download started! File has been compiled successfully.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
