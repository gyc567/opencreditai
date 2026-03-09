import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db/client";

/**
 * POST /api/admin/migrate - Run database migrations
 * WARNING: This endpoint should be protected in production
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const migrationName = body.migration;

    if (!migrationName) {
      return NextResponse.json(
        { error: "Migration name required" },
        { status: 400 }
      );
    }

    // Migration: Add category column to creators table
    if (migrationName === "005_add_creators_category") {
      await query(`
        ALTER TABLE creators ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general'
      `);
      await query(`
        CREATE INDEX IF NOT EXISTS idx_creators_category ON creators(category)
      `);
      await query(`
        CREATE INDEX IF NOT EXISTS idx_creators_is_verified_category ON creators(is_verified, category)
      `);
      
      return NextResponse.json({
        success: true,
        message: "Migration 005_add_creators_category applied"
      });
    }

    return NextResponse.json(
      { error: "Unknown migration" },
      { status: 404 }
    );
  } catch (error) {
    console.error("[Migration] Error:", error);
    return NextResponse.json(
      { error: "Migration failed" },
      { status: 500 }
    );
  }
}
