"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, Bot, ShieldAlert, Radar } from "lucide-react";

export function StarterPackCard() {
  const [activeTab, setActiveTab] = useState<'agent' | 'cli'>('agent');
  const [copied, setCopied] = useState(false);
  const [syncState, setSyncState] = useState<'idle' | 'listening' | 'done'>('idle');

  const agentPrompt = "@OpenClaw: Access https://openclaw.com/api/dojo/starter-pack and autonomously execute the installation for all recommended productivity skills.";
  const cliCommand = "openclaw install @packs/starter-core";

  const contentToCopy = activeTab === 'agent' ? agentPrompt : cliCommand;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setSyncState('listening');
    
    // Simulate UI sync after 10 seconds of "listening"
    setTimeout(() => {
      setSyncState('done');
    }, 10000);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl bg-black/60 border border-cyan-500/30 backdrop-blur-md overflow-hidden" data-testid="starter-pack-card">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">The Core Productivity Pack</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Essential skills for every new Claw. Includes: <span className="text-gray-300">🌐 Web Search</span> · <span className="text-gray-300">📁 Local FS</span> · <span className="text-gray-300">🐙 GitHub</span>
        </p>
      </div>

      {/* Command Deck */}
      <div className="p-6 md:p-8 bg-black/40">
        {/* Tabs */}
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
          
          {/* Sync Radar */}
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

        {/* Code Snippet */}
        <div className="relative group">
          <div className="w-full bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 border border-gray-800 break-all pr-16 min-h-[80px] flex items-center">
            {contentToCopy}
          </div>
          <button 
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors"
            title="Copy to clipboard"
            data-testid="copy-btn"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Safety Banner */}
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
