require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')

const apiRoutes = require('./routes/api');

mongoose.connect(process.env["MONGODB_KEY"], { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to MongoDB'))

app.use(express.json())
app.use('/api', apiRoutes)

app.listen(5000, () => {
    console.log('Server Started')
})
