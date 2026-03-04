-- Run in Neon (or any Postgres) SQL console:

CREATE TABLE IF NOT EXISTS postits (
  id         SERIAL PRIMARY KEY,
  text       TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#fde047',
  rotation   REAL NOT NULL DEFAULT 0,
  x          REAL NOT NULL DEFAULT 0,
  y          REAL NOT NULL DEFAULT 0,
  timestamp  BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
