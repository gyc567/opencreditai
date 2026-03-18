"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SUPPORTED_WALLETS, useWallet, WalletInfo } from "@/lib/wallet";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { error, refreshWallets, wallets } = useWallet();

  useEffect(() => {
    if (open) {
      refreshWallets();
    }
  }, [open, refreshWallets]);

  const detectedWallets = wallets.filter((w) => w.detected);
  const undetectedWallets = wallets.filter((w) => !w.detected);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-1 rounded-md hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <DialogHeader>
          <DialogTitle className="font-mono">Connect Wallet</DialogTitle>
          <DialogDescription className="font-mono">
            Select a wallet to connect to OpenCreditAi
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-400 font-mono">{error}</p>
            </div>
          )}

          {detectedWallets.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono uppercase">
                Detected
              </p>
              {detectedWallets.map((wallet) => (
                <WalletOption key={wallet.id} wallet={wallet} onSelect={() => onOpenChange(false)} />
              ))}
            </div>
          )}

          {undetectedWallets.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-mono uppercase">
                Available
              </p>
              {undetectedWallets.map((wallet) => (
                <WalletOption key={wallet.id} wallet={wallet} onSelect={() => onOpenChange(false)} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WalletOption({ wallet, onSelect }: { wallet: WalletInfo; onSelect: () => void }) {
  const { connect } = useWallet();

  const handleClick = () => {
    if (wallet.detected) {
      connect();
      onSelect();
    } else {
      window.open(wallet.installUrl, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between p-3 bg-secondary border border-border rounded-md hover:border-accent transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{wallet.icon}</span>
        <span className="font-mono">{wallet.name}</span>
      </div>
      {!wallet.detected && (
        <span className="text-xs text-muted-foreground font-mono">Install</span>
      )}
    </button>
  );
}
