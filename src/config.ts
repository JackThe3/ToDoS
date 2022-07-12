import env from 'dotenv';

env.config()
export const port = Number(process.env.API_PORT);
export const secret = String(process.env.SECRET);
export const db_url = String(process.env.DB_URL)