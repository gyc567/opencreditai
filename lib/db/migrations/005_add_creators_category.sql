-- Migration: Add category column to creators table
-- Created: 2026-03-09

-- Add category column to creators table for marketplace categorization
ALTER TABLE creators ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'general';

-- Add indexes for category queries
CREATE INDEX IF NOT EXISTS idx_creators_category ON creators(category);
CREATE INDEX IF NOT EXISTS idx_creators_is_verified_category ON creators(is_verified, category);
