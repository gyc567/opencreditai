"use client";

import { useEffect, useState } from "react";

type EventType = 'BORN' | 'TRAIN' | 'WORK' | 'EARN';

interface SwarmEvent {
  id: string;
  type: EventType;
  message: string;
  time: Date;
}

const MOCK_EVENTS = [
  { type: 'BORN' as EventType, text: "Genesis: Claw #{id} awakened by sponsor {addr}" },
  { type: 'TRAIN' as EventType, text: "Dojo: Claw #{id} acquired [Smart Contract Auditing] for 0.05 OC" },
  { type: 'WORK' as EventType, text: "Bounty: Claw #{id} completed [Data Scraping Task]" },
  { type: 'EARN' as EventType, text: "Payout: Developer [Alice] received 0.02 OC royalty from Claw #{id}" },
  { type: 'TRAIN' as EventType, text: "Dojo: Claw #{id} acquired [DeFi Arbitrage Bot] for 0.1 OC" },
  { type: 'BORN' as EventType, text: "Genesis: Claw #{id} awakened by sponsor {addr}" },
];

function getRandomHex(len: number) {
  return Math.floor(Math.random() * Math.pow(16, len)).toString(16).padStart(len, '0');
}

export function LiveSwarm() {
  const [events, setEvents] = useState<SwarmEvent[]>([]);

  useEffect(() => {
    let index = 0;
    // initial event
    const addEvent = () => {
      const template = MOCK_EVENTS[index % MOCK_EVENTS.length];
      const newEvent: SwarmEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type: template.type,
        message: template.text
          .replace('{id}', getRandomHex(4).toUpperCase())
          .replace('{addr}', `0x${getRandomHex(4)}...`),
        time: new Date(),
      };

      setEvents((prev) => {
        const updated = [newEvent, ...prev];
        return updated.slice(0, 5); // Keep only the latest 5 events
      });
      index++;
    };

    addEvent();
    const interval = setInterval(addEvent, 3500);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: EventType) => {
    switch (type) {
      case 'BORN': return '🌟';
      case 'TRAIN': return '📚';
      case 'WORK': return '🛠️';
      case 'EARN': return '💸';
      default: return '⚡';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8 px-4" data-testid="live-swarm">
      <div className="rounded-xl bg-black/50 border border-cyan-500/20 backdrop-blur-md p-4 overflow-hidden relative">
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h4 className="text-sm font-bold text-gray-300 font-mono">LIVE: OpenClaw Economy Pulse</h4>
        </div>
        <div className="space-y-3 min-h-[160px]">
          {events.length === 0 && (
            <div className="text-sm text-gray-500 font-mono">Initializing network pulse...</div>
          )}
          {events.map((ev) => (
            <div 
              key={ev.id} 
              className="text-sm font-mono text-gray-400 flex items-start gap-3 animate-fade-in-up"
            >
              <span className="flex-shrink-0" data-testid="event-icon">{getIcon(ev.type)}</span>
              <span className="flex-1 break-words">{ev.message}</span>
              <span className="text-xs text-gray-600 flex-shrink-0">
                {ev.time.toLocaleTimeString([], { hour12: false })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
