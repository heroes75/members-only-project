require('dotenv').config()
const express = require('express');
const indexRouter = require('./routes/index-router');

const app = express()

app.use(indexRouter)

app.listen(3000, (err) => {
    if (err) console.error(err);
    console.log(`listen at url localhost:3000`)
})