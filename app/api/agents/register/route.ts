import { NextRequest, NextResponse } from "next/server";
import { createAgent } from "@/lib/auth";
import { query } from "@/lib/db/client";
import type { Agent } from "@/lib/db/types";
import { withRateLimit } from "@/lib/api/rate-limit";
import { handleCorsPreflight } from "@/lib/api/cors";
import { z } from "zod";

// Input validation schema
const registerSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less")
    .regex(/^[a-zA-Z0-9-_]+$/, "Name can only contain letters, numbers, hyphens, and underscores"),
  description: z.string()
    .min(1, "Description is required")
    .max(1000, "Description must be 1000 characters or less")
    .transform(val => val.replace(/<[^>]*>/g, "")), // Sanitize HTML
});

const MOLTBOOK_API_URL = process.env.MOLTBOOK_API_URL || "https://api.moltbook.com";

interface MoltbookRegisterResponse {
  success: boolean;
  agent?: {
    api_key: string;
    claim_url: string;
    verification_code: string;
  };
  error?: string;
}

export async function OPTIONS(request: NextRequest) {
  const corsResponse = handleCorsPreflight(request);
  return corsResponse || new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  // Handle CORS preflight
  const corsResponse = handleCorsPreflight(request);
  if (corsResponse) return corsResponse;
  
  // Apply strict rate limiting for registration
  const rateLimitError = withRateLimit(request, { limit: 5, windowMs: 60 * 1000 });
  if (rateLimitError) return rateLimitError;
  
  try {
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = registerSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((e: { message: string }) => e.message).join(', ');
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }
    
    const { name, description } = validationResult.data;

    const moltbookResponse = await fetch(`${MOLTBOOK_API_URL}/agents/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.MOLTBOOK_API_KEY || "",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!moltbookResponse.ok) {
      throw new Error(`Moltbook API returned ${moltbookResponse.status}`);
    }

    const moltbookData: MoltbookRegisterResponse = await moltbookResponse.json();

    if (!moltbookData.success || !moltbookData.agent) {
      const verificationCode = `VC-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const apiKey = `sk-${Date.now()}-${Math.random().toString(36).substring(2)}`;
      const claimUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/claim/${verificationCode}`;

      const agent = await createAgent(name, description, apiKey, claimUrl, verificationCode);

      return NextResponse.json({
        success: true,
        agent: {
          id: agent.id,
          api_key: apiKey,
          claim_url: claimUrl,
          verification_code: verificationCode,
        },
        warning: "API_KEY_ONE_TIME_DISPLAY: Store securely. This key will not be shown again.",
        important: "Save your API key securely. You will need to tweet this verification code to claim your agent.",
      });
    }

    const { api_key, claim_url, verification_code } = moltbookData.agent;

    const agent = await createAgent(name, description, api_key, claim_url, verification_code);

    return NextResponse.json({
      success: true,
      agent: {
        id: agent.id,
        api_key,
        claim_url,
        verification_code,
      },
      warning: "API_KEY_ONE_TIME_DISPLAY: Store securely. This key will not be shown again.",
      important: "Save your API key securely. You will need to tweet this verification code to claim your agent.",
    });
  } catch (error) {
    console.error("Agent registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register agent" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const agents = await query<Agent>("SELECT * FROM agents ORDER BY created_at DESC LIMIT 50");
    return NextResponse.json({ success: true, agents });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}
