const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./config/database');
const userRouter = require('./routes/routes');
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// connection database - mysql
connection.connect(err => {
    if(err) {
        console.log(err)
    }
    console.log('Connected')
})

app.get('/', (req, res) => {
    res.send('Welcome')
})
app.use('/', userRouter)

app.listen(4000, () => {
    console.log('Server is running')
})