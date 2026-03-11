import { NextRequest, NextResponse } from "next/server";
import {
  decodePaymentRequirement,
  verifyPaymentWithFacilitator,
  calculatePlatformFee,
} from "@/lib/x402";
import { query } from "@/lib/db/client";
import { getAuditRequest, markAuditRequestPaid } from "@/lib/audit";
import { scanFile } from "@/lib/audit/virustotal";
import { sendAuditReport } from "@/lib/audit/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { auditRequestId, signature, paymentRequirement } = body;

    if (!auditRequestId || !signature || !paymentRequirement) {
      return NextResponse.json(
        { error: "auditRequestId, signature, and paymentRequirement are required" },
        { status: 400 }
      );
    }

    const auditRequest = await getAuditRequest(auditRequestId);
    if (!auditRequest) {
      return NextResponse.json(
        { error: "Audit request not found" },
        { status: 404 }
      );
    }

    if (auditRequest.status !== "pending") {
      return NextResponse.json(
        { error: "Audit request already processed" },
        { status: 400 }
      );
    }

    const requirement = decodePaymentRequirement(paymentRequirement);
    const verified = await verifyPaymentWithFacilitator(signature, requirement);

    if (!verified.valid) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 402 }
      );
    }

    const platformFee = calculatePlatformFee(auditRequest.amountUsd);

    const transactions = await query<{
      id: number;
      status: string;
    }>(
      `INSERT INTO transactions (
        listing_id, buyer_wallet, seller_agent_id,
        amount_usd, amount_raw, tx_hash,
        status, facilitator, platform_fee
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, status`,
      [
        null,
        verified.payer,
        null,
        auditRequest.amountUsd,
        verified.amount,
        verified.txHash || null,
        "settled",
        "facilitator",
        platformFee,
      ]
    );

    const transaction = transactions[0];
    await markAuditRequestPaid(auditRequestId, transaction.id);

    // Trigger async scan
    scanFile(auditRequest.fileUrl)
      .then(async (report) => {
        await sendAuditReport(auditRequest.email, {
          requestId: auditRequestId,
          fileName: auditRequest.fileName,
          status: report.status,
          stats: report.stats,
          permalink: report.permalink,
        });
      })
      .catch(() => {
        // Silent fail - scan will timeout
      });

    return NextResponse.json({
      success: true,
      auditRequestId,
      status: "processing",
      message: "Payment verified. Audit processing started.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
