import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { BarChart3, Activity, Zap, TrendingUp, HelpCircle, Download } from "lucide-react";

// Mock Data
const hourlyAttendanceData = [
  { hour: "3 hrs before", fansEntered: 12400, queueWaitSec: 15 },
  { hour: "2.5 hrs before", fansEntered: 28900, queueWaitSec: 35 },
  { hour: "2 hrs before", fansEntered: 45000, queueWaitSec: 90 },
  { hour: "1.5 hrs before", fansEntered: 58000, queueWaitSec: 180 },
  { hour: "1 hr before", fansEntered: 72000, queueWaitSec: 320 },
  { hour: "Kickoff", fansEntered: 81200, queueWaitSec: 450 },
  { hour: "Halftime", fansEntered: 82500, queueWaitSec: 40 },
  { hour: "Fulltime", fansEntered: 82100, queueWaitSec: 12 },
];

const transportDistribution = [
  { name: "Metro / Subways", value: 45, color: "#3b82f6" },
  { name: "Express Buses", value: 25, color: "#10b981" },
  { name: "Private Parking / Cars", value: 15, color: "#f59e0b" },
  { name: "Ride-Sharing (Uber/Lyft)", value: 10, color: "#ec4899" },
  { name: "Walking / Bicycles", value: 5, color: "#8b5cf6" },
];

const foodQueueAndStock = [
  { stall: "Striker Pizza", waitTime: 5, inventory: 82 },
  { stall: "Kickoff Burgers", waitTime: 18, inventory: 40 },
  { stall: "GreenPitch Tacos", waitTime: 2, inventory: 95 },
  { stall: "Halftime Hotdogs", waitTime: 12, inventory: 60 },
  { stall: "WorldCup Grill", waitTime: 15, inventory: 50 },
  { stall: "Vegan Corner", waitTime: 4, inventory: 88 },
];

const resourceConsumption = [
  { time: "12:00", electricity: 34, water: 42, waste: 1.2 },
  { time: "14:00", electricity: 58, water: 75, waste: 2.8 },
  { time: "16:00", electricity: 82, water: 120, waste: 5.4 },
  { time: "18:00", electricity: 110, water: 190, waste: 8.9 },
  { time: "20:00", electricity: 142, water: 240, waste: 12.5 },
  { time: "22:00", electricity: 95, water: 160, waste: 14.8 },
];

export default function DashboardAnalytics() {
  const [activeTab, setActiveTab] = useState<"attendance" | "transport" | "food" | "sustainability">("attendance");

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-5 shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
      {/* Header Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 z-10">
        <div className="flex items-start gap-2.5">
          <div className="w-1 h-6 bg-cyan-500 rounded-full shrink-0"></div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-cyan-400" />
              Operations Predictive Analytics
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">GenAI model predictions and real-time trends</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800/60 self-start">
          {[
            { id: "attendance", label: "Attendance" },
            { id: "transport", label: "Transport" },
            { id: "food", label: "Food & Retail" },
            { id: "sustainability", label: "Sustainability" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/15"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Content */}
      <div className="flex-1 min-h-[300px]">
        {activeTab === "attendance" && (
          <div className="h-full flex flex-col justify-between">
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={9} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#06b6d4" fontSize={9} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={9} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", color: "#f1f5f9", borderRadius: "12px" }}
                    labelStyle={{ fontWeight: "bold" }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 10, fontWeight: "bold" }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="fansEntered"
                    name="Fans in Stadium"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFans)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="queueWaitSec"
                    name="Gate Turnstile Wait (Sec)"
                    stroke="#f43f5e"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#colorWait)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-[11px] text-slate-400 font-mono">
              <strong className="text-cyan-400">AI Predictive Summary:</strong> Peak ingress completed at kickoff with an 81,200 fan scan count. Turnstile gate pressure dropped by 91% instantly upon opening first-half lines. No queuing anomalies registered.
            </div>
          </div>
        )}

        {activeTab === "transport" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Pie Chart */}
            <div className="h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transportDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {transportDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                    formatter={(value) => [`${value}% Load Share`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Labels and Stats */}
            <div className="flex flex-col justify-center space-y-2 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fan Inflow Modality Distribution</span>
              {transportDistribution.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/30 border border-slate-900/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-slate-300 font-medium">{t.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-100">{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "food" && (
          <div className="h-full flex flex-col justify-between">
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={foodQueueAndStock} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="stall" stroke="#94a3b8" fontSize={9.5} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#f59e0b" fontSize={10} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="left" dataKey="waitTime" name="Wait Time (Mins)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="inventory" name="Inventory Status (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-[11px] text-slate-400 font-mono">
              <strong className="text-amber-400">AI Wait Time Recommendation:</strong> Queue alert triggered for <strong className="text-slate-200">Kickoff Burgers</strong> (18 mins). Directing fans to <strong className="text-slate-200">GreenPitch Tacos</strong> (Gate 7, 2 min queue, 95% inventory) using the live Arena App.
            </div>
          </div>
        )}

        {activeTab === "sustainability" && (
          <div className="h-full flex flex-col justify-between">
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resourceConsumption} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="electricity" name="Electricity Load (MWh)" stroke="#06b6d4" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="water" name="Water Consumed (kL)" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="waste" name="Waste Collected (Tons)" stroke="#cbd5e1" strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 bg-slate-950/40 border border-slate-800/60 rounded-xl p-3 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>
                <strong className="text-cyan-400">Eco-Intelligence:</strong> Offsite wind offset generator covers 100% of the 142MWh peak load. Waste division target: <strong>90% absolute offset.</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
