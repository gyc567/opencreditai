-- Audit Payment Flow - Database Migration 006
-- Creates audit_requests table for skill file auditing service

CREATE TABLE IF NOT EXISTS audit_requests (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'failed')),
  amount_usd DECIMAL(10,2) NOT NULL DEFAULT 10.00,
  transaction_id INTEGER REFERENCES transactions(id) ON DELETE SET NULL,
  payment_requirement TEXT,
  virustotal_scan_id VARCHAR(100),
  report_data JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX idx_audit_requests_status ON audit_requests(status);
CREATE INDEX idx_audit_requests_email ON audit_requests(email);
CREATE INDEX idx_audit_requests_created_at ON audit_requests(created_at);
CREATE INDEX idx_audit_requests_transaction_id ON audit_requests(transaction_id);

-- Comment on table
COMMENT ON TABLE audit_requests IS 'Stores skill file audit requests with VirusTotal integration';
