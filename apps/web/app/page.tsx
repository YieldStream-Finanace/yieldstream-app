'use client';

import React, { useState } from 'react';
import WalletConnect from '../components/WalletConnect';

export default function Home() {
  const contractId = process.env.NEXT_PUBLIC_VAULT_CONTRACT_ID || 'CAF5HM647JPZQK6MOVIV2BX5DO4HSAXZEAIRO3OKFDVJUVENMYFDE7VW';
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <main className="min-h-screen p-8 bg-slate-900 text-white font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-400">
              YieldStream Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Non-custodial yield streaming on Stellar Soroban
            </p>
          </div>
          <WalletConnect />
        </header>

        <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Active Vault Contract ID
          </h2>
          <code className="text-sm bg-slate-950 p-3 rounded block text-emerald-300 font-mono break-all border border-slate-800">
            {contractId}
          </code>
        </div>

        <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 space-y-4">
          <h3 className="text-lg font-semibold text-white">Create Yield Stream</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Recipient Address</label>
              <input
                type="text"
                placeholder="G..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Deposit Amount (XLM)</label>
              <input
                type="number"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2 rounded transition-colors w-full">
            Start Streaming Yield
          </button>
        </div>
      </div>
    </main>
  );
}
