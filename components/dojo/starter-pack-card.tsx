"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, Bot, ShieldAlert, Radar, Loader2 } from "lucide-react";

interface StarterPackData {
  pack_name: string;
  pack_description: string;
  skills: Array<{ id: string; name: string; category: string; note?: string }>;
  agent_prompt: string;
  short_prompt: string;
}

export function StarterPackCard() {
  const [activeTab, setActiveTab] = useState<'agent' | 'cli'>('agent');
  const [copied, setCopied] = useState(false);
  const [syncState, setSyncState] = useState<'idle' | 'listening' | 'done'>('idle');
  const [packData, setPackData] = useState<StarterPackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dojo/starter-pack')
      .then(res => res.json())
      .then(data => {
        setPackData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load starter pack:', err);
        setLoading(false);
      });
  }, []);

  const cliCommand = packData 
    ? `npx clawhub@latest install ${packData.skills.slice(0, 5).map(s => s.id).join(' ')}...`
    : "openclaw install @packs/starter-core";

  const contentToCopy = activeTab === 'agent' 
    ? (packData?.agent_prompt || "") 
    : cliCommand;

  const skillCount = packData?.skills?.length || 24;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setSyncState('listening');
    
    setTimeout(() => {
      setSyncState('done');
    }, 10000);

    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-xl bg-black/60 border border-cyan-500/30 backdrop-blur-md overflow-hidden p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl bg-black/60 border border-cyan-500/30 backdrop-blur-md overflow-hidden" data-testid="starter-pack-card">
      <div className="p-6 md:p-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{packData?.pack_name || "The Core Productivity Pack"}</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          {packData?.pack_description || "Essential skills for every new Claw."}
          <span className="ml-2 text-cyan-400 font-mono">({skillCount} skills)</span>
        </p>
      </div>

      <div className="p-6 md:p-8 bg-black/40">
        <div className="flex items-center gap-4 mb-4 border-b border-gray-800 pb-2">
          <button 
            onClick={() => setActiveTab('agent')}
            className={`flex items-center gap-2 pb-2 px-1 border-b-2 transition-colors ${activeTab === 'agent' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            data-testid="tab-agent"
          >
            <Bot className="w-4 h-4" />
            <span className="font-mono text-sm font-bold">Agentic (Recommended)</span>
          </button>
          <button 
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-2 pb-2 px-1 border-b-2 transition-colors ${activeTab === 'cli' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            data-testid="tab-cli"
          >
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-sm font-bold">Manual CLI</span>
          </button>
          
          <div className="ml-auto flex items-center gap-2">
            {syncState === 'listening' && (
              <>
                <Radar className="w-4 h-4 text-yellow-500 animate-spin" />
                <span className="text-xs text-yellow-500 font-mono hidden sm:inline">Listening for Claw...</span>
              </>
            )}
            {syncState === 'done' && (
              <button className="text-xs text-cyan-400 font-mono flex items-center gap-1 hover:text-cyan-300">
                <Check className="w-3 h-3" /> Refresh Status
              </button>
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="w-full bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 border border-gray-800 break-all pr-16 min-h-[80px] overflow-y-auto max-h-[300px]">
            {activeTab === 'agent' ? (
              <pre className="whitespace-pre-wrap">{contentToCopy}</pre>
            ) : (
              <span>{contentToCopy}</span>
            )}
          </div>
          <button 
            onClick={handleCopy}
            className="absolute right-2 top-2 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors"
            title="Copy to clipboard"
            data-testid="copy-btn"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-4 flex items-start gap-3 p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs">
          <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Safe Mode Enforced:</strong> Regardless of the installation method, your Claw will request final terminal confirmation (Y/n) before mounting any skills.
          </p>
        </div>
      </div>
    </div>
  );
}
