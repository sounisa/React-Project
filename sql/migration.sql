DROP TABLE IF EXISTS items;

CREATE TABLE items (
    item_id serial PRIMARY KEY,
    item_name varchar,
    qty integer,
    type varchar
);