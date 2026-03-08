// Listings API - Dynamic Route
// GET /api/listings/[id] - Get single listing with x402 payment protection

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db/client";
import { x402Middleware } from "@/lib/x402/middleware";
import { isValidEthAddress, calculatePlatformFee } from "@/lib/x402";
import { requireAuth } from "@/lib/api/auth";

interface ListingRow {
  id: number;
  agent_id: number;
  type: string;
  name: string;
  description: string | null;
  category: string | null;
  price_usd: number;
  is_published: boolean;
  version: string;
  package_url: string | null;
  x402_enabled: boolean;
  created_at: Date;
  updated_at: Date;
  agent_name: string | null;
  agent_description: string | null;
  wallet_address: string | null;
  creator_id: number | null;
}

function validateListingInput(body: Record<string, unknown>): string[] {
  const errors: string[] = [];
  
  if (body.name !== undefined && typeof body.name === "string") {
    if (body.name.length < 3 || body.name.length > 255) {
      errors.push("Name must be between 3 and 255 characters");
    }
  }
  
  if (body.description !== undefined && typeof body.description === "string") {
    if (body.description.length > 10000) {
      errors.push("Description cannot exceed 10000 characters");
    }
  }
  
  if (body.priceUsd !== undefined) {
    const price = Number(body.priceUsd);
    if (isNaN(price) || price < 0) {
      errors.push("Price must be a non-negative number");
    }
    if (price > 99999.99) {
      errors.push("Price cannot exceed 99999.99");
    }
  }
  
  if (body.version !== undefined && typeof body.version === "string") {
    if (!/^\d+\.\d+\.\d+$/.test(body.version)) {
      errors.push("Version must be in semver format (e.g., 1.0.0)");
    }
  }
  
  if (body.packageUrl !== undefined && typeof body.packageUrl === "string") {
    try {
      new URL(body.packageUrl);
    } catch {
      errors.push("Package URL must be a valid URL");
    }
  }
  
  return errors;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listingId = parseInt(id, 10);

  if (isNaN(listingId)) {
    return NextResponse.json(
      { success: false, error: "Invalid listing ID" },
      { status: 400 }
    );
  }

  try {
    const listings = await query<ListingRow>(
      `SELECT 
        l.*,
        a.name as agent_name,
        a.description as agent_description,
        w.address as wallet_address,
        c.id as creator_id
      FROM listings l
      LEFT JOIN agents a ON l.agent_id = a.id
      LEFT JOIN wallets w ON l.agent_id = w.agent_id AND w.is_verified = true
      LEFT JOIN creators c ON c.agent_id = l.agent_id
      WHERE l.id = $1`,
      [listingId]
    );

    if (listings.length === 0) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    const listing = listings[0];

    if (!listing.is_published) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    if (listing.price_usd === 0 || !listing.x402_enabled) {
      return NextResponse.json({
        success: true,
        listing: formatListing(listing),
        pricing: {
          priceUsd: listing.price_usd,
          platformFee: calculatePlatformFee(listing.price_usd),
        },
      });
    }

    if (!listing.wallet_address || !isValidEthAddress(listing.wallet_address)) {
      console.error("[listings] Seller wallet not found or invalid:", listing.id);
      return NextResponse.json(
        { success: false, error: "Seller payment setup incomplete" },
        { status: 500 }
      );
    }

    return x402Middleware(
      async () => {
        return NextResponse.json({
          success: true,
          listing: formatListing(listing),
          pricing: {
            priceUsd: listing.price_usd,
            platformFee: calculatePlatformFee(listing.price_usd),
            sellerEarnings: listing.price_usd * 0.95,
          },
        });
      },
      {
        price: listing.price_usd.toString(),
        recipient: listing.wallet_address,
        description: `Access to ${listing.name} skill`,
        asset: "USDC",
        chain: process.env.NEXT_PUBLIC_CHAIN === "mainnet" ? "mainnet" : "sepolia",
      }
    )(request);
  } catch (error) {
    console.error("Listing fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { id } = await params;
  const listingId = parseInt(id, 10);

  if (isNaN(listingId)) {
    return NextResponse.json(
      { success: false, error: "Invalid listing ID" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    
    const validationErrors = validateListingInput(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, error: validationErrors.join("; ") },
        { status: 400 }
      );
    }

    const { name, description, category, priceUsd, version, packageUrl, isPublished, x402Enabled } = body;

    const existing = await query<ListingRow>(
      "SELECT id, agent_id, creator_id FROM listings WHERE id = $1",
      [listingId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    const listing = existing[0];
    if (listing.creator_id && listing.creator_id !== authResult.creatorId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - you don't own this listing" },
        { status: 403 }
      );
    }

    const updates: string[] = [];
    const updateParams: unknown[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      updateParams.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      updateParams.push(description);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      updateParams.push(category);
    }
    if (priceUsd !== undefined) {
      updates.push(`price_usd = $${paramIndex++}`);
      updateParams.push(priceUsd);
    }
    if (version !== undefined) {
      updates.push(`version = $${paramIndex++}`);
      updateParams.push(version);
    }
    if (packageUrl !== undefined) {
      updates.push(`package_url = $${paramIndex++}`);
      updateParams.push(packageUrl);
    }
    if (isPublished !== undefined) {
      updates.push(`is_published = $${paramIndex++}`);
      updateParams.push(isPublished);
    }
    if (x402Enabled !== undefined) {
      updates.push(`x402_enabled = $${paramIndex++}`);
      updateParams.push(x402Enabled);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      );
    }

    updates.push(`updated_at = NOW()`);
    updateParams.push(listingId);

    const updated = await query<ListingRow>(
      `UPDATE listings SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
      updateParams
    );

    return NextResponse.json({
      success: true,
      listing: formatListing(updated[0]),
    });
  } catch (error) {
    console.error("Listing update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { id } = await params;
  const listingId = parseInt(id, 10);

  if (isNaN(listingId)) {
    return NextResponse.json(
      { success: false, error: "Invalid listing ID" },
      { status: 400 }
    );
  }

  try {
    const existing = await query<ListingRow>(
      "SELECT id, agent_id, creator_id FROM listings WHERE id = $1",
      [listingId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    const listing = existing[0];
    if (listing.creator_id && listing.creator_id !== authResult.creatorId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - you don't own this listing" },
        { status: 403 }
      );
    }

    await query("DELETE FROM listings WHERE id = $1", [listingId]);

    return NextResponse.json({
      success: true,
      message: "Listing deleted",
    });
  } catch (error) {
    console.error("Listing delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}

function formatListing(listing: ListingRow) {
  return {
    id: listing.id,
    agentId: listing.agent_id,
    agentName: listing.agent_name,
    agentDescription: listing.agent_description,
    type: listing.type,
    name: listing.name,
    description: listing.description,
    category: listing.category,
    priceUsd: listing.price_usd,
    isPublished: listing.is_published,
    version: listing.version,
    packageUrl: listing.package_url,
    x402Enabled: listing.x402_enabled,
    createdAt: listing.created_at,
    updatedAt: listing.updated_at,
  };
}
