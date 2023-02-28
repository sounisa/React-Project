import pkg from "pg";
const {Pool} = pkg;

const client = new Pool({
    // user: 'sounisaa',
    // password: '',
    // port: 5432,
    // host: 'localhost',
    // database: 'Grocery_List'
    connectionString: process.env.DATABASE_URL
})

export {client};