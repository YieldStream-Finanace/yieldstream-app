"use client";

import { useState } from "react";
import Link from "next/link";
import { isConnected, getAddress } from "@stellar/freighter-api";

export default function CreateStream() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("100");
  const [duration, setDuration] = useState("30");

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

  async function handleCreateStream(e: React.FormEvent) {
    e.preventDefault();
    if (!wallet) {
      await connectWallet();
      return;
    }
    setLoading(true);
    try {
      // Soroban vault creation logic invocation via stellar-sdk
      alert(`Stream initiated for ${amount} XLM to ${recipient.slice(0, 6)}... over ${duration} days!`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-1.5"
            >
              Dashboard
            </Link>
            <Link
              href="/create"
              className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
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

      {/* Main Creation Form Container */}
      <main className="max-w-xl mx-auto px-6 py-12 w-full flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Create Yield Stream
          </h1>
          <p className="text-slate-400 text-sm">
            Lock capital into Soroban escrow to stream tokens continuously while earning dynamic vault yield.
          </p>
        </div>

        <form
          onSubmit={handleCreateStream}
          className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-6"
        >
          {/* Recipient Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              required
              placeholder="G..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition font-mono"
            />
          </div>

          {/* Deposit Amount */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Deposit Amount (XLM / USDC)
            </label>
            <input
              type="number"
              required
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition"
            />
          </div>

          {/* Duration in Days */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Duration (Days)
            </label>
            <input
              type="number"
              required
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition"
            />
          </div>

          {/* Calculated Streaming Rate Info */}
          <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 flex justify-between items-center text-xs text-slate-400">
            <span>Estimated Streaming Rate:</span>
            <span className="font-semibold text-blue-400">
              {(Number(amount) / (Number(duration) * 86400)).toFixed(6)} XLM/sec
            </span>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Initializing Vault..." : "Start Streaming Yield"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        YieldStream Protocol • Prepared for Stellar Drips Program
      </footer>
    </div>
  );
}