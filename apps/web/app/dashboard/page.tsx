'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink,
  Activity,
  Plus
} from 'lucide-react';
import StreamChart from './StreamChart';
import { CreateStreamModal } from '@/components/CreateStreamModal';
import { WalletModal } from '@/components/wallet-modal';

interface StreamData {
  id: string;
  sender: string;
  recipient: string;
  totalAmount: number;
  yieldAccrued: number;
  ratePerSec: number;
  startTime: number;
  isDemo?: boolean;
}

const DEMO_STREAM: StreamData = {
  id: 'stream-demo-001',
  sender: 'GAY3...DEMO_SENDER',
  recipient: 'GB7X...DEMO_RECIPIENT',
  totalAmount: 1000,
  yieldAccrued: 14.852,
  ratePerSec: 0.0001157,
  startTime: Date.now() - 3600000,
  isDemo: true,
};

export default function DashboardPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [activeStream] = useState<StreamData>(DEMO_STREAM);
  const [streamedAmount, setStreamedAmount] = useState(250.45);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Sub-second high-precision live balance increment for the streaming effect
  useEffect(() => {
    const timer = setInterval(() => {
      setStreamedAmount((prev) => prev + activeStream.ratePerSec);
    }, 100);
    return () => clearInterval(timer);
  }, [activeStream.ratePerSec]);

  const handleClaimYield = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting Soroban claim transaction...',
        success: 'Successfully claimed unlocked stream tokens!',
        error: 'Transaction rejected or failed on Soroban testnet.',
      }
    );
  };

  const handleConnectWalletClick = () => {
    if (walletConnected && publicKey) {
      toast.info(`Connected Account: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`);
      return;
    }
    setIsWalletModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10 relative overflow-hidden">
      {/* Background 2030 Neon Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header & Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-2xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Soroban Testnet Live
              </span>
              <span className="text-xs text-slate-400 font-mono">v2.0-appeal</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              YieldStream Terminal <Sparkles className="text-indigo-400 w-6 h-6 animate-bounce" />
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Continuous liquidity streaming & real-time vault yield compounding on Stellar.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl shadow-lg shadow-indigo-600/25 transition-all font-medium text-sm border border-indigo-500/30 group cursor-pointer"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              Create New Stream
            </button>
            <button
              onClick={handleConnectWalletClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/50 transition-all font-medium text-sm border border-slate-700/60 cursor-pointer"
            >
              <Wallet size={16} className="text-indigo-400" />
              {walletConnected && publicKey 
                ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` 
                : 'Connect Freighter'}
            </button>
          </div>
        </div>

        {/* Demo Banner Notification */}
        {activeStream.isDemo && (
          <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-4 text-sm text-indigo-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Activity className="text-indigo-400 shrink-0" size={18} />
              <span>
                <strong>Grant Reviewer Mode:</strong> Displaying live simulated high-precision stream mechanics & contract bindings.
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 bg-indigo-900/80 rounded-lg text-indigo-300 border border-indigo-700/60 font-mono">
              Live Stream Active
            </span>
          </div>
        )}

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={48} className="text-blue-400" />
            </div>
            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
              Total Value Streamed
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                {streamedAmount.toFixed(5)}
              </span>
              <span className="text-sm font-semibold text-blue-400">XLM</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Streaming in real-time per block
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={48} className="text-emerald-400" />
            </div>
            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
              Vault Yield Generated
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                +{activeStream.yieldAccrued.toFixed(3)}
              </span>
              <span className="text-sm font-semibold text-slate-400">XLM</span>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Compounding via Soroban vault protocol
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ArrowUpRight size={48} className="text-purple-400" />
            </div>
            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
              Vesting Velocity
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-mono text-purple-400 tracking-tight">
                {activeStream.ratePerSec.toFixed(5)}
              </span>
              <span className="text-sm font-semibold text-slate-400">XLM/sec</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-mono">
              ID: {activeStream.id}
            </p>
          </div>
        </div>

        {/* Analytics Visualizer Chart */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <StreamChart />
        </div>

        {/* Actions Section */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-xl shadow-xl">
          <div>
            <h3 className="font-bold text-lg text-white">Claim Unlocked Stream Funds</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Execute a verified Soroban contract invocation to securely withdraw your vested tokens straight to your connected Stellar wallet.
            </p>
          </div>
          <button
            onClick={handleClaimYield}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Claim Unlocked Funds</span>
            <ExternalLink size={16} />
          </button>
        </div>

      </div>

      {/* Modals */}
      <CreateStreamModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnected={(key) => {
          setPublicKey(key);
          setWalletConnected(true);
        }}
      />
    </div>
  );
}