import { NextRequest, NextResponse } from "next/server";
import { createAuditRequest } from "@/lib/audit";
import { uploadAuditFile } from "@/lib/audit/storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const file = formData.get("file") as File;

    if (!email || !file) {
      return NextResponse.json(
        { error: "Email and file are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 50MB limit" },
        { status: 400 }
      );
    }

    const fileUrl = await uploadAuditFile(file, file.name);

    const auditRequest = await createAuditRequest({
      email,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
    });

    return NextResponse.json(
      {
        auditRequestId: auditRequest.id,
        amount: "$10.00",
        message: "Payment required to proceed with audit",
      },
      {
        status: 402,
        headers: {
          "PAYMENT-REQUIRED": auditRequest.paymentRequirement || "",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create audit request" },
      { status: 500 }
    );
  }
}
