import { Pool } from "pg";

const pool = new Pool({
	host: "localhost",
	port: 5432,
	database: "ecommerce",
	user: "postgres",
	password: "123",
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

async function query<T>(sql: string, params?: Array<T>) {
	const res = pool.query(sql, params);
	return res;
}

export default query;
