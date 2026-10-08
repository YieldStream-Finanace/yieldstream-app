"use client";

import { useState } from "react";
import Link from "next/link";
import { connectFreighterWallet } from "@/lib/wallet";

export default function Dashboard() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    setConnecting(true);
    try {
      const addr = await connectFreighterWallet();
      if (addr) setWallet(addr);
    } finally {
      setConnecting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20">
              Y
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              YieldStream
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
            >
              Dashboard
            </Link>
            <Link
              href="/create"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5"
            >
              Create Stream
            </Link>
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-50"
            >
              {connecting
                ? "Connecting..."
                : wallet
                ? `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            YieldStream Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Track active money streams, claim vested liquidity, and monitor automated yield generation.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Total Active Value Streamed
            </p>
            <div className="text-2xl font-bold text-white">1,000 XLM</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Real-Time Yield Earned
            </p>
            <div className="text-2xl font-bold text-emerald-400">+4.18 XLM</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Active Streams
            </p>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
        </div>

        {/* Active Streams Section */}
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">Active Streams</h2>
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
            <p className="text-slate-400 text-sm mb-4">
              {wallet
                ? `Connected: ${wallet}`
                : "Connect your Freighter wallet to query active vault streams."}
            </p>
            {!wallet && (
              <button
                onClick={handleConnect}
                disabled={connecting}
                className="inline-flex items-center text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg transition"
              >
                {connecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        YieldStream Protocol • Prepared for Stellar Drips Program
      </footer>
    </div>
  );
}