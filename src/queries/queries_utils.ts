const express = require('express');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'tricount',
    host: 'localhost',
    database: 'tricount',
    password: 'tricount-pwd',
    port: 5432,
})

const bodyParser = require('body-parser')
export { bodyParser, pool, Pool, express }