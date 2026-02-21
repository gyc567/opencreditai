import pkg, { QueryResultRow } from "pg";
const { Pool } = pkg;

let pool: InstanceType<typeof Pool> | null = null;
let poolError: Error | null = null;

function getPool(): InstanceType<typeof Pool> {
  if (pool) {
    return pool;
  }

  if (poolError) {
    throw poolError;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl && process.env.NODE_ENV === "production") {
    poolError = new Error("DATABASE_URL environment variable is required in production");
    throw poolError;
  }

  if (!databaseUrl) {
    console.warn("WARNING: DATABASE_URL not set. Database operations will fail.");
  }

  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on("error", (err: Error) => {
      console.error("Unexpected database pool error:", err);
    });

    return pool;
  } catch (err) {
    poolError = err instanceof Error ? err : new Error(String(err));
    throw poolError;
  }
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const p = getPool();
  try {
    const result = await p.query<T>(text, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function execute(text: string, params: unknown[] = []): Promise<void> {
  const p = getPool();
  try {
    await p.query(text, params);
  } catch (error) {
    console.error("Database execute error:", error);
    throw error;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const p = getPool();
    await p.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

export const poolClose = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    poolError = null;
  }
};
