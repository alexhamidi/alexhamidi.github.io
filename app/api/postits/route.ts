import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

const COLORS = [
  "#fde047",
  "#f9a8d4",
  "#93c5fd",
  "#86efac",
  "#c4b5fd",
  "#fdba74",
  "#fcd34d",
  "#fda4af",
];

export async function GET() {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return NextResponse.json({ ideas: [] });
  }
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query(
      `SELECT id, text, color, rotation, x, y, timestamp FROM postits ORDER BY timestamp ASC`
    );
    const ideas = res.rows.map((r) => ({
      text: r.text,
      color: r.color,
      rotation: Number(r.rotation),
      x: Number(r.x),
      y: Number(r.y),
      timestamp: Number(r.timestamp),
    }));
    return NextResponse.json({ ideas });
  } catch (e) {
    console.error("Postgres error:", e);
    return NextResponse.json({ ideas: [] });
  } finally {
    await client.end();
  }
}

export async function POST(req: NextRequest) {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return NextResponse.json({ error: "POSTGRES_URL not configured" }, { status: 500 });
  }

  let body: { idea?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = body?.idea?.trim();
  if (!text) {
    return NextResponse.json({ error: "idea is required" }, { status: 400 });
  }

  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const rotation = (Math.random() - 0.5) * 12;
  const x = Math.random() * 80;
  const y = Math.random() * 80;
  const timestamp = Date.now();

  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query(
      `INSERT INTO postits (text, color, rotation, x, y, timestamp)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, text, color, rotation, x, y, timestamp, created_at`,
      [text, color, rotation, x, y, timestamp]
    );
    const row = res.rows[0];
    return NextResponse.json({
      id: row.id,
      text: row.text,
      color: row.color,
      rotation: Number(row.rotation),
      x: Number(row.x),
      y: Number(row.y),
      timestamp: Number(row.timestamp),
      created_at: row.created_at,
    });
  } catch (e) {
    console.error("Postgres error:", e);
    return NextResponse.json({ error: "Failed to add postit" }, { status: 500 });
  } finally {
    await client.end();
  }
}
