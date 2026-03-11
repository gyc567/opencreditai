"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, CheckCircle, AlertCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => Promise<void>;
  amount: string;
  fileName: string;
}

export function PaymentModal({ isOpen, onClose, onPay, amount, fileName }: PaymentModalProps) {
  const [status, setStatus] = useState<"idle" | "connecting" | "processing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePay = async () => {
    setStatus("processing");
    setErrorMessage(null);
    try {
      await onPay();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Payment failed");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-accent" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">File</span>
              <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{fileName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-lg font-bold text-accent">{amount}</span>
            </div>
          </div>

          {status === "idle" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Connect your wallet to complete the payment securely via Base chain.
              </p>
              <Button onClick={handlePay} className="w-full" size="lg">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet & Pay
              </Button>
            </div>
          )}

          {status === "connecting" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Connecting to wallet...</p>
            </div>
          )}

          {status === "processing" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Processing payment...</p>
              <p className="text-xs text-muted-foreground mt-2">Please confirm in your wallet</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <p className="text-lg font-semibold text-foreground">Payment Successful!</p>
              <p className="text-sm text-muted-foreground mt-2">
                Your audit is being processed. You will receive an email shortly.
              </p>
              <Button onClick={handleClose} className="mt-4">
                Done
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-lg font-semibold text-foreground">Payment Failed</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {errorMessage || "An error occurred while processing payment"}
                </p>
              </div>
              <Button onClick={handlePay} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
