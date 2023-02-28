import pkg from "pg";
const {Pool} = pkg;
// import dotenv from 'dotenv'
// dotenv.config();


const client = new Pool({
    user: "sounisaa",
    password: "",
    host: "localhost",
    port: 5432, //default DB port
    database: "Grocery_List"
})

export {client};