import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, ArrowRight, Languages, Loader2, Bot, User, Volume2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  simulated?: boolean;
}

interface AIAssistantProps {
  currentContext: any;
}

const LANGUAGES = [
  { code: "English", name: "English" },
  { code: "Spanish", name: "Español (Spanish)" },
  { code: "French", name: "Français (French)" },
  { code: "Arabic", name: "العربية (Arabic)" },
  { code: "Hindi", name: "हिन्दी (Hindi)" },
  { code: "Portuguese", name: "Português (Portuguese)" },
  { code: "Japanese", name: "日本語 (Japanese)" },
  { code: "German", name: "Deutsch (German)" },
  { code: "Kannada", name: "ಕನ್ನಡ (Kannada)" },
];

const SUGGESTED_QUESTIONS = [
  { text: "Where is Gate 7?", label: "Accessible Gate Info" },
  { text: "Which food stall has the shortest queue?", label: "Shortest Food Queue" },
  { text: "Predict halftime crowd movement", label: "Crowd Prediction" },
  { text: "Generate emergency announcement for fire", label: "Evacuation Protocol" },
  { text: "Summarize today's stadium sustainability report", label: "Sustainability Audit" },
  { text: "Translate announcement into Spanish", label: "Broadcast Translation" },
];

export default function AIAssistant({ currentContext }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      sender: "ai",
      text: "👋 Welcome to the **ArenaMind AI Command Desk**! I am the operational brain for FIFA World Cup 2026 stadium events. Ask me anything about crowd telemetry, security alerts, accessibility routes, parking status, or sustainability metrics.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          context: currentContext,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact the ArenaMind AI server.");
      }

      const data = await response.json();
      
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "I apologize, I received an empty response from the operational matrix.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        simulated: data.simulated,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error("AI assistant error:", error);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: `❌ **Operational Link Broken:** ${error.message || "Failed to communicate with the server."}\n\n*Please ensure that process.env.GEMINI_API_KEY is configured or let me respond using standard pre-configured local telemetry mock backups.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-5 shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 h-full flex flex-col relative group overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20 animate-pulse shrink-0">
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              ArenaMind AI Co-Pilot
              <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 uppercase font-mono font-bold">
                GenAI 3.5 Pro
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">Natural Language Tournament Intelligence Desk</p>
          </div>
        </div>

        {/* Language Selection */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Languages className="w-4 h-4 text-cyan-400 shrink-0" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-slate-950/80 border border-slate-800/60 text-xs text-slate-300 rounded-lg py-1 px-2 focus:outline-none focus:border-cyan-500/60 font-sans"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages Sandbox */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3.5 mb-4 custom-scrollbar min-h-[220px] max-h-[360px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800/80 self-start shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}
            
            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed font-sans ${
                msg.sender === "user"
                  ? "bg-slate-800/50 text-slate-200 border border-slate-800 rounded-tr-none self-end italic"
                  : "text-cyan-100 bg-cyan-500/10 border-l-2 border-cyan-500 rounded-tl-none shadow-[0_0_15px_rgba(6,182,212,0.02)]"
              }`}
            >
              <div className="whitespace-pre-line prose prose-invert prose-xs">
                {msg.text}
              </div>
              <div className={`text-[9px] mt-1.5 font-mono ${msg.sender === "user" ? "text-slate-500" : "text-cyan-500/80"} flex items-center justify-between gap-4`}>
                <span>{msg.timestamp}</span>
                {msg.sender === "ai" && msg.simulated && (
                  <span className="text-cyan-400/75 italic bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-950/40">
                    Telemetry Engine simulation active
                  </span>
                )}
              </div>
            </div>

            {msg.sender === "user" && (
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center self-start shrink-0 shadow-md shadow-cyan-500/10">
                <User className="w-4 h-4 text-slate-950" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800/80 self-start animate-spin">
              <Loader2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="bg-cyan-500/5 text-cyan-300/80 rounded-xl p-3 text-xs border border-cyan-500/10 rounded-tl-none font-mono">
              Analyzing telemetry feeds & generating response...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Grid */}
      <div className="mb-4">
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1.5 font-mono flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-500" />
          Smart Query Accelerator
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              disabled={isLoading}
              className="text-[10px] text-left text-slate-400 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/40 hover:border-cyan-500/30 px-2 py-1.5 rounded-lg transition-all line-clamp-1 hover:text-slate-200"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="flex items-center gap-2 mt-auto"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask ArenaMind in ${selectedLanguage}...`}
          disabled={isLoading}
          className="flex-1 bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 placeholder-slate-500 rounded-xl py-2 px-3 focus:outline-none focus:border-cyan-500/50 font-sans"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-all disabled:bg-slate-800 disabled:text-slate-500 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/15"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
