import express from 'express';

import db from './lib/db.js';


import users from './routes/users.js';
import news from './routes/news.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();


app.use('/users', users)
app.use('/news', news)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



export default app;