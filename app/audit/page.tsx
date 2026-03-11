"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, FileCheck, Clock, Mail, Upload } from "lucide-react";
import { AuditForm } from "./components/audit-form";
import { PaymentModal } from "./components/payment-modal";
import { useAuditPayment } from "./hooks/use-audit-payment";

export default function AuditPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isLoading, auditRequest, createAuditRequest, verifyPayment, reset } = useAuditPayment();

  const handleSubmit = async (email: string, file: File) => {
    setSelectedFile(file);
    await createAuditRequest(email, file);
    setShowPayment(true);
  };

  const handlePayment = async () => {
    if (!auditRequest) return;

    if (typeof window.ethereum === "undefined") {
      throw new Error("Please install MetaMask or another Web3 wallet");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    }) as string[];

    if (!accounts.length) {
      throw new Error("Please connect your wallet");
    }

    const message = `Pay ${auditRequest.amount} for audit request #${auditRequest.auditRequestId}`;
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, accounts[0]],
    }) as string;

    await verifyPayment(auditRequest.auditRequestId, signature, auditRequest.paymentRequirement);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-mono text-sm uppercase tracking-wider">
              Professional Review
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground font-mono">
              Skill Audit Service
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your skill files and get a comprehensive audit report covering
              code quality, security vulnerabilities, and best practices.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Step 1
              </p>
              <p className="font-semibold text-foreground">Upload Skill File</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Step 2
              </p>
              <p className="font-semibold text-foreground">Pay $10 Securely</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Step 3
              </p>
              <p className="font-semibold text-foreground">Get Report by Email</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground font-mono mb-2">
              Upload Your Skill
            </h2>
            <p className="text-muted-foreground mb-8">
              Submit your skill package for professional audit.
            </p>
            <AuditForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground font-mono text-center mb-12">
            What's Included
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Code Quality Review
              </h3>
              <p className="text-sm text-muted-foreground">
                Analysis of code structure, readability, and adherence to best practices.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Security Assessment
              </h3>
              <p className="text-sm text-muted-foreground">
                Identification of potential vulnerabilities and security recommendations.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Performance Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Evaluation of efficiency, resource usage, and optimization opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Privacy & Security
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Uploads are encrypted and stored securely</li>
              <li>• Files are deleted after processing (within 24 hours)</li>
              <li>• Raw code is analyzed transiently and not persisted</li>
              <li>• Reports include findings and recommendations only</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />

      <PaymentModal
        isOpen={showPayment}
        onClose={() => {
          setShowPayment(false);
          if (!isLoading) reset();
        }}
        onPay={handlePayment}
        amount={auditRequest?.amount || "$10.00"}
        fileName={selectedFile?.name || ""}
      />
    </main>
  );
}
