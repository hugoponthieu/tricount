import express, { Request, Response } from 'express';
import * as core from "express-serve-static-core";
import { createTables } from './queries/pg/tables';
const db = require('./queries');


const app: core.Express = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    //createTables()
    return console.log(`Express is listening at http://localhost:${port}`);
});

app.use('/api', db)


module.exports = app;