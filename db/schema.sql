-- CTC AI Terminal - High-Performance Analytics Schema
-- Optimized for PostgreSQL 15+

CREATE TABLE system_users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_token_hash TEXT NOT NULL,
    account_status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interaction_logs (
    log_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES system_users(user_id),
    prompt_text TEXT NOT NULL,
    response_metadata JSONB, -- Stores model version and tokens
    latency_ms INTEGER,      -- Critical for Character.AI performance tracking
    safety_score FLOAT DEFAULT 1.0, -- Range 0-1 for moderation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interaction_latency ON interaction_logs(latency_ms);

