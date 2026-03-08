// Creator API - GET creator by ID
// GET /api/v1/creators/[id] - Get single creator

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/v1/creators/[id] - Get creator by ID
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const creators = await query(
      `SELECT 
        c.id,
        c.address,
        c.username,
        c.display_name as "displayName",
        c.avatar_url as "avatarUrl",
        c.bio,
        c.category,
        c.total_earnings as "totalEarnings",
        c.total_sales as "totalSales",
        c.rating,
        c.is_verified as "isVerified",
        c.created_at as "createdAt",
        COUNT(l.id) as "listingCount"
      FROM creators c
      LEFT JOIN listings l ON l.creator_id = c.id AND l.is_published = true
      WHERE c.id = $1
      GROUP BY c.id`,
      [id]
    );

    if (creators.length === 0) {
      return NextResponse.json(
        { error: "Creator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: creators[0],
    });
  } catch (error) {
    console.error("[Creator API] Get error:", error);
    return NextResponse.json(
      { error: "Failed to fetch creator" },
      { status: 500 }
    );
  }
}
