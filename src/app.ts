import express, { Request, Response } from 'express';
import * as core from "express-serve-static-core";
import { createTables } from './queries/pg/tables';
const db = require('./queries');
import { userRouter } from './queries/api/user_queries'
import { groupeRouter } from './queries/api/groupe_queries'
import { membreRouter } from './queries/api/membre_queries';
import { remboursementRouter } from './queries/api/remboursement_queries';
import { depenseRouter } from './queries/api/depense_queries';
const cors = require('cors')


const app: core.Express = express();
const port: number = 3000;
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    //createTables()
    return console.log(`Express is listening at http://localhost:${port}`);
});


app.use('/user', cors(), userRouter);
app.use('/groupe', groupeRouter);
app.use('/membre', membreRouter);
app.use('/remboursement', remboursementRouter);
app.use('/depense', depenseRouter);

module.exports = app;


