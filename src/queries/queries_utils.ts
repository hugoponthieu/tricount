const express = require('express');
require('dotenv').config()
console.log(process.env.PG_USER)
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

const bodyParser = require('body-parser')
export { bodyParser, pool, Pool, express }
