"use client";

import { useState, useCallback } from "react";

interface AuditRequest {
  auditRequestId: number;
  amount: string;
  paymentRequirement: string;
}

interface UseAuditPaymentReturn {
  isLoading: boolean;
  error: string | null;
  auditRequest: AuditRequest | null;
  createAuditRequest: (email: string, file: File) => Promise<AuditRequest>;
  verifyPayment: (auditRequestId: number, signature: string, paymentRequirement: string) => Promise<void>;
  reset: () => void;
}

export function useAuditPayment(): UseAuditPaymentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditRequest, setAuditRequest] = useState<AuditRequest | null>(null);

  const createAuditRequest = useCallback(async (email: string, file: File): Promise<AuditRequest> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", file);

      const response = await fetch("/api/audit/request", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create audit request");
      }

      const paymentRequirement = response.headers.get("PAYMENT-REQUIRED") || "";
      const data = await response.json();

      const request: AuditRequest = {
        auditRequestId: data.auditRequestId,
        amount: data.amount,
        paymentRequirement,
      };

      setAuditRequest(request);
      return request;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyPayment = useCallback(async (
    auditRequestId: number,
    signature: string,
    paymentRequirement: string
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/audit/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditRequestId,
          signature,
          paymentRequirement,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Payment verification failed");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Payment verification failed");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setAuditRequest(null);
  }, []);

  return {
    isLoading,
    error,
    auditRequest,
    createAuditRequest,
    verifyPayment,
    reset,
  };
}
