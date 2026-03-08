-- Add creator_id to listings for ownership tracking
ALTER TABLE listings ADD COLUMN IF NOT EXISTS creator_id INTEGER REFERENCES creators(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_listings_creator_id ON listings(creator_id);
