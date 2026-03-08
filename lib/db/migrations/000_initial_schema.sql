-- Initial Schema - Create base tables
-- This migration must run first

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Agents table (for skill sellers)
CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  moltbook_id VARCHAR(100) UNIQUE,
  name VARCHAR(255),
  description TEXT,
  verification_code VARCHAR(20) UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'suspended')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Creators table (seller profiles)
CREATE TABLE IF NOT EXISTS creators (
  id SERIAL PRIMARY KEY,
  address VARCHAR(42) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  wallet_address VARCHAR(42),
  is_active BOOLEAN DEFAULT true,
  total_earnings DECIMAL(10,4) NOT NULL DEFAULT 0,
  total_sales INTEGER NOT NULL DEFAULT 0,
  pending_payout DECIMAL(10,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Skills table (original skills registry)
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(255),
  category VARCHAR(50),
  tags TEXT[],
  version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
  installation_command TEXT,
  package_url TEXT,
  price_usd DECIMAL(10,4) DEFAULT 0,
  wallet_address VARCHAR(42),
  x402_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for base tables
CREATE INDEX IF NOT EXISTS idx_agents_moltbook_id ON agents(moltbook_id);
CREATE INDEX IF NOT EXISTS idx_agents_verification_code ON agents(verification_code);
CREATE INDEX IF NOT EXISTS idx_creators_address ON creators(address);
CREATE INDEX IF NOT EXISTS idx_creators_username ON creators(username);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);
