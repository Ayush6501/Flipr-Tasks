require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(bodyParser.json())
app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log('Server Started')
})
