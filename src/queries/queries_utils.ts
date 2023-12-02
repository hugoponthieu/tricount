const express = require('express');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'test',
    host: 'postgre.local',
    database: 'test',
    password: 'test',
    port: 5432,
})

const bodyParser = require('body-parser')
export { bodyParser, pool, Pool, express }