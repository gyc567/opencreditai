"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, FileCheck, Clock, Mail, Upload } from "lucide-react";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
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

          {/* Steps */}
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

      {/* Upload Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground font-mono mb-2">
              Upload Your Skill
            </h2>
            <p className="text-muted-foreground mb-8">
              Submit your skill package for professional audit. We accept various
              formats including ZIP archives and individual code files.
            </p>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="audit-email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="audit-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="audit-file"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Skill File
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <input
                    id="audit-file"
                    type="file"
                    accept=".zip,.js,.ts,.json,.md"
                    required
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("audit-file")?.click()
                    }
                  >
                    Select File
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Accepted formats: .zip, .js, .ts, .json, .md up to 50MB
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Continue to Payment — $10
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* What's Included */}
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
                Analysis of code structure, readability, and adherence to best
                practices.
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
                Identification of potential vulnerabilities and security best
                practice recommendations.
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
                Evaluation of efficiency, resource usage, and optimization
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-16 px-4 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Privacy & Security
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                • Uploads are encrypted and stored securely
              </li>
              <li>
                • Files are deleted after processing (within 24 hours)
              </li>
              <li>
                • Raw code is analyzed transiently and not persisted
              </li>
              <li>
                • Reports include findings and recommendations only
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground font-mono text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What files can I upload?
              </h3>
              <p className="text-sm text-muted-foreground">
                We accept ZIP archives containing your skill package, or
                individual .js, .ts, .json, and .md files up to 50MB.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">
                How long does it take?
              </h3>
              <p className="text-sm text-muted-foreground">
                Most audit reports are delivered within 1 hour after payment
                confirmation.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">
                What data do you store?
              </h3>
              <p className="text-sm text-muted-foreground">
                We store your email, processing metadata, and the audit report.
                Raw source code is not retained after processing.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Can I get a refund?
              </h3>
              <p className="text-sm text-muted-foreground">
                If we cannot complete the audit for any reason, you'll receive a
                full refund automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
