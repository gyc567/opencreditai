-- Migration 002: Add tags and installation_command to listings
-- Run after 001_x402_tables.sql

-- Add tags array column
ALTER TABLE listings ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add installation_command column
ALTER TABLE listings ADD COLUMN IF NOT EXISTS installation_command TEXT;

-- Create index on tags for searching
CREATE INDEX IF NOT EXISTS idx_listings_tags ON listings USING GIN(tags);

-- Add creator wallet address column if not exists
ALTER TABLE creators ADD COLUMN IF NOT EXISTS wallet_address VARCHAR(42);

-- Add is_active column for creators
ALTER TABLE creators ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
