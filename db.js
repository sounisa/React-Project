import pkg from "pg";
const {Pool} = pkg;
import dotenv from 'dotenv'
dotenv.config();

const client = new Pool({
    connectionString: process.env.DATABASE_URL
})

export {client};