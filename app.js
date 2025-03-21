import express from 'express';

import db from './lib/db.js';


import users from './routes/users.js';

import { getNewsFromGNewsTopHeadline } from './lib/news.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();


app.use('/users', users)

getNewsFromGNewsTopHeadline();

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



export default app;