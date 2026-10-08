"use client";

import { useState } from "react";
import Link from "next/link";
import { isConnected, getAddress } from "@stellar/freighter-api";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || "CAF5HM647JPZQK6MOVIV2BX5DO4HSAXZEAIRO3OKFDVJUVENMYFDE7VW";

  async function connectWallet() {
    setConnecting(true);
    try {
      const connected = await isConnected();
      if (connected) {
        const { address } = await getAddress();
        if (address) setWallet(address);
      } else {
        alert("Freighter wallet extension not found. Please install Freighter.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setConnecting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20">
              Y
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              YieldStream
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              Dashboard
            </Link>
            <Link
              href="/create"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              Create Stream
            </Link>
            <button
              onClick={connectWallet}
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

      {/* Hero Body */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full flex flex-col justify-center">
        {/* Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Powered by Stellar Soroban
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            YieldStream Protocol
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Non-custodial, continuous money streaming with automated vault yield routing. Keep locked capital productive while paying recipients per second.
          </p>
        </div>

        {/* Contract ID Badge */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-12 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Active Vault Contract (Testnet)
              </p>
              <p className="font-mono text-sm text-blue-400 break-all select-all">
                {contractId}
              </p>
            </div>
            <a
              href={`https://stellar.expert/explorer/testnet/contract/${contractId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-lg transition shrink-0"
            >
              View on Explorer ↗
            </a>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 p-8 rounded-2xl transition shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">Create Yield Stream</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Stream XLM or stablecoins continuously to any wallet address over a set duration while earning yield on unstreamed escrow balances.
              </p>
            </div>
            <Link
              href="/create"
              className="block text-center w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-600/20 active:scale-[0.99]"
            >
              Start Streaming Yield
            </Link>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 p-8 rounded-2xl transition shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">Live Stream Dashboard</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Monitor incoming and outgoing continuous streams, claim vested liquidity second-by-second, and track interest generated.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="block text-center w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl border border-slate-700 transition active:scale-[0.99]"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        YieldStream Protocol • Prepared for Stellar Drips Program
      </footer>
    </div>
  );
}