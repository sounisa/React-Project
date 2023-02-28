import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import {client} from './db.js'
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


app.use(cors({
    origin:'*'
}));
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(join(__dirname, 'client', 'public')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'public', 'index.html'));
});

//GET ALL
app.get(`/items`, async (req, res) => {
    const {rows} = await client.query(`select * from items order by item_id ASC`)
    res.status(200).type('application/JSON').send(rows)
})

//POST 1
app.post(`/items`, async (req, res) => {
    try {
        const {item_name, qty, type} = req.body
        const {rows} = await client.query(`insert into items (item_name, qty, type) values ('${item_name}', ${qty}, '${type}') returning *`)
        res.status(201).type('application/JSON').send(rows) 
    } catch (error) {
        res.send(error.message)
    }
    
})


//GET 1
app.get(`/items/:id`, async (req, res) => {
    const {id} = req.params
    if (isNaN(id)) { //if not a number
        res.status(404).type('text/plain').send('Please Input A Number For The ID') //error
    } else { 
    const {rows} = await client.query(`select * from items where item_id = ${id}`)//query
        if (rows.length === 0) { //then if id doesnt exist
            res.status(404).type('text/plain').send('Item Not Found') //error
        } else {
            res.status(200).type('application/JSON').send(rows) //send item w/that id
        }
    }
})

//PUT 1
app.patch(`/items/:id`, async (req, res) => {
    const {id} = req.params
    let { body } = req
    if (isNaN(id)) {
        res.status(404).type('text/plain').send('Please Input A Number For The ID')
    } try {
        const result = await client.query(`select * from items where item_id = ${id}`)
        if (result.rows.length === 0) {
            res.status(404).type('text/plain').send('Item Not Found')
        } else {
            for (let key in body) {
                await client.query(`update items set ${key} = '${body[key]}' where item_id = ${id}`);
            }
            const updatedItem = await client.query(`select * from items where item_id = ${id}`)
            res.status(200).type('application/json').json(updatedItem.rows)
        }
    } catch (error) {
        res.status(500).type('text/plain').send(error.message)
    }
})


//DELETE 1
app.delete(`/items/:id`, async (req, res) => {
    const {id} = req.params
    if (isNaN(id)) { //if not a number
        res.status(404).type('text/plain').send('Please Input A Number For The ID') //error
    } else { 
    const {rows} = await client.query(`delete from items where item_id = ${id} returning *`)
        if (rows.length === 0) { //then if id doesnt exist
            res.status(404).type('text/plain').send('Item Not Found') //error
        } else {
            res.status(200).type('text/plain').send(`This item was deleted ${JSON.stringify(rows)}`) //send donut that was updated
        }
    }
})





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});