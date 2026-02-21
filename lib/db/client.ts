import pkg, { QueryResultRow } from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const result = await pool.query<T>(text, params);
  return result.rows;
}

export async function execute(text: string, params: unknown[] = []): Promise<void> {
  await pool.query(text, params);
}

export const poolClose = pool.end.bind(pool);
