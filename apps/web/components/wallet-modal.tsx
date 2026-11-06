'use client';

import { useState } from 'react';
import { X, Shield, Cpu, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getAddress } from '@stellar/freighter-api';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: (publicKey: string) => void;
}

export function WalletModal({ isOpen, onClose, onConnected }: WalletModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const handleFreighterConnect = async () => {
    setIsConnecting(true);
    try {
      // 1. Get address response object from Freighter
      const response = await getAddress();

      if (response && 'error' in response && response.error) {
        throw new Error(String(response.error));
      }

      const publicKey = response?.address;

      if (!publicKey) {
        throw new Error('No public key returned. Please check if Freighter is unlocked.');
      }

      // 2. Authenticate with backend database route
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicKey }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Backend authentication failed');

      onConnected(publicKey);
      toast.success('Wallet authenticated & saved to indexer database!');
      setIsConnecting(false);
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to connect Freighter wallet.');
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Connect Secure Wallet <Shield className="text-indigo-400 w-5 h-5"/>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sign-In with Stellar (SIWS) for your indexer session.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800/50 cursor-pointer"
          >
            <X size="{20}"/>
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <button
            onClick={handleFreighterConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 bg-slate-950/80 hover:bg-slate-800/50 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all group cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Cpu size="{20}"/>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white flex items-center gap-2">
                  Freighter Wallet
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-400">Browser Extension & Self-Custody</p>
              </div>
            </div>
            <div>
              {isConnecting ? (
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className="text-slate-600 group-hover:text-indigo-400 transition-colors" size="{18}"/>
              )}
            </div>
          </button>

          <div className="p-3.5 bg-slate-950/40 border border-slate-800/60 rounded-xl flex items-start gap-3 text-xs text-slate-400">
            <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size="{16}"/>
            <div>
              Need the extension? Get it from the{' '}
              <a 
                href="[https://www.freighter.app/](https://www.freighter.app/)" 
                target="_blank" 
                rel="noreferrer"
                className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                official store <ExternalLink size="{10}"/>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 font-mono">
            Secured via Soroban cryptographic identity standard
          </p>
        </div>

      </div>
    </div>
  );
}