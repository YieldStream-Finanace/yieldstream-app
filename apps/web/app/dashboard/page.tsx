"use client";

import { useState, useEffect } from "react";
import { isConnected, getAddress } from "@stellar/freighter-api";

interface Stream {
  id: string;
  sender: string;
  recipient: string;
  totalAmount: string;
  streamedAmount: string;
  yieldGenerated: string;
  status: "Active" | "Completed" | "Cancelled";
}

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    async function checkWallet() {
      try {
        const connected = await isConnected();
        if (connected) {
          const { address } = await getAddress();
          if (address) {
            setWalletAddress(address);
            // Mock sample active stream for UI demonstration
            setStreams([
              {
                id: "stream-001",
                sender: address,
                recipient: "GAC3...9XQK",
                totalAmount: "1,000 XLM",
                streamedAmount: "342.12 XLM",
                yieldGenerated: "+4.18 XLM",
                status: "Active",
              },
            ]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    checkWallet();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">YieldStream Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track active money streams and automated yield generation.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300">
          {walletAddress
            ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Wallet Not Connected"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">Total Active Value Streamed</p>
          <p className="text-2xl font-bold text-white">1,000 XLM</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">Real-Time Yield Earned</p>
          <p className="text-2xl font-bold text-green-400">+4.18 XLM</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">Active Streams</p>
          <p className="text-2xl font-bold text-blue-400">{streams.length}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Active Streams</h2>
      {loading ? (
        <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-xl border border-slate-800">
          Loading stream state...
        </div>
      ) : streams.length === 0 ? (
        <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-xl border border-slate-800">
          No active streams found for this wallet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="p-4">Stream ID</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Streamed To Date</th>
                <th className="p-4">Yield Earned</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {streams.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono">{s.id}</td>
                  <td className="p-4 font-mono">{s.recipient}</td>
                  <td className="p-4">{s.totalAmount}</td>
                  <td className="p-4 text-blue-400">{s.streamedAmount}</td>
                  <td className="p-4 text-green-400">{s.yieldGenerated}</td>
                  <td className="p-4">
                    <span className="bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full text-xs font-medium">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}