import { NextRequest, NextResponse } from "next/server";
import { getAuditRequest } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auditRequestId = parseInt(id, 10);

    if (isNaN(auditRequestId)) {
      return NextResponse.json(
        { error: "Invalid audit request ID" },
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

    return NextResponse.json({
      id: auditRequest.id,
      status: auditRequest.status,
      fileName: auditRequest.fileName,
      createdAt: auditRequest.createdAt,
      paidAt: auditRequest.paidAt,
      completedAt: auditRequest.completedAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to get audit status" },
      { status: 500 }
    );
  }
}
